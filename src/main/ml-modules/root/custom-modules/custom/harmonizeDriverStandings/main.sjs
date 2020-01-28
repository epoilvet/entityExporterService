const DataHub = require("/data-hub/5/datahub.sjs");
var gHelper  = require("/custom-modules/pipes/graphHelper")
const datahub = new DataHub();


function getGraphDefinition() {

  return {"models":[{"label":"rawDriverstanding","collection":"rawDriverstanding","source":"Sources","fields":[{"label":"wins [id14]","field":"wins","value":"wins","path":"/envelope/instance/text('wins')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"raceId [id9]","field":"raceId","value":"raceId","path":"/envelope/instance/text('raceId')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"positionText [id13]","field":"positionText","value":"positionText","path":"/envelope/instance/text('positionText')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"position [id12]","field":"position","value":"position","path":"/envelope/instance/text('position')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"points [id11]","field":"points","value":"points","path":"/envelope/instance/text('points')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"driverStandingsId [id8]","field":"driverStandingsId","value":"driverStandingsId","path":"/envelope/instance/text('driverStandingsId')","type":3,"children":[],"parent":"/envelope/instance"},{"label":"driverId [id10]","field":"driverId","value":"driverId","path":"/envelope/instance/text('driverId')","type":3,"children":[],"parent":"/envelope/instance"}],"options":["nodeInput","fieldsOutputs"],"metadata":{"dateCreated":"2020-01-27T20:52:26.470Z"}},{"label":"DriverStanding","collection":"DriverStanding","source":"Entities","fields":[{"label":"driverStandingsId","field":"driverStandingsId","path":"//driverStandingsId"},{"label":"points","field":"points","path":"//points"},{"label":"position","field":"position","path":"//position"},{"label":"positionText","field":"positionText","path":"//positionText"},{"label":"wins","field":"wins","path":"//wins"}],"options":["fieldsInputs","nodeOutput"]}],"executionGraph":{"last_node_id":12,"last_link_id":22,"nodes":[{"id":4,"type":"Entities/DriverStanding","pos":[771,767],"size":[305,168],"flags":{},"order":3,"mode":0,"inputs":[{"name":"driverStandingsId","type":0,"link":8},{"name":"points","type":0,"link":4},{"name":"position","type":0,"link":5},{"name":"positionText","type":0,"link":6},{"name":"wins","type":0,"link":7}],"outputs":[{"name":"Node","type":"Node","links":[2]},{"name":"Prov","type":null,"links":null}],"properties":{},"widgets_values":[true]},{"id":2,"type":"dhf/output","pos":[1479,753],"size":[180,160],"flags":{},"order":10,"mode":0,"inputs":[{"name":"output","type":0,"link":3}],"properties":{}},{"id":1,"type":"dhf/input","pos":[-327,756],"size":[180,60],"flags":{},"order":0,"mode":0,"outputs":[{"name":"input","type":"","links":[1]},{"name":"uri","type":"","links":null},{"name":"collections","type":"","links":null}],"properties":{}},{"id":5,"type":"Sources/rawDriverstanding","pos":[18,748],"size":[305,208],"flags":{},"order":2,"mode":0,"inputs":[{"name":"Node","type":0,"link":1}],"outputs":[{"name":"wins","links":[7]},{"name":"raceId","links":null},{"name":"positionText","links":[6]},{"name":"position","links":[5]},{"name":"points","links":[4]},{"name":"driverStandingsId","links":[8,12]},{"name":"driverId","links":[10]}],"properties":{},"widgets_values":[true]},{"id":8,"type":"string/Templating","pos":[432,109],"size":[290.8000183105469,163.8000030517578],"flags":{},"order":5,"mode":0,"inputs":[{"name":"v1","type":0,"link":10},{"name":"v2","type":0,"link":null},{"name":"v3","type":0,"link":null}],"outputs":[{"name":"newString","type":"xs:string","links":[11]}],"properties":{},"widgets_values":["v4","v5","http://formula1.com/Driver#${v1}"]},{"id":7,"type":"triples/CreateTriple","pos":[963,138],"size":{"0":255,"1":126},"flags":{},"order":7,"mode":0,"inputs":[{"name":"subject","type":0,"link":11},{"name":"object","type":0,"link":13}],"outputs":[{"name":"triple","links":[14]}],"properties":{},"widgets_values":[true,"hasStanding","true"]},{"id":11,"type":"triples/CreateTriple","pos":[922,390],"size":{"0":407.1230163574219,"1":118.19412231445312},"flags":{},"order":6,"mode":0,"inputs":[{"name":"subject","type":0,"link":18},{"name":"object","type":0,"link":17}],"outputs":[{"name":"triple","links":[19]}],"properties":{},"widgets_values":[true," http://www.w3.org/1999/02/22-rdf-syntax-ns#type","true"]},{"id":6,"type":"basic/Array","pos":[1464,139],"size":{"0":170,"1":106},"flags":{},"order":8,"mode":0,"inputs":[{"name":"item1","type":0,"link":14},{"name":"item2","type":0,"link":19},{"name":"item3","type":0,"link":null},{"name":"item4","type":0,"link":null},{"name":"item5","type":0,"link":null}],"outputs":[{"name":"array","links":[21]}],"properties":{}},{"id":3,"type":"dhf/envelope","pos":[1165,773],"size":[180,160],"flags":{},"order":9,"mode":0,"inputs":[{"name":"headers","type":0,"link":null},{"name":"triples","type":0,"link":21},{"name":"instance","type":0,"link":2},{"name":"attachments","type":0,"link":null},{"name":"uri","type":0,"link":22},{"name":"collections","type":0,"link":null}],"outputs":[{"name":"output","type":null,"links":[3]}],"properties":{}},{"id":12,"type":"string/constant","pos":[581,603],"size":[332.79000137328944,70.24007347106863],"flags":{},"order":1,"mode":0,"outputs":[{"name":"value","type":"xs:string","links":[17]}],"properties":{},"widgets_values":["http://formula1.com/DriverStanding"]},{"id":9,"type":"string/Templating","pos":[426,344],"size":[338.7799100088505,174.59908384750383],"flags":{},"order":4,"mode":0,"inputs":[{"name":"v1","type":0,"link":12},{"name":"v2","type":0,"link":null},{"name":"v3","type":0,"link":null}],"outputs":[{"name":"newString","type":"xs:string","links":[13,18,22]}],"properties":{},"widgets_values":["v4","v5","http://formula1.com/DriverStanding#${v1}"]}],"links":[[1,1,0,5,0,0],[2,4,0,3,2,0],[3,3,0,2,0,0],[4,5,4,4,1,0],[5,5,3,4,2,0],[6,5,2,4,3,0],[7,5,0,4,4,0],[8,5,5,4,0,0],[10,5,6,8,0,0],[11,8,0,7,0,0],[12,5,5,9,0,0],[13,9,0,7,1,0],[14,7,0,6,0,0],[17,12,0,11,1,0],[18,9,0,11,0,0],[19,11,0,6,1,0],[21,6,0,3,1,0],[22,9,0,3,4,0]],"groups":[],"config":{},"version":0.4}}}

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
