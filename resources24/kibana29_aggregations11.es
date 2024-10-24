// metric & cardinality aggregations

GET ecommerce_index24_mapping/_search
{
    "aggs": {
        "sum_unit_price_23": {
            "sum": {
                "field": "UnitPrice"
            }
        }
    },
  "size": 0
}
/*
    ### metric aggregations are used to compute numeric values based on your dataset.
    #### perform sum aggregations on the field "UnitPrice" over all documents
    #### total UnitPrice of 5lakh + documents ===> 1946449.894
    #### add a size parameter and set it to 0; so that default 10 results arent shown as "hits"
*/



GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "lowest/highest/avg_based_on_type_unit_price23": {
            "KEY232323": {
                "field": "UnitPrice"
            }
        }
    }
}
/*
    KEY232323 ======== min || max || avg || stats
    #### use 'min' type ---> to fetch document with lowest unit price
    ### use 'max' type ----> to fetch document with highest unit price
    ### use 'avg' type ----> average unit price
    #### use 'stats' ------> to fetch all stats at one go
*/



GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "unique_customers23": {
            "cardinality": {
                "field": "CustomerID"
            }
        }
    }
}
// this ecommerce dataset contains 4359 unique customers



GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "query": {
        "match": {
            "Country": "Germany"
        }
    },
    "aggs": {
        "germany_avg_unit_price23": {
            "avg": {
                "field": "UnitPrice"
            }
        }
    }
}
// avg unit price --- only for germany data


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "query": {
        "match": {
            "Country": "Germany"
        }
    },
    "aggs": {
        "germany_unique_users23": {
            "cardinality": {
                "field": "CustomerID"
            }
        }
    }
}
// number of unique users from germany data