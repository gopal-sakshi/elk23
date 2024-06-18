curl -X GET "localhost:9200/footballers_index12/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query": {
        "match": {
            "presentClub": "Real Madrid"
        }
    }
}'



<!--------------------------------------------------------->

`sort`
"sort": [
    {
        "playerName": { 
            "order": "desc"
        }
    },
    {
        "position": {
            "order": "asc"
        }
    }
]

`aggs`
"aggs": {
    "aggs23a": {
        "terms": {
            "field": "position", 
            "size": 10
        }
    }
}

`script`
"script_fields": {
    "type": {
        "script": {
            "lang": "painless",
            "source": "doc[\u0027_type\u0027]" 
        }
    }
}
