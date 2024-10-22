## Elastic Search

distributed search engine (or) 
distributed search server


`nodes`
- a single server 
- it is part of elastic search cluster

`shards`
- elastic search indexes are divided into shards
- eng_movies24 ============> is a index; it has 23549 documents
- those 23549 documents are stored in shards, and shards are allocated to nodes in your cluster
- news_index25_5shards ====> is an index with 209,544 documents
    shard 3 = 42022 docs
    shard 4 = 42028 docs 
    shard 1 = 41616 docs
    shard 2 = 42083 docs
    shard 0 = 41795 docs

    es01
    es02

`clusters`
- a collection of one (or) more nodes


<example23>
- say we have an index with 1 billion documents (taking up 1 TB in size)
- those 1bn documents are spread over 5 shards (each shard contains - 200 million documents)
- but Node01 has 3 primary shards & Node02 has 2 primary shards

Node01              1, 2, 3, 4R, 5R
Node02              1R, 2R, 3R, 4, 5

Node01
- it has the whole index
- it has 3 primary shards + 2 replica shards (4R & 5R === exactly same data as primary shards on Node02)

if a node goes down, you still have the whole index. 
The replica shards will automatically become primaries 
and the cluster will work properly despite the node failure,

<!----------------------------------------------------------------------------->

https://stackoverflow.com/questions/15694724/shards-and-replicas-in-elasticsearch