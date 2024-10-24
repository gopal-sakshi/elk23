
POST ecommerce_index24_mapping/_delete_by_query
{
    "query": {
        "range": {
            "UnitPrice": {
                "lte": 0
            }
        }
    }
}
// remove the negative values from the field "UnitPrice" === deleted 2517 records


POST ecommerce_index24_mapping/_delete_by_query
{
    "query": {
        "range": {
            "UnitPrice": {
                "gte": 500
            }
        }
    }
}
/*
    remove values greater than 500 from the field "UnitPrice".
    #### costliest item = 38,970... if we include this doc ---> then it skewers the average
    #### deleted 255 records with price > 500
*/

GET ecommerce_index24_mapping/_search
// get meta info about dataset... what are the fields... on what fields we can run aggregations & stuff