<success search>
{
    took: 30,
    timed_out: false,
    _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
    hits: {
        total: { value: 386, relation: 'eq' },
        max_score: 4.517541,
        hits: [
            [Object], [Object], [Object],
            [Object], [Object], [Object],
            [Object], [Object], [Object],
            [Object], [Object], [Object],
            [Object], [Object], [Object],
            [Object], [Object], [Object],
            [Object], [Object]
        ]
    }
}

[Object] is 
{
    "_index": "library_index24",
    "_type": "_doc",
    "_id": "57508457c01fafb70bc589b5",
    "_score": 8.85524,
    "_ignored": [
        "body.keyword"
    ],
    "_source": {
        "id": "57508457c01fafb70bc589b5",
        "info23": "_source ==> actual document... plus 'id' field"
    }
}
keys in library_index24 object
    id, title, journal,volume, number
    pages, year, authors, abstract, link, keywords, body
<!-------------------------------------------------------------------------------------------------->

<failed search>

{
    took: 5,
    timed_out: false,
    _shards: { 
        total: 1, 
        successful: 1, 
        skipped: 0, 
        failed: 0 
    },
    hits: { 
        total: { 
            value: 0, 
            relation: 'eq' 
        }, 
        max_score: null, 
        hits: [] 
    }
}