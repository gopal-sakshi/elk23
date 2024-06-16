elastic25
- single node Elastic cluster
- not much use it seems


elastic26
- 3 node elastic cluster
- with security enabled


Much like Apache Cassandra — where multiple copies of the data are kept across nodes 
you can add more nodes to a live cluster — Elasticsearch scales horizontally. 
Within Elasticsearch, each node (be it a physical server, virtual server, etc.) is part of a cluster.

--------------------------------------------------------------------------
es01 (master node) listens on localhost:9200
es02 & es03 talk to es01 over a Docker network.
es02 & es03 ====> two data nodes 
                    two docker containers
                    ie two machines
when es01 is down ---> es02 automatically becomes master node
--------------------------------------------------------------------------