GET news_index25_5shards/_search

GET news_index25_5shards/_doc/M8wX1ZABL8Sddl6kd3WD


GET news_index25_5shards/_search 
{
    "track_total_hits": true
}

// ###################################################



GET news_index25_5shards/_search 
{
    "query": {
        "range": {
            "date": {
                "gte": "2015-06-20",
                "lte": "2015-06-22"
            }
        }
    }
}


// #######################################

GET news_index25_5shards/_search 
{
    "aggs": {
        "by_category23": { 
            "terms": {
                "field": "category",
                "size": 100
            }
        }
    }
}
// by default only top 10 hits are shown (size defaults to 10)
// if you want more results ---> use from/size (from acts as offset)
// ######################################################


GET news_index25_5shards/_search 
{
    "query": {
        "match": {
            "category": "ENTERTAINMENT"
        }
    },
    "aggregations": {
        "popular_in_entertainment23": {
            "significant_text": {
                "field": "headline"
            }
        }
    }
}