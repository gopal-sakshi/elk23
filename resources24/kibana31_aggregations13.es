// SEE EXPLANATION23

// STEP 1 === order based on transaction_value_per_day12 ----> sep12th2011 has most transactions @ 1630

GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transaction_value_per_day12": {
            "date_histogram": { 
                "field": "InvoiceDate",
                "calendar_interval": "day",
                "order": { "_key": "desc" }
            }
        }
    }
}


GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transaction_value_per_day12": {
            "date_histogram": { 
                "field": "InvoiceDate",
                "calendar_interval": "day"
            },
            "aggs": {
                "daily_revenue13": {
                    "sum": { 
                        "script": { "source": "doc['UnitPrice'].value * doc['Quantity'].value" }
                    }
                }
            }
        }
    }
}

// ==========================================================================

GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_per_day12": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "day"
            },
            "aggs": {
                "daily_revenue13": {
                    "sum": {
                        "script": {
                            "source": "doc['UnitPrice'].value * doc['Quantity'].value"
                        }
                    }
                },
                "number_of_unique_customers_per_day14": {
                    "cardinality": {
                        "field": "CustomerID"
                    }
                }
            }
        }
    }
}


{
    "key_as_string" : "12/1/2010 0:0",
    "key" : 1291161600000,
    "doc_count" : 3096,
    "number_of_unique_customers_per_day14" : {
    "value" : 98
    },
    "daily_revenue13" : {
    "value" : 57458.3
    }
}       // this is one of the result --> meaning, on Dec 1st 2010,  unique customers = 98; total revenue = 57458.3
// lets verify

GET ecommerce_index24_mapping/_search
{
    "query": {
        "range": {
            "InvoiceDate": { 
                "gte": "12/01/2010 0:0",
                "lte": "12/01/2010 23:59" 
            }
        }
    },
    "aggs": {
        "unique_customers23": {
            "cardinality": {
                "field": "CustomerID"
            }
        },
        "sum_total_dec1st": {
            "sum": { 
                "script": { "source": "doc['UnitPrice'].value * doc['Quantity'].value" }
            }
        }
    }
}

// ----------------------------------------------------------------------------------
// order based on number_of_unique_customers_per_day14

GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_per_day12": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "day",
                "order": { "number_of_unique_customers_per_day14": "desc" }
            },
            "aggs": {
                "daily_revenue13": {
                    "sum": {
                        "script": {
                            "source": "doc['UnitPrice'].value * doc['Quantity'].value"
                        }
                    }
                },
                "number_of_unique_customers_per_day14": {
                    "cardinality": {
                        "field": "CustomerID"
                    }
                }
            }
        }
    }
}

// order based on daily_revenue13 ---> 
GET ecommerce_index24_mapping/_search
{
    "size": 0,
    "aggs": {
        "transactions_per_day12": {
            "date_histogram": {
                "field": "InvoiceDate",
                "calendar_interval": "day",
                "order": { "daily_revenue13": "desc" }
            },
            "aggs": {
                "daily_revenue13": {
                    "sum": {
                        "script": {
                            "source": "doc['UnitPrice'].value * doc['Quantity'].value"
                        }
                    }
                },
                "number_of_unique_customers_per_day14": {
                    "cardinality": {
                        "field": "CustomerID"
                    }
                }
            }
        }
    }
}
==========================================================================