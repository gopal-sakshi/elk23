/*
    bucket aggregations = perform aggregations on several subsets of documents
    Date_histogram = group data by time interval; doc_count ===> no. of documents that fall within the time interval.
    Histogram aggregation = create buckets based on time intervals.
    Range aggregation = allows you to define intervals of varying sizes 
    Terms aggregation = creates a new bucket for every unique term it encounters for the specified field.
*/


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_8_hrs_23": {
            "date_histogram": {
                "field": "InvoiceDate",
                "fixed_interval": "8h"
            }
        }
    }
}
// 2291 documents b/w Dec1st 12am to Dec1st 8am
// 805 documents b/w Dec1st 8am to Dec1st 4pm
// and so on...     all 23 lakh transactions are grouped in 8hr time period

GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_by_month23": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "1M",
                "order": {
                    "_key": "desc"
                }
            }
        }
    }
}

// 42170 documents in Dec 2010 month
//  34999 documents in Jan 2011 month
// ...
// 2543 documents in Dec 2011 month 
// ===================================================================================


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_per_price_interval": {
            "histogram": {
                "field": "UnitPrice",
                "interval": 10,
                "order": { "_key": "desc" }
            }
        }
    }
}
// more than 500,000 transactions for items priced within this 0-10.

// ===================================================================================


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_per_custom_price_ranges23": {
            "range": {
                "field": "UnitPrice",
                "ranges": [
                    { "to": 50 },
                    { "from": 50, "to": 200 },
                    { "from": 200 }
                ]
            }
        }
    }
}
// ===================================================================================


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "top_5_customers23": {
            "terms": {
                "field": "CustomerID",
                "size": 5
            }
        }
    }
}
// customer with ID 17841 ====> highest number of transactions @ 7983


// to verify = it shows that there are 7983 documents with 17841 customerId

GET ecommerce_index24_mapping/_search
{
    "query": {
        "bool": {
            "must": {
                "match": { "CustomerID": 17841 }
            }      
        }
    }
}
// ===================================================================================