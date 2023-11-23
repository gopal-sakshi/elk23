# Elastic
Configure where elastic stores data on the host in .env file `ELASTIC_DATA_PATH`

# Logstash
We use gelf driver as input
All input streams from gelf driver are stored in elasticSearch with index `cbp-api-logs`

# Kibana
Navigate to Stack Management and create DataView with index `cbp-api-logs`
Observe the new incoming data in discover tab

# Configure docker

(A) Using docker compose 

```yml
logging:
    driver: gelf
    options:
    gelf-address: udp://localhost:12201
    tag: "node23_gelf23"
```

(B) running docker from command line
    docker run --detach --log-driver gelf --log-opt gelf-address=udp://localhost:12201 --log-opt tag=node23_gelf23 -p 18090:18090 --name node23 level2a

        --detach        = run in detached mode
        --log-driver    = we use gelf logging driver
        --log-opt       = direct logs to udp://localhost:12201 with tag 'node23_gelf23'
        -p              = port mapping
        --name          = name of the docker container
        level2a         = name of the image