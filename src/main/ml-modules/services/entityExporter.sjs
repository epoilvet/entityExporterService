var rdt = require('/MarkLogic/redaction.xqy')

const prefix = "http://formula1.com/"
var allPathLib = [

    {
        src: "Driver",
        target: "DriverStanding",
        path: "hasStanding"
    }
]
var passThroughPred = []

function getSparqlPathFromQuery(query) {
    let entities = [query.primaryEntity]
    entities = entities.concat(Object.keys(query.entityConstraints).filter(key => (key != query.primaryEntity && query.entityConstraints[key] != null))
    )
    let filterSPARQL = allPathLib.filter(path => {
            return entities.indexOf(path.src) >= 0 && entities.indexOf(path.target) >= 0
        }
    ).map(entry => {
        let other = (entry.src == query.primaryEntity) ? entry.target : entry.src;
        let instanceOf = fn.concat("?", other, " a ", "<http://formula1.com/", other, ">.")
        return fn.concat("?", entry.src, " <", entry.path, "> ?", entry.target, ".", instanceOf)
    }).join()

    let NotExistEntities = query.secondaryEntities.filter(item => fn.contains(item, "NOT EXISTS")
    ).map(item => fn.replace(item, "NOT EXISTS ", "")
    )
    let NotExistSPARQL = allPathLib.filter(path => {
        return (NotExistEntities
                    .indexOf(path.src) >= 0 || NotExistEntities.indexOf(path.target) >= 0
            ) &&
            (query.primaryEntity == path.src || query.primaryEntity == path.target)
    }).map(entry => {
            return fn.concat("FILTER NOT EXISTS {?", entry.src, " ", entry.path, " ?", entry.target, ".}.")
        }
    ).join()


    return filterSPARQL + NotExistSPARQL
}

function getSparql(query) {
    let sparql = `PREFIX  f1: <http://formula1.com/>
SELECT DISTINCT ?${query.primaryEntity} WHERE {
?${query.primaryEntity} a <http://formula1.com/${query.primaryEntity}>.
${getSparqlPathFromQuery(query)}
}
`
    console.log(sparql)
    return sparql
}

function getFields(uri, type, query) {
    let instance = getInstance(uri)
    if (instance) {
        let fields = query.extractFields[type]
        if (fields) {
            let result = {}
            fields.map(f => {
                    result[fn.replace(f, ".//", "")] = instance.xpath(f)
                }
            )
            return result
        } else
            return instance
    }
}

function getInstance(uri) {
    let instance = cts.doc(uri)
    if (instance) {
        instance = instance.root.envelope.instance
        return instance[instance.info.title]
    } else return null
}


function getSparqlPredicate(paths, fromLevel, toLevel) {
    let path = []
    for (let i = fromLevel; i < toLevel; i++)
        path.push(paths.path[i])
    return path.join("/")

}

function getSparqlQuery(srcEntity, targetEntity, fromLevel, toLevel, srcUri) {

    return fn.concat("<", srcUri, "> ", getSparqlPredicate(targetEntity, fromLevel, toLevel), " ?", targetEntity.entity, ".", " ?", targetEntity.entity, " <http://formula1.com/instanceOf> ", "<http://formula1.com/", targetEntity.entity, ">.")

}


function processLevel(uris, entity, entityTree, parent, level, query) {
    //parent.queries= []
    if (entityTree.children) {
        for (let pathEntry of entityTree.children) {
            let allResults
            let localPath = (pathEntry.subPath != null) ? pathEntry.subPath : pathEntry.strpath
            let sparqlQuery = `PREFIX f1: <http://formula1.com/>
                       SELECT DISTINCT ?${entity} ?${pathEntry.entity} WHERE {
                       ?${entity} <${localPath}> ?${pathEntry.entity}.
                       FILTER (?${entity} IN (${uris.map(item => "<" + item + ">").join(",")}))}`
            //parent.query =sparqlQuery
            //parent.queries.push(sparqlQuery)
            try {

                allResults = sem.sparql(sparqlQuery).toArray()
            }
            catch(error) {
                xdmp.log(sparqlQuery)
                return parent
            }

            let newParents = Array.from(new Set(allResults.map(item => String(item[entity])))
            )
            for (let nparent of newParents) {
                let ODict = {}
                let results = (level < 2) ? allResults.filter(item => String(item[entity]) == nparent
                    ).map(item => {

                        let newO = {
                            uri: String(item[pathEntry.entity]),
                            type: pathEntry.entity,
                            instance: getFields(String(item[pathEntry.entity]), pathEntry.entity, query)
                        }
                        ODict[newO.uri] = newO
                        if (
                            !parent[nparent][localPath]
                        )
                            parent[nparent][localPath] = [newO]
                        else
                            parent[nparent][localPath].push(newO)

                        return String(item[pathEntry.entity])
                    }) :
                    []


                if (pathEntry.children) processLevel(results, pathEntry.entity, pathEntry, ODict, level + 1, query)
            }


        }
    }

    return parent

}


