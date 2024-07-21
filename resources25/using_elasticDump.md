elasticdump
- npm install elasticdump

============================================================================
elasticdump --input SOURCE --output DESTINATION [OPTIONS]

input       = elasticURL (or) file
output      = elasticURL (or) file
type        = mapping, data, 

other flags
    -- fileSize=10kb
    --searchBody="{\"query\":{\"range\":{\"Horsepower\": {\"gte\": "201", \"lte\": "300"}}}}"
    
  

elasticdump \
    --input=http://localhost:9200/sample_index \
    --output=/Users/retina/Desktop/sample_file.json \
    --type=data

============================================================================

https://blog.logrocket.com/a-practical-guide-to-working-with-elasticdump/
