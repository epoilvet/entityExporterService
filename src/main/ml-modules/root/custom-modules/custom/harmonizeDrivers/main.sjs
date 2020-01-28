const DataHub = require("/data-hub/5/datahub.sjs");
var gHelper  = require("/custom-modules/pipes/graphHelper")
const datahub = new DataHub();


function getGraphDefinition() {

  return {"models":[{"label":"rawDriver","collection":"rawDriver","source":"Sources","fields":[{"label":"code [id11]","field":"code","value":"code","path":"/envelope/instance/text('code')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"dob [id14]","field":"dob","value":"dob","path":"/envelope/instance/text('dob')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"driverId [id8]","field":"driverId","value":"driverId","path":"/envelope/instance/text('driverId')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"driverRef [id9]","field":"driverRef","value":"driverRef","path":"/envelope/instance/text('driverRef')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"forename [id12]","field":"forename","value":"forename","path":"/envelope/instance/text('forename')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"nationality [id15]","field":"nationality","value":"nationality","path":"/envelope/instance/text('nationality')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"number [id10]","field":"number","value":"number","path":"/envelope/instance/text('number')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"surname [id13]","field":"surname","value":"surname","path":"/envelope/instance/text('surname')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"url [id16]","field":"url","value":"url","path":"/envelope/instance/text('url')","type":3,"children":[],"parent":"/envelope/instance"}],"options":["nodeInput","fieldsOutputs"],"metadata":{"dateCreated":"2020-01-27T20:37:38.541Z"}},{"label":"Driver","collection":"Driver","source":"Entities","fields":[{"label":"code","field":"code","path":"//code"},{"label":"dateOfBirth","field":"dateOfBirth","path":"//dateOfBirth"},{"label":"driverRef","field":"driverRef","path":"//driverRef"},{"label":"firstname","field":"firstname","path":"//firstname"},{"label":"id","field":"id","path":"//id"},{"label":"lastname","field":"lastname","path":"//lastname"},{"label":"nationality","field":"nationality","path":"//nationality"},{"label":"number","field":"number","path":"//number"}],"options":["fieldsInputs","nodeOutput"]}],"executionGraph":{"last_node_id":9,"last_link_id":17,"nodes":[{"id":2,"type":"dhf/output","pos":[1651,485],"size":[180,160],"flags":{},"order":8,"mode":0,"inputs":[{"name":"output","type":0,"link":12}],"properties":{}},{"id":1,"type":"dhf/input","pos":[40,508],"size":[180,60],"flags":{},"order":0,"mode":0,"outputs":[{"name":"input","type":"","links":[1]},{"name":"uri","type":"","links":null},{"name":"collections","type":"","links":null}],"properties":{}},{"id":3,"type":"Sources/rawDriver","pos":[289,497],"size":[305,248],"flags":{},"order":2,"mode":0,"inputs":[{"name":"Node","type":0,"link":1}],"outputs":[{"name":"code","links":[2]},{"name":"dob","links":[3]},{"name":"driverId","links":[5,13]},{"name":"driverRef","links":[6]},{"name":"forename","links":[7]},{"name":"nationality","links":[8]},{"name":"number","links":[9]},{"name":"surname","links":[10]},{"name":"url","links":null}],"properties":{},"widgets_values":[true]},{"id":5,"type":"date/FormatDateAuto","pos":[642,389],"size":{"0":170,"1":26},"flags":{},"order":3,"mode":0,"inputs":[{"name":"inputDate","type":0,"link":3}],"outputs":[{"name":"IsoDate","links":[4]}],"properties":{}},{"id":4,"type":"Entities/Driver","pos":[759,512],"size":[305,228],"flags":{},"order":5,"mode":0,"inputs":[{"name":"code","type":0,"link":2},{"name":"dateOfBirth","type":0,"link":4},{"name":"driverRef","type":0,"link":6},{"name":"firstname","type":0,"link":7},{"name":"id","type":0,"link":5},{"name":"lastname","type":0,"link":10},{"name":"nationality","type":0,"link":8},{"name":"number","type":0,"link":9}],"outputs":[{"name":"Node","type":"Node","links":[11]},{"name":"Prov","type":null,"links":null}],"properties":{},"widgets_values":[true]},{"id":6,"type":"dhf/envelope","pos":[1344,565],"size":[180,160],"flags":{},"order":7,"mode":0,"inputs":[{"name":"headers","type":0,"link":null},{"name":"triples","type":0,"link":17},{"name":"instance","type":0,"link":11},{"name":"attachments","type":0,"link":null},{"name":"uri","type":0,"link":14},{"name":"collections","type":0,"link":null}],"outputs":[{"name":"output","type":null,"links":[12]}],"properties":{}},{"id":7,"type":"string/Templating","pos":[924,801],"size":[230,160],"flags":{},"order":4,"mode":0,"inputs":[{"name":"v1","type":0,"link":13},{"name":"v2","type":0,"link":null},{"name":"v3","type":0,"link":null}],"outputs":[{"name":"newString","type":"xs:string","links":[14,15]}],"properties":{},"widgets_values":["v4","v5","http://formula1.com/Driver#${v1}"]},{"id":8,"type":"triples/CreateTriple","pos":[1020,289],"size":{"0":417.76202392578125,"1":151.2519989013672},"flags":{},"order":6,"mode":0,"inputs":[{"name":"subject","type":0,"link":15},{"name":"object","type":0,"link":16}],"outputs":[{"name":"triple","links":[17]}],"properties":{},"widgets_values":["true","http://www.w3.org/1999/02/22-rdf-syntax-ns#type","true"]},{"id":9,"type":"string/constant","pos":[604,244],"size":[180,60],"flags":{},"order":1,"mode":0,"outputs":[{"name":"value","type":"xs:string","links":[16]}],"properties":{},"widgets_values":["http://formula1.com/Driver"]}],"links":[[1,1,0,3,0,0],[2,3,0,4,0,0],[3,3,1,5,0,0],[4,5,0,4,1,0],[5,3,2,4,4,0],[6,3,3,4,2,0],[7,3,4,4,3,0],[8,3,5,4,6,0],[9,3,6,4,7,0],[10,3,7,4,5,0],[11,4,0,6,2,0],[12,6,0,2,0,0],[13,3,2,7,0,0],[14,7,0,6,4,0],[15,7,0,8,0,0],[16,9,0,8,1,0],[17,8,0,6,1,0]],"groups":[],"config":{},"version":0.4}}}

