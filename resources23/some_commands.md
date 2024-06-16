curl localhost:9200/_settings

curl localhost:9200/_cat/indices
curl -XGET http://localhost:9200/_cat/indices
curl -XGET http://localhost:9200/_cat/indices/eng_movies24?v
    health
    status
    index
    uuid
    pri             number of primary shards
    rep             number of replica shards ???
    docs.count
    store.size
    pri.store.size      combined size of all primary shards

<!-- ----------------------------------------------------------------------->

curl -XGET http://localhost:9200/_cat/nodes?v

curl -XGET http://localhost:9200/_cat/shards
curl -XGET http://localhost:9200/_cat/shards?v

curl -XGET http://localhost:9200/_cat/shards/eng_movies24?v


curl -XGET http://localhost:9200/_cluster/stats

curl -XGET http://127.0.0.1:9200/search-books24/_search?pretty
- to show all the data in "search-books24" index

curl -XGET http://127.0.0.1:9200/eng_movies24/_search?size=10
- to show ONLY 10 hits from eng_movies24 index

curl -XGET http://127.0.0.1:9200/eng_movies24/_search?size=3&from=100
- to show 3 hits... but offset from 100


curl -XGET http://127.0.0.1:9200/eng_movies24/_search?q=Aladag
- returns 2 hits (or) 2 movies associated with Aladag
- movie titles ==========> Inbetween Worlds (or) When We Leave
- see the search_with_q.json
- Note the score value in the result, this indicates the relevance of the hit, in this case 7.1502776.


curl -XGET http://127.0.0.1:9200/eng_movies24/_search?q=Aladag~
- apply fuzzy search (by adding tilde at the end)
- returns 2 hits (or) 2 movies associated with Aladog
- movie titles ==========> Inbetween Worlds (or) When We Leave
- see the search_with_q.json
- Note the score value in the result, this indicates the relevance of the hit, in this case 7.1502776.


curl localhost:9200/_cat/health
curl localhost:9200/_cat/health?v           // verbose

curl -XGET 'http://localhost:9200/_cluster/health' | jq

