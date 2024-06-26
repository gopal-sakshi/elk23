(function () {
	'use strict';

    const { esClient } = require('./exportClient');

	const suggest = function search(index, body) {
		return esClient.suggest({index: index, body: body});
	};

	const test = function test() {
		let body = {
			text: 'dolo lore fugi',
			titleSuggester: {
				term: {
					field: 'title'
				}
			}
		};

		suggest('library_index24', body)
		.then(results => {
			console.log(`suggestions23 for each term are =====> `);
			results.titleSuggester.forEach((term, index) => {
				console.log(`term ${++index} ===>: ${term.text}`);
				term.options.forEach((option, index) => console.log(`\t suggestion ${++index}: ${option.text}`));
			});
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		suggest
	};
} ());