function main(content, options) {

  //grab the doc id/uri
  let id = content.uri;

  //here we can grab and manipulate the context metadata attached to the document
  let context = content.context;

  //let's set our output format, so we know what we're exporting
  let outputFormat = options.outputFormat ? options.outputFormat.toLowerCase() : datahub.flow.consts.DEFAULT_FORMAT;

  //here we check to make sure we're not trying to push out a binary or text document, just xml or json
  if (outputFormat !== datahub.flow.consts.JSON && outputFormat !== datahub.flow.consts.XML) {
    datahub.debug.log({
      message: 'The output format of type ' + outputFormat + ' is invalid. Valid options are ' + datahub.flow.consts.XML + ' or ' + datahub.flow.consts.JSON + '.',
      type: 'error'
    });
    throw Error('The output format of type ' + outputFormat + ' is invalid. Valid options are ' + datahub.flow.consts.XML + ' or ' + datahub.flow.consts.JSON + '.');
  }

  /*
  This scaffolding assumes we obtained the document from the database. If you are inserting information, you will
  have to map data from the content.value appropriately and create an instance (object), headers (object), and triples
  (array) instead of using the flowUtils functions to grab them from a document that was pulled from MarkLogic.
  Also you do not have to check if the document exists as in the code below.

  Example code for using data that was sent to MarkLogic server for the document
  let instance = content.value;
  let triples = [];
  let headers = {};
   */

  //Here we check to make sure it's still there before operating on it
  if (!fn.docAvailable(id)) {
    datahub.debug.log({message: 'The document with the uri: ' + id + ' could not be found.', type: 'error'});
    throw Error('The document with the uri: ' + id + ' could not be found.')
  }

  //grab the 'doc' from the content value space
  let doc = content.value;

  // let's just grab the root of the document if its a Document and not a type of Node (ObjectNode or XMLNode)
  //if (doc && (doc instanceof Document || doc instanceof XMLDocument)) {
  //  doc = fn.head(doc.root);
  //}

  /*
  //get our instance, default shape of envelope is envelope/instance, else it'll return an empty object/array
  let instance = datahub.flow.flowUtils.getInstance(doc) || {};

  // get triples, return null if empty or cannot be found
  let triples = datahub.flow.flowUtils.getTriples(doc) || [];

  //gets headers, return null if cannot be found
  let headers = datahub.flow.flowUtils.getHeaders(doc) || {};

  //If you want to set attachments, uncomment here
  // instance['$attachments'] = doc;
  */



  //insert code to manipulate the instance, triples, headers, uri, context metadata, etc.


  let results = gHelper.executeGraphStep(doc,id,getGraphDefinition(),{collections: xdmp.documentGetCollections(id)})
  return results;
}

module.exports = {
  main: main
};
