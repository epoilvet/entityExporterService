# entityExporterService

this project illustrates a generic MarkLogic DHF entity export concept.
This objective is to provide the ability to export 
1) Any primary entity and selected properties
2) Any secondary entities linked to the primary entity and selected properties. Secondary entities will be nested into the primary according to the relation path.
3) Filter the overall export based on conditions on each individual entity

It's a gradle project and uses Pipes for MarkLogic DHF
