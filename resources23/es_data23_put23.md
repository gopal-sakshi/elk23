# PUT data example

curl -XPUT "http://localhost:9200/footballers_index12/_doc/cTkJJZABKtouQzwO89N8" -H "Content-Type: application/json" -d '{
        "playerName": "CR7_updatedName",
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
Output ===> see these fields (version is 2)
document is updated; now version is 2
`_version` & `result`

{
    "_index":"footballers_index12",
    "_type":"_doc",
    "_id":"cTkJJZABKtouQzwO89N8",
    "_version":2,
    "result":"updated",
    "_shards":{
        "total":4,
        "successful":3,
        "failed":0
    },
    "_seq_no":13,
    "_primary_term":1
}

<!-- --------------------------------------------------------------------------- -->