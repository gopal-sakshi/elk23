GET news_index25_5shards/_search
{
    "query": {
        "bool": {
            "must": [
                { "match_phrase": { "headline": "Michelle Obama" } },
                { "match": { "category": "POLITICS" } }
            ]
        }
    }
}
// MUST ---> array of 2 queries --> 'match_phrase' && 'match' ===> 94 HITS
// match_phrase for 'headline' & match for 'category'



GET news_index24/_search
{
    "query": {
        "bool": {
            "must": {
                "match_phrase": {
                    "headline": "Michelle Obama"
                }
            }
        }
    }
}
// Michelle Obama is present in headlines in 220 docs



GET news_index24/_search
{
    "query": {
        "bool": {
            "must": {
                "match_phrase": {
                    "headline": "Michelle Obama"
                }
            }
        }
    },
    "aggs": {
        "category23": {
            "terms": {
                "field": "category",
                "size": 100
            }
        }
    }
}
### Michelle Obama is present in headlines in 220 docs
### then we aggregated it based on category ---> 
### style/beauty 93; politics 53; black voices 16; parenting 11;



GET news_index24/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": { "headline": "Michelle Obama" }
        }, 
        { 
          "match": { "category": "BLACK VOICES" } 
        }
      ]
    }
  }
}
#### Michelle Obama is present in headlines in 220 docs
### we want only those docs with category 'BLACK VOICES' ---> 16 docs


GET news_index24/_search
{
  "query": {
    "bool": {
      "must": {
        "match_phrase": {
          "headline": "Michelle Obama"
         }
        },
       "must_not":[
         {
          "match": {
            "category": "POLITICS"
          }
        }
      ]
    }
  }
}

### all the docs that contain the phrase "Michelle Obama" in the field headline. 
### ES excludes all documents that contain the term "POLITICS" in the field category
### 220 docs - 53 politics docs ====> 167 hits 


GET news_index24/_search
{
  "query": {
    "bool": {
      "must": [
        {
        "match_phrase": {
          "headline": "Michelle Obama"
          }
         }
        ],
       "should":[
         {
          "match_phrase": {
            "category": "BLACK VOICES"
          }
        }
      ]
    }
  },
  "from": 10,
  "size":30
}
### should query ---> also called 'nice_to_have' queries; here category:BLACK_VOICES --> is a nice_to_have query
### so, all 220 docs are returned... but the 16 docs with 'black voices' category --> get higher score
### other docs which dont match 'nice_to_have' query (ie whose category is politics/beauty) --> are also a match
### but their score will be lower
#### documents do not need to match the "nice to have" queries to be considered as hits
### those docs ---> will get lower score




GET news_index24/_search
{
  "query": {
    "bool": {
      "must": [
        {
        "match_phrase": {
          "headline": "Michelle Obama"
          }
         }
        ],
       "filter":{
          "range":{
             "date": {
               "gte": "2014-03-25",
               "lte": "2016-03-25"
          }
        }
      }
    }
  }
}
### filter clause ===>  filter queries that place documents into either "yes" or "no" category.
### Michelle Obama in field headline plus docs published within the given date range.



GET news_index24/_search
{
  "query": {
    "bool": {
      "must": [
        { "match_phrase": { "headline": "Michelle Obama" } }
      ],
      "should": [
        { "match": { "headline": "Becoming" } },
        { "match": { "headline": "women" } },
        { "match": { "headline": "empower" } }
      ]
    }
  }
}
### all docs that contain "Michelle Obama" in headline
### but favour those docs that whose headline is - becoming/women/empower
