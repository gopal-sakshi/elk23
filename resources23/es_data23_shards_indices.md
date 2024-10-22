curl localhost:9200/_settings


## shards
curl -XGET http://localhost:9200/_cat/shards?v
curl -XGET http://localhost:9200/_cat/shards/footballers_index12?v
curl -XGET http://localhost:9200/_cat/shards/news_index25_5shards?v
curl -XGET http://localhost:9200/_cat/shards/news_index25_5shards?node=es01&v

## indices
curl -XGET http://localhost:9200/_cat/indices
curl -XGET http://localhost:9200/_cat/indices/eng_movies24?v        <!-- details about 1 particular index -->
curl -XGET http://localhost:9200/_cat/indices/news_index25_5shards?v
curl -XGET http://localhost:9200/_cat/indices/footballers_index12?v
curl -X GET "localhost:9200/_cat/indices/*24?v"         <!-- return only those indices that end with 24 (regex) -->
curl -XGET http://localhost:9200/_cat/indices?h=index,uuid,docs.count       <!-- output only 3 columns -->
curl -X DELETE "localhost:9200/news_index25__dontRUN_By_mistake?pretty"                          <!-- delete index -->

curl -s -XGET "http://localhost:9200/_cat/indices/*,-.*?v"        <!-- hide all system indices -->
curl -s -XGET "http://localhost:9200/_cat/indices/*,-temp*"     <!-- hide all indices that has temp -->

<!-------------------------------------------------------------------->


### clusters & nodes

curl -XGET http://localhost:9200/_cat/nodes?v
curl -XGET http://localhost:9200/_cluster/stats
curl -XGET http://localhost:9200/_nodes/stats?pretty=true
curl -XGET http://localhost:9200/_nodes/stats?pretty=true > blah.json
curl -XGET http://localhost:9200/_nodes/stats?pretty=true | grep heap

curl -XGET "http://localhost:9200/_nodes/es02/stats"            <!-- info about es02 node alone -->


### health
curl -XGET localhost:9200/_cat/health?v                             <!-- verbose -->
curl -XGET 'http://localhost:9200/_cluster/health' | jq             <!-- json output -->


curl -sS  "localhost:9200/_cat/nodes?h=heap*&v"
<!-------------------------------------------------------------------->

### snapshot & restore
curl -XGET 'http://localhost:9200/_snapshot/repository23/_all?pretty'
curl -XPUT "http://localhost:9200/_snapshot/repository23/snapshot_blah_jun23?wait_for_completion=true"
cd /usr/share/elasticsearch/data/snapshots23            <!-- it seems snapshot got created -->
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