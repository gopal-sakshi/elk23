```js
POST temp_index/_doc
{
    "name": "Pineapple",
    "botanical_name": "Ananas comosus",
    "produce_type": "Fruit",
    "country_of_origin": "New Zealand",
    "date_purchased": "2020-06-02T12:15:35",
    "quantity": 200,
    "unit_price": 3.11,
    "description": "a large juicy tropical fruit consisting of aromatic edible yellow flesh surrounded by a tough segmented skin and topped with a tuft of stiff leaves.These pineapples are sourced from New Zealand.",
    "vendor_details": {
        "vendor": "Tropical Fruit Growers of New Zealand",
        "main_contact": "Hugh Rose",
        "vendor_location": "Whangarei, New Zealand",
        "preferred_vendor": true
    }
}
```


==================================================================================

By default, every string gets mapped twice
- as a text field and 
- as a keyword multi-field

`Text field type`
- designed for full-text searches. 
- search for individual terms in a non-case sensitive manner.

`Keyword field type`
- designed for exact searches, aggregations, sorting. 
- searching for original strings.

we can assign the field type as either
- text      or
- keyword   or
- both

==============================================================

POST temp_index23/_bulk
{ "create":{ } }
{ "id":1,"balance":39225,"firstname":"Luka","lastname":"Modric", "description":"These apples are sourced from australia" }
{ "create":{ } }
{ "id":2,"balance":33244,"firstname":"Sergio","lastname":"Ramos", "description":"These pineapples are sourced from new zealand" }
{ "create":{ } }
{ "id":3,"balance":54422,"firstname":"Toni","lastname":"Kroos", "description":"these mangoes are produced in new zealand" }

GET temp_index23/_search

`https://kb.objectrocket.com/elasticsearch/elasticsearch-cheatsheet-of-kibana-console-requests-251#common+put+requests`

### say ===> _doc/1 ====>   "These pineapples are sourced from new zealand"
### say ===> _doc/2 ====>   "These apples are sourced from australia"
### say ===> _doc/3 ====>   "these mangoes are produced in new zealand"

InvertedIndex   ---> tokens & list of docs that contain the said token         

_____TERMMMMM_____                  ____DOC LIST____
    apples                              2                   "apples" text is present only in doc2
    are                                 1, 2, 3             "are" text is present in both doc1 & doc2
    australia                           2
    from                                1, 2, 3
    in                                  3
    mangoes                             3
    new                                 1, 3
    pineapples                          1
    produced                            3
    sourced                             1, 2
    these                               1, 2, 3
    zealand                             1, 3

say a request comes ---> full-text-search ---> "new zealand"
asking to fetch all documents containing the terms "new" or "zealand"
ES doesn't read through every document for the search terms (new, zealand). 
It goes straight to the inverted index to look up the search terms, 
finds the matching document ids (1,3) and sends the ids back to the user.
The inverted index is the reason Elasticsearch is able to search with speed.

========================================================================

PUT temp_index/_doc/4
{ "country": "New zealand" }

PUT temp_index/_doc/5
{ "country": "New zealand" }

PUT temp_index/_doc/5
{ "country": "New caledonia" }

___doc_id___          ____doc values____
    4                   New zealand
    5                   New zealand
    6                   New Caledonia

`keyword` field type
- used for <aggregations, sorting, exact search>
- lookup the documentID - to find values it has in its fields
- "doc values" data structure
- this data structure(doc values) is designed 
- for actions that require looking up the document ID to find the values it has in its fields



========================================================================

In cases where you do not need both field types, the default setting is wasteful. 
Since both field types require creating 
    either an inverted index (<text> field type) 
    or doc values (<keyword> field type) 
- creating both field types for unnecessary fields will 
    slow down indexing & 
    take up more disk space.


===========================================================================

client requirements

(A) search for produce name, country of origin, description
- since client wont search terms exactly the way it is written in our documents
- we have to have ----> full text search on these 3 fields
- client doesnt want to run aggregation/sorting/exact-match ---> on description (I mean, who sorts based on description)
- RESULT ====> description is text only; |||ly name field is text only (keyword not needed )

(B) identify top countries of origin with the most frequent purchase history
- we need aggregations on "country_of_origin"
- map the field "country_of_origin" twice as text & keyword


(C) sort produce by produce type (fruit or vegetable)
- map the field produce_type ---> keyword only
- coz, client wont need full text search for this field

(D) get the summary of monthly expense
- quantity * unit_price
- see "runtime field"
===========================================================================

botanical_name & vendor_details
- these fields arent used; 
- we dont want either InvertedIndex (or) doc_values for these 2 fields
- disabling this fields will save disk space & minimize number of fields in the mapping

===========================================================================

updated mapping23 ===>

```js
PUT temp_index_newMapping
{
    "mappings": {
        "properties": {
            "country_of_origin":    { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
            "date_purchased":       { "type": "date" },
            "description":          { "type": "text" },
            "name":                 { "type": "text" },
            "produce_type":         { "type": "keyword" },
            "quantity":             { "type": "long" },
            "unit_price":           { "type": "float" },
            "vendor_details":       { "enabled": false },
            "botanical_name":       { "enabled": false }
        }
    }
}
```