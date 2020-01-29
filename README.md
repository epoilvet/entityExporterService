# entityExporterService

this project illustrates a generic MarkLogic DHF entity export concept.
This objective is to provide the ability to export 
1) Any primary entity and selected properties
2) Any secondary entities linked to the primary entity and selected properties. Secondary entities will be nested into the primary according to the relation path.
3) Filter the overall export based on conditions on each individual entity

It's a gradle project and uses Pipes for MarkLogic DHF

## Pre-requisites
In order to make the service working data must have the following characteristics:
- Data is stored in documents (DHF entities)
- Relations between entities is managed with triples
- URI of documents are the same as IRI in the triples

In the following paragraphs we detail how the concept is built

## Data Loading
For the concept, the loadinf is based on standard DHF5 ingestion step. Details can be seen in the quickstart for ex.

## Data harmonization
For harmonisation, we use pipes in order to add triples to the different entities we manipulate.

