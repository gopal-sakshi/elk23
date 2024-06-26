(function () {
	'use strict';

    const { esClient } = require('./exportClient');

	const search = function search(index, body) {
		return esClient.search({index: index, body: body});
	};

	const test = function test() {
		let body = {
			size: 172,           // only get 172 documents
			from: 0,
			query: {
				match_all: {}
			}
		};

		search('library_index24', body)
		.then(results => {
            console.log(`time taken for ${body.size} documents ===> `, results.took)
			results.hits.hits.forEach((hit, index) => console.log(`${index+1} ===> ${hit._source.title}`));
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		search
	};
} ());