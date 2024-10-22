// either specify doc (or) source...

POST news_index25_5shards/_update/6FMLspIBT-3KNVkY9SIn
{
    "doc": {
        "headline": "update_headline23 CollegeFashionista23 edo pirates show"
    }
}

POST news_index25_5shards/_update/oVMNspIBT-3KNVkYL3OH
{
    "doc": {
        "authors": "CollegeFashionista23 oka author"
    }
}

GET news_index25_5shards/_search
{
    "query": {
        "query_string": {
            "query": "CollegeFashionista23",
            "fields": [ "authors", "headline" ]
        }
    }
}