curl -X DELETE "http://localhost:9200/eng_movies25?pretty"
<to delete index, documents, shards, everything - except kibana dataviews>
<!-- ----------------------------------------------------------------------->


curl -X DELETE "localhost:9200/footballers_index12/_doc/cTkJJZABKtouQzwO89N8?pretty"

<!------------------------------------------------------------------------------>
Output    ===============>
{
    "_index" : "footballers_index12",
    "_type" : "_doc",
    "_id" : "cTkJJZABKtouQzwO89N8",
    "_version" : 2,
    "result" : "deleted",
    "_shards" : {
        "total" : 4,
        "successful" : 3,
        "failed" : 0
    },
    "_seq_no" : 11,
    "_primary_term" : 1
}
<!------------------------------------------------------------------------------>