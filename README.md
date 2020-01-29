# entityExporterService

this project illustrates a generic MarkLogic DHF entity export concept.
This objective is to provide the ability to export 
1) Any primary entity and selected properties
2) Any secondary entities directly or indirectly linked to the primary entity and selected properties. Secondary entities will be nested into the primary according to the relation path.
3) Filter the overall export based on conditions on each individual entity

It's a gradle project and uses Pipes for MarkLogic DHF

## Pre-requisites
In order to make the service working data must have the following characteristics:
- Data is stored in documents (DHF entities)
- Each entity is typed using the  http://www.w3.org/1999/02/22-rdf-syntax-ns#type predicate.
- Relations between entities is managed with triples
- URI of documents are the same as IRI in the triples

In the following paragraphs we detail how the concept is built

## Data Loading
For the concept, the loadinf is based on standard DHF5 ingestion step. Details can be seen in the quickstart for ex.

## Data harmonization
For harmonisation, we use pipes in order to add triples to the different entities we manipulate.

### Driver harmonization
Below in the pipes graph to add triples in the Driver envelope.
The graph creates the rdf:type for the Driver.
![Driver harmonization in Pipe](https://github.com/epoilvet/entityExporterService/blob/master/wiki/pipes_driver.png?raw=true)

### Driver Standing harmonization
Below in the pipes graph to add triples in the Driver standings envelope.
The graph creates the rdf:type and hasStanding predicates for the Driver Standing
![Driver harmonization in Pipe](https://github.com/epoilvet/entityExporterService/blob/master/wiki/pipes_driverstandings.png?raw=true)

### Calling the entity exporter service

In order to get an export of entities, the service supports the following format:
 
 {
 
    "primaryEntity" : "Driver",
 
    "secondaryEntities" :["DriverStanding"],
 
    "extractFields":{
 
    "Driver": ["firstname","lastname"]

    },
 
    "entityConstraints":{
 
       "Driver" : null
 
    }

}


- primaryEntity = Main entity to be exported
- secondaryEntities = other entities to be exported in relation to the primary entity
- extractFields = fields per entity to be extracted. if no field explicity exported, export all the properties
- entityConstraints = cts query per entity to filter the data according to the conditions. Only primary entities matching all conditions will be exported (including based on direct and indirect children conditions)

### Service Output format
{
    "http://formula1.com/Driver#1": {
        "uri": "http://formula1.com/Driver#1",
        "type": "Driver",
        "instance": {
            "firstname": "Bobby",
            "lastname": "Unser"
        },
        "hasStanding": [
            {
                "uri": "http://formula1.com/DriverStanding#1",
                "type": "DriverStanding",
                "instance": {
                    "driverStandingsId": "3161",
                    "points": "1",
                    "position": "11",
                    "positionText": "11",
                    "wins": "0"
                }
            },
            {
                "uri": "http://formula1.com/DriverStanding#113",
                "type": "DriverStanding",
                "instance": {
                    "driverStandingsId": "53112",
                    "points": "20",
                    "position": "6",
                    "positionText": "6",
                    "wins": "1"
                }
            },
            {
                "uri": "http://formula1.com/DriverStanding#135",
                "type": "DriverStanding",
                "instance": {
                    "driverStandingsId": "65060",
                    "points": "29",
                    "position": "9",
                    "positionText": "9",
                    "wins": "1"
                }
            },
            {
                "uri": "http://formula1.com/DriverStanding#13615",
                "type": "DriverStanding",
                "instance": {
                    "driverStandingsId": "54819",
                    "points": "0",
                    "position": "12",
                    "positionText": "12",
                    "wins": "0"
                }
            },
...