function getPathForQuery(query) {

    let pathForQuery = allPathLib.filter(path => {
        return (query
                    .secondaryEntities.indexOf(path.src) >= 0 && query.primaryEntity == path.target
            )
            ||
            (query.secondaryEntities.indexOf(path.target) >= 0 && query.primaryEntity == path.src)
    })
        .sort((a, b) => {
            if (a < b
            )
                return -1;
            else if (a > b) return 1; else return 0
        })
        .map(entry => {

            if (query.primaryEntity == entry.target
            ) {
                let newPath = entry.path.split("/").reverse().map(item => {

                    if (fn.contains(item, "|")){
                        let values = item.substring(1,item.length-1).split("|")
                        let result =""
                        for (let v of values){
                            if (fn.contains(v, "^"))
                                result += v.replace("^", "");
                            else
                                result +=  "^" + v

                            result +="|"
                        }
                    }else{

                        if (fn.contains(item, "^"))
                            return item.replace("^", "");
                        else
                            return "^" + item
                    }})
                return {
                    entity: entry.src,
                    strpath: newPath.join("/"),
                    path: newPath
                }
            } else
                return {
                    entity: entry.target,
                    strpath: entry.path,
                    path: entry.path.split("/")
                }
        })

    pathForQuery.map(item => {

        let parent = pathForQuery.filter(parent => parent.entity != item.entity && fn.contains(item.strpath, parent.strpath)
        ).sort((a, b) => {
            if (a < b
            )
                return -1;
            else if (a > b) return 1; else return 0
        })
            [0]
        if (parent) {
            if (parent.children == null) parent.children = []
            parent.children.push(item)
            item.isChild = true
            item.subPath = item.strpath.replace(parent.strpath + "/", "")
        }

    })

    pathForQuery = pathForQuery.filter(item => item.isChild != true
    )

    return pathForQuery

}


function exportNested(query, pageLength, page, redact) {


    let pathForQuery = getPathForQuery(query)

//return pathForQuery
    let ctsFilter = Object.keys(query.entityConstraints).map(entityName => {
        if (query.entityConstraints[entityName] != null
        )
            return cts.andQuery([cts.collectionQuery(entityName), cts.query(query.entityConstraints[entityName])])
        else
            return cts.collectionQuery(entityName)
    })

    let sparqlQuery = getSparql(query)

    //keep only the not NOT EXISTS secondary entities
    query.secondaryEntities = query.secondaryEntities.filter(item => {
            return !fn.contains(item, "NOT EXISTS ")
        }
    )

    let primaryResults = fn.subsequence(sem.sparql(sparqlQuery, null, null, cts.orQuery(ctsFilter)),(page - 1) * page + 1, page *pageLength)
    let processedPredicates = []


    let entityTree = {
        strpath: "/",
        children: pathForQuery
    }


    let ODict = {}


    let uris = []
    primaryResults.toArray().map(result => {
            result = {
                uri: result[query.primaryEntity],
                type: query.primaryEntity,
                instance: getFields(result[query.primaryEntity], query.primaryEntity, query)
            }
            uris.push(result.uri)
            ODict[result.uri] = result
        }
    )


    processLevel(uris, query.primaryEntity, entityTree, ODict, 0, query)
    let results = ODict


    if (redact) {

        const builder = new NodeBuilder();
        builder.startDocument('result.json');
        builder.addNode(
            {result: results})
        builder.endDocument();
        let nodeResult = builder.toNode();


        return rdt.redact(nodeResult, ['email-rules'])
    } else
        return results
}

function post(context, params, input) {
    let pageLength = (params.pageLength) ? parseInt(params.pageLength) : 10
    let page = (params.page) ? parseInt(params.page) : 1
    let redact = (input.redact == "true")

    return exportNested(JSON.parse(input), pageLength, page, redact);


};

function get(context, params) {
    // return zero or more document nodes
};

function put(context, params, input) {
    // return at most one document node
};

function deleteFunction(context, params) {
    // return at most one document node
};
exports.GET = get;
exports.POST = post;
exports.PUT = put;
exports.DELETE = deleteFunction;
