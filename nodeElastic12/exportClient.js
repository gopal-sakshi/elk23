const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
    node: 'http://localhost:9200'
});

(async () => {
    const resp = await esClient.info();
    // console.log("elastic client connection status ===> ", resp);
})();


module.exports = { esClient: esClient }