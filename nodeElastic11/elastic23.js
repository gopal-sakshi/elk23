const express = require('express');
const app = express();
app.listen(42061, () => console.log('hammayya, 42061 lo choosko'));
const data23 = require('./elasticData.json');
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs').promises;
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html

const client = new Client({
    node: 'http://localhost:9200',
    // it seems, auth is needed only if xpack.security is enabled
    // auth: {
    //     apiKey: 'dVZaSUU0c0JDRFFmeFAwckllT0I6RGlkWjExMmZSa1M2LWQ0S1RmY0p4Zw=='
    // }
});

(async () => {
    const resp = await client.info();
    console.log("elastic client connection status ===> ", resp);
})();

/********************************** ROUTES *****************************/

app.get('/loadMoviesWithShards', async (req, res) => {
    const data = await fs.readFile('./movies24.json', 'utf-8');
    var lines = data.split('\n');
    // let createIndex23 = await client.indices.create({
    //     index: 'eng_movies25', settings: {
    //         number_of_shards: 5,
    //         number_of_replicas: 3
    //     }
    // });
    // // {"acknowledged":true,"shards_acknowledged":true,"index":"eng_movies25"}
    // console.log("created Index23 ====> ", JSON.stringify(createIndex23));
    console.log("length23 ===> ", lines.length)
    for (var line = 0; line < 3; line++) {
        console.log("line ===> ", lines[line])
        // await client.index({
        //     index: 'eng_movies25',
        //     document: lines[line]
        // });
    }
    res.send("data read")
});

app.get('/getData1', async (req, res) => {
    const searchResult = await client.search({
        index: 'search-books24',
        q: 'snow'
    });  
    console.log("search results23 ====> ", searchResult.hits.hits);
    res.send({
        info: 'check chesko, results ento',
        data23: searchResult.hits.hits
    });
});

app.get('/runQueries', (req, res) => {

});

app.get('/addBulk', async(req, res) => {
    const dataset = data23;
    const result = await client.helpers.bulk({
        datasource: dataset,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: 'search-books24' }}),
    });
    console.log(result);
});

app.post('/addEntry', async(req, res) => {
    let index = req.body.index;
    let document = req.body.document;
    let result23 = await client.index({
        index: index,
        document: document
    });
    res.send({
        info: 'it seems document added',
        result23: result23
    });

});

app.get('/', async (req, res) => { 
    res.send('basic setup23')
});

/********************************** ROUTES *****************************/
