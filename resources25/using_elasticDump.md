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
    
  
npx elasticdump \
    --input=http://localhost:9200/telugu_movies23 \
    --output=/home/gopalakrishnas/Desktop/repos23/others23/elk23/tel_movies24.json \
    --type=data

npx elasticdump \
    --input=tel_movies24.json \
    --output=http://localhost:9200/telugu_movies23 \
    --type=data
============================================================================

https://blog.logrocket.com/a-practical-guide-to-working-with-elasticdump/
