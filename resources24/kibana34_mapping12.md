we defined the mapping for the index
suppose, newly inserted docs has extra fields
those fields get mapping dynamically by ES itself

temp_index_newMapping (produce - fruits) 
- say new doc has this extra field ---> isOrganic:false

mapping is updated with
"organic" : { "type": "boolean" }

====================================================================

we didnt enable text/keyword for botanical_name
but what if client wants to search based on botanical_name
we cant change the mapping of existing field
- we create a new index (index_new23) with latest mapping
- reindex data from original index --> to "index_new23"

========================================================

`runtime field`
- total amount ===> quantity * unit_price
- sum(total_amount23) ---> we cant run aggregations on total_amount23
    because that field doesnt exist
- but we can create a runtime field & update the mapping
- a runtime field is created/calculated ===> only when a request/query is made on "runtime field"
- runtime fields arent indexed - no disk space... 
- plus, we wont have to reindex in order to add a new field to existing documents
========================================================