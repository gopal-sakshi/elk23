<using GET api>
curl -XGET localhost:9200/footballers_index12/_doc/cTkJJZABKtouQzwO89N8?pretty
curl -XGET localhost:9200/footballers_index12/_doc/Yzn0JJABKtouQzwONtOX?pretty

<using SEARCH api>      <returns version>
curl -X GET "localhost:9200/footballers_index12/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "version": true,
    "query": {
        "match": {
            "_id": "cTkJJZABKtouQzwO89N8"
        }
    }
}'

<document version number>
- Even though there is a version number associated with each create/index/update/delete operation, 
- this version number can't be used to retrieve the older version of the document
- you'll need to maintain versions yourself, as in create a new document for each document change 