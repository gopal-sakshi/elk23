(function () {
	'use strict';

    const { esClient } = require('./exportClient');


	const search = function search(index, body) {
		return esClient.search({ index: index, body: body });
	};

	const test = function test() {
        const match23 = {
            title: {
                query: process.argv[2] || 'labore',
                minimum_should_match: 3,
                fuzziness: 2
            }
        }
		let body = {
			size: 20,           // fetch 20 items at a time
			from: 0,
			query: { match: match23 }
		};

		search('library_index24', body)
		.then(results => {
			if (results.hits.total.value > 0) {
                results.hits.hits.forEach((hit, index) => {
                    console.log("===> ", `${body.from + ++index}--${hit._source.title}`, " score23 ==> ", `${hit._score}` )
                });
            }
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		search
	};
} ());
