(function () {
	'use strict';

    const { esClient } = require('./exportClient');

	const search = function search(index, body) {
		return esClient.search({index: index, body: body});
	};

	const test = function test() {
        let mustQuery = [
            {
                query_string: {
                    // query: '(authors.firstname:D* OR authors.lastname:H*) AND (title:excepteur)'
                    query: '(authors.firstname:Dianne) AND (title:excepteur)'
                }
            }
        ];
        let shouldQuery = [
            {
                match: {
                    body: {
                        query: 'asalu_index_lo_body_property_eh_leduuuuuuuu',
                    }
                }
            }
        ];
        let mustNotQuery = [            // all results not in [1990-2010] range
            {
                range: {
                    year: {
                        lte: 2010,
                        gte: 1990
                    }
                }
            }
        ];
		let body = {
			size: 20,
			from: 0,
			query: {
				bool: {
					must: mustQuery,
					should: shouldQuery,
					must_not: mustNotQuery
				}
			}
		};

		search('library_index24', body)
		.then(results => {
			results.hits.hits.forEach((hit, index) => {
                console.log(`${++index}__ ${hit._source.title.slice(0,20)}__${hit._source.year} __ ${hit._score}`);
            });
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		search
	};
} ());