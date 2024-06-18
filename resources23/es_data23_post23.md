# POST data example

curl -XPOST “http://localhost:9200/indexname/typename/optionalUniqueId” -d ‘{ “field” : “value” }‘

<curl> is a command that sends messages over HTTP.

`-X` is the option that tells curl which HTTP command to send. GET is the default.

`POST` is one of the HTTP commands that you can use for this insertion. 
PUT will work as well, but then the optionalUniqueId is not optional.

`localhost:9200`
- the machine & port number where elasticsearch is running

`indexname`
- name of your index. 
- must be in all lowercase. 


`typename` 
- describes the type of document you’re sticking into the index. 
- You can use this later to narrow searches. 
- Also, the ID of each document in the index should be unique per type.
- but we didnt supply id in payload... elastic itself creates randomID for us
- it seems, this is deprecated ???
- https://www.elastic.co/guide/en/elasticsearch/reference/7.17/mapping-type-field.html

`optionalUniqueId` 
- if you have an intelligent ID for the document you’re sticking in, then put it here. 
- Otherwise elasticsearch will create one. 
- When you want to update your object, you’ll need this. 
- it’s also handy for retrieval of exactly one object.

`-d` tells curl “here comes the data!”
- { “field” : “value” } represents any valid JSON. 
- all this stuff is stored for your object.

<!-- ---------------------------------------------------------------------- -->

curl -XPOST "http://localhost:9200/footballers_index12/_doc/cTkJJZABKtouQzwO89N8" -H "Content-Type: application/json" -d '{
        "playerName": "CR7",
        "position": "Striker",
        "otherDetails": {
            "country": "Portugal",
            "otherClubs": ["ManU", "Real Madrid", "Juventus"]
        },
        "awards": {
            "pichichi": [2011, 2014, 2015],
            "balonDor": [2008, 2013, 2014, 2016, 2017],
            "uclSquad": [2008, 2013, 2014, 2015, 2016, 2017, 2018],
            "fifaPlayer": [2016, 2017],
            "uefaPlayer": [2014, 2016, 2017],
            "puskas": [2009]
        },
        "skills": {
            "pace": 93,
            "shooting": 94,
            "passing": 82,
            "dribbling": 81,
            "tackling": 70,
            "defence": 54,
            "physicality": 80 
        },
        "presentClub": "Al Nassr"
    }'
<!-- --------------------------------------------------------------------------- -->
Output ===> 

{
    "_index":"footballers_index12",
    "_type":"_doc",
    "_id":"cTkJJZABKtouQzwO89N8",
    "_version":1,
    "result":"created",
    "_shards":{
        "total":4,
        "successful":3,
        "failed":0
    },
    "_seq_no":10,
    "_primary_term":1
}
<!-- --------------------------------------------------------------------------- -->