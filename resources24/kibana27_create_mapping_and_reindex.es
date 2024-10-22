PUT ecommerce_index24_mapping
{
    "mappings": {
        "properties": {
            "Country":      { "type": "keyword" },
            "CustomerID":   { "type": "long" },
            "Description":  { "type": "text" },
            "InvoiceDate":  { "type": "date", "format": "M/d/yyyy H:m" },
            "InvoiceNo":    { "type": "keyword" },
            "Quantity":     { "type": "long" },
            "StockCode":    { "type": "keyword" },
            "UnitPrice":    { "type": "double" }
        }
    }
}
// the original data.csv ---> some datatypes not recognised by ES; not optimized to run queries
// so, we create our own index (ecommerce_index24_mapping) and reindex 

/*
    #### client request timeout error is coming...
    ### we used wait_for_completion=false; it returns task as response... use task API get tasks/taskid for status
    ### https://discuss.elastic.co/t/in-dev-tools-console-reindex-gets-error-of-client-request-timeout/337920/2
    ### GET _cat/indices/_all  ----> see size of index keeps increasing
    ### see the ongoing tasks using ---> GET /_tasks && GET /_tasks/<task_id>


    GET _cat/pending_tasks
*/


POST _reindex?wait_for_completion=false
{
    "source": {
        "index": "ecommerce_index24"
    },
    "dest": {
        "index": "ecommerce_index24_mapping"
    }
}


GET /_tasks/PjHHFuNTRe-7Sfb8jPbPjw:1019937

GET _cat/indices/_all