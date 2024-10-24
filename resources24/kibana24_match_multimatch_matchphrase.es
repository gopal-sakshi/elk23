
GET news_index25_5shards/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner"
            }
        }
    }
}
/*
    ## By default, the match query uses an "OR" logic. 
    ## If a document contains one of the search terms, 
    ## Elasticsearch will consider that document as a hit.
    ### "OR" logic results in higher number of hits, thereby increasing recall
    ########################################################
*/



GET news_index25_5shards/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner",
                "operator": "and"
            }
        }
  }
}
// we increase precision by adding AND operator




GET news_index25_5shards/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Khloe Kardashian Kendall Jenner",
                "minimum_should_match": 3
            }
        }
    }
} 
// minimum number of terms a document should have, for it to be included in the search results.




GET news_index25_5shards/_search
{
    "query": {
        "match": {
            "headline": {
                "query": "Shape of you"
            }
        }
    }
}
/*
    #### more than 10k results; any doc with 'you' in headline is a hit
    ### match ===> search for a phrase, it has high recall but low precision.
    ### It pulls up more loosely related documents as it uses "OR" logic by default.
*/




GET news_index25_5shards/_search
{
    "query": {
        "match_phrase": {
            "headline": {
                "query": "Shape of You"
            }
        }
    }
}
// match_phrase ===> all 3 phrases must appear - in that order - next to each other


GET news_index25_5shards/_search
{
    "query": {
        "multi_match": {
            "query": "Michelle Obama",
            "fields": [
                "headline",
                "short_description",
                "authors"
            ]
        }
    }
}
// multi_match ===> searches for Michelle Obama in 3 fields


GET news_index25_5shards/_search
{
    "query": {
        "multi_match": {
            "query": "Michelle Obama",
            "fields": [
                "headline^2",
                "short_description",
                "authors"
            ]
        }
    }
} 
// per-field boosting == doc that contain "Michelle Obama" in headline is given double weightage



GET news_index25_5shards/_search
{
    "query": {
        "multi_match": {
            "query": "thinking and planning",
            "fields": [
                "headline^2",
                "short_description"
            ],
            "type": "phrase"
        }
    }
}





GET news_index25_5shards/_search
{
    "query": {
        "match_phrase": {
            "headline": "Michelle Obama"
        }
    },
    "aggregations": {
        "category_mentions23": {
            "terms": {
                "field": "category",
                "size": 100
            }
        }
    }
}
// query all data that has the phrase "Michelle Obama" in the headline.
// then perform aggregations on the queried data
