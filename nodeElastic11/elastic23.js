const express = require('express');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
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

    // RUN THIS ONLY ONCE to add news data with 5 shards
    await addNews23();
})();

const addNews23 = async () => {
    let createIndex23 = await client.indices.create({
        index: 'news_index25_5shards', settings: {
            number_of_shards: 5,
            number_of_replicas: 3
        }
    });
    const data1 = await fs.readFile('./news1.json', 'utf-8');
    var lines = data1.split('\n');
    for (var line = 0; line < (lines.length - 1); line++) {
        console.log("inserting doc1  ===> ", line);
        await client.index({
            index: 'news_index25_5shards',
            document: JSON.parse(lines[line])
        });
    }
    const data2 = await fs.readFile('./news1.json', 'utf-8');
    var lines = data2.split('\n');
    for (var line = 0; line < (lines.length - 1); line++) {
        console.log("inserting doc2  ===> ", line);
        await client.index({
            index: 'news_index25_5shards',
            document: JSON.parse(lines[line])
        });
    }
    console.log("finised loading all docs ====> ");
}

/********************************** ROUTES *****************************/

// curl -XPOST -H "Content-Type: application/json" localhost:42061/loadMoviesWithShards
app.post('/loadMoviesWithShards', async (req, res) => {
    const data = await fs.readFile('./movies26.json', 'utf-8');
    var lines = data.split('\n');
    let createIndex23 = await client.indices.create({
        index: 'eng_movies24', settings: {
            number_of_shards: 5,
            number_of_replicas: 3
        }
    });
    // {"acknowledged":true,"shards_acknowledged":true,"index":"eng_movies25"}
    console.log("created Index23 ====> ", JSON.stringify(createIndex23));
    console.log("length23 ===> ", lines.length);
    for (var line = 0; line < (lines.length - 1); line++) {
        console.log("inserting doc  ===> ", line);
        await client.index({
            index: 'eng_movies24',
            document: JSON.parse(lines[line])
        });
    }
    res.send("data read")
});


app.post('/addFootballers', async (req, res) => {
    for (let line = 0; line < (req.body.data.length - 1); line++) {
        console.log("inserting doc  ===> ", line);
        await client.index({
            index: req.body.index23,
            document: req.body.data[line]
        });
    }
    res.send("footballer data inserted ??")
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
    // https://github.com/behroozk/node-elasticsearch-tutorial
});

app.post('/addBulk', async(req, res) => {
    
    // failing at the moment... so look into it later... try it with different index

    // // feed books data
    // const dataset = data23;
    // const result = await client.helpers.bulk({
    //     datasource: dataset,
    //     pipeline: "ent-search-generic-ingestion",
    //     onDocument: (doc) => ({ index: { _index: 'search-books24' }}),
    // });

    const payload = req.body.data;
    const index23 = req.body.index23;
    
    let createIndex23 = await client.indices.create({
        index: index23, settings: {
            number_of_shards: 2,
            number_of_replicas: 3
        }
    });
    console.log("create index23 result ===> ", createIndex23);
    const result = await client.helpers.bulk({
        datasource: payload,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: index23,  }}),
    });

    console.log("bulk insert result ====> ", result);
    res.send({result23:result})
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
