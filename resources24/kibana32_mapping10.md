`Mapping`
- process of defining how a document and its fields are indexed
- mapping affects how ES searches & stores data


`dynamic mapping`
- When a user does not define the mapping in advance (while creating the "index") 
- ES creates/updates the mapping as needed by default. 
================================================================================================

GET temp_index/_mapping

lists all fields in the document
lists the type of each field (text, keyword, long, float, date, boolean)


================================================================================================
`With dynamic mapping`
- ES looks at each field and 
- tries to infer the data type from the field content. 
- Then, it assigns a type to each field and 
- creates a list of field names & types known as mapping.
- Depending on the assigned field type, each field is indexed & primed for different types of requests
    full text search, 
    aggregations, 
    sorting. 
- This is why mapping plays an important role in how ES stores & searches for data.
================================================================================================