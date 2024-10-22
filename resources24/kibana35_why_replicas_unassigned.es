GET /_cat/shards?v=true&h=index,shard,prirep,state,node,unassigned.reason&s=state&pretty

GET /_cluster/allocation/explain?pretty
{
  "index": "news_index25_5shards", 
  "shard": 0, 
  "primary": true ========================= or give false
}


GET _cat/pending_tasks


GET news_index25_5shards/_settings?flat_settings=true&include_defaults=true


GET _cluster/settings?flat_settings=true&include_defaults=true

curl -XPUT 'localhost:9200/_cluster/settings' -d '{
    "transient" : {
        "cluster.routing.allocation.enable" : "all"
    }
}'
curl -XGET localhost:9200/_cat/shards?h=index,shard,prirep,state,unassigned.reason| grep UNASSIGNED


// reduce the number of replicas
curl -XPUT "localhost:9200/news_index25_5shards/_settings?pretty" -H 'Content-Type: application/json' -d' { "number_of_replicas": 2 }'



curl -XPUT -H "Content-Type: application/json" http://localhost:9200/_cluster/settings -d '{ "transient": { "cluster.routing.allocation.disk.threshold_enabled": false } }'

curl -XPUT -H "Content-Type: application/json" http://localhost:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'

/*
    N >= R + 1
    - multiple copies of a shard == arent assigned to same node
    - a shard may linger in an unassigned state if there arent enough nodes to distribute shards accordingly

    Some LINKSSSS
    https://stackoverflow.com/questions/33369955/low-disk-watermark-exceeded-on
    https://stackoverflow.com/questions/63880017/elasticsearch-docker-flood-stage-disk-watermark-95-exceeded

*/