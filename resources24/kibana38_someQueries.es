POST /marks23/_bulk?refresh=wait_for
{ "index":{} }
{ "name":"abhi", "values":[35, 39, 45, 25, 85, 42] }
{ "index":{} }
{ "name": "balu", "values":[45, 37, 33, 66, 95, 82] }
{ "index":{} }
{ "name": "charan", "values":[55, 69, 44, 69, 35, 92] }
{ "index":{} }
{ "name": "dinesh", "values":[17, 89, 54, 29, 85, 62] }
{ "index":{} }
{ "name": "eswar", "values":[19, 90, 82, 17, 71, 42] }
{ "index":{} }
{ "name": "farooq", "values":[99, 10, 76, 55, 50, 92] }
{ "index":{} }
{ "name": "ganesh", "values":[87, 55, 54, 16, 40, 54] }


POST /marks23/_search?pretty&filter_path=hits.hits._source
{
    "query": {
        "terms": { "values": [87, 55, 42]}
    }
}   
// 87, 55, 42 ===> ee values lo edi unna okay; 
// 87 ganesh lo undi;       55 farooq & charan;         42 abhi & eswar

//----------------------------------------------------------------------------
POST /marks23/_search?pretty&filter_path=hits.hits._source
{
    "query": {
        "bool": {
            "filter": [
                { "term": { "values": 55 } },
                { "term": { "values": 92 } }
            ]
        }
    }
}
// only charan & farooq === had both values 55 & 92
//----------------------------------------------------------------------------

GET /eng_movies24/_search?pretty&filter_path=hits.hits._source.fullplot,hits.total
{
    "query": {
        "query_string": {
            "query": "(Best jewelry) OR (fulfilling their last wishes)",
            "default_field": "fullplot"
        }
    }
}

//---------------------------------------------------------------------------------
{
    "query": {
        "query_string": {
            "default_field": "hardware", 
            "query" : "*laptop*"
        }
    }
} // searches for terms that contain laptop anywhere in their string

{
    "query": {
        "match": { 
            "hardware": "laptop"
        }
    }
} // search for docs that contain the word "laptop" as a whole

{
    "query": {
        "wildcard": { 
            "hardware.standard": {
                "value": "*laptop*"
            }
        }
    }
} // same as 1st one; query_string & wildcard query ===> both are same more or less

// query_string === create complex search - wildcard characters, search multiple fields
// query ========== search in single field... cant use wildcard stuff

//---------------------------------------------------------------------------------

GET news_index25_5shards/_search
{
    "query": {
        "query_string": {
            "query": "CollegeFashionista",
            "fields": [ "authors", "headline" ]
        }
    }
} // search in 3 fields
