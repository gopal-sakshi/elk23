curl localhost:9200/_settings


## shards
curl -XGET http://localhost:9200/_cat/shards?v
curl -XGET http://localhost:9200/_cat/shards/footballers_index12?v


## indices
curl -XGET http://localhost:9200/_cat/indices
curl -XGET http://localhost:9200/_cat/indices/eng_movies24?v        <!-- details about 1 particular index -->
curl -XGET http://localhost:9200/_cat/indices/footballers_index12?v
curl -X GET "localhost:9200/_cat/indices/*24?v"         <!-- return only those indices that end with 24 (regex) -->
curl -XGET http://localhost:9200/_cat/indices?h=index,uuid,docs.count       <!-- output only 3 columns -->




<!-------------------------------------------------------------------->


### clusters & nodes

curl -XGET http://localhost:9200/_cat/nodes?v
curl -XGET http://localhost:9200/_cluster/stats

### health
curl -XGET localhost:9200/_cat/health?v                             <!-- verbose -->
curl -XGET 'http://localhost:9200/_cluster/health' | jq             <!-- json output -->

<!-------------------------------------------------------------------->

`info about index`
    health                  yellow | green | red
    status
    index                   index name
    uuid
    pri                     number of primary shards
    rep                     number of replica shards ???
    docs.count              number of documents
    store.size
    pri.store.size          combined size of all primary shards
<!-------------------------------------------------------------------->