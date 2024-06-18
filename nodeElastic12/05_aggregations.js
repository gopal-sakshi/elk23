(function () {
	'use strict';


    const { esClient } = require('./exportClient');

	const search = function search(index, body) {
		return esClient.search({index: index, body: body});
	};

	const test = function test() {

		let body = {
			size: 0,
			from: 0,
			query: {
				match_all: {}
			},
			aggregations: {
				min_year: {
					min: {field: 'year'}
				},
				max_year: {
					max: {field: 'year'}
				},
				year_percentile: {
					percentiles: {field: 'year'}
				},
				year_histogram: {
					histogram: {field: 'year', interval: 5}
				},
				// keywords: {
				// 	terms: {
				// 		field: 'keywords',
				// 		size: 20
				// 	}
				// }
			}
		};

        search('library_index24', body)
		.then(results => {
			console.log(`calculated aggregations in =======> ${results.took}ms`);
			console.log(`oldest article is published in ===> ${results.aggregations.min_year.value}`);
			console.log(`newest article is published in ===> ${results.aggregations.max_year.value}`);
			console.log(`histogram of number of articles published in 5-year intervals`);
			results.aggregations.year_histogram.buckets.forEach(bucket => {
                console.log(`count in ${bucket.key}-${bucket.key + 4}: ${'#'.repeat(bucket.doc_count/5)} (${bucket.doc_count})`)
            });

			console.log(`percentile of articles published in different years:`);
			console.log(`01% of articles published on or before ${results.aggregations.year_percentile.values['1.0']}`);
			console.log(`05% of articles published on or before ${results.aggregations.year_percentile.values['5.0']}`);
			console.log(`25% of articles published on or before ${results.aggregations.year_percentile.values['25.0']}`);
			console.log(`50% of articles published on or before ${results.aggregations.year_percentile.values['50.0']}`);
			console.log(`75% of articles published on or before ${results.aggregations.year_percentile.values['75.0']}`);
			console.log(`95% of articles published on or before ${results.aggregations.year_percentile.values['95.0']}`);
			console.log(`99% of articles published on or before ${results.aggregations.year_percentile.values['99.0']}`);

			// console.log(`\ntop ${results.aggregations.keywords.buckets.length} article tags:`);
			// results.aggregations.keywords.buckets.forEach((bucket, index) => console.log(`\t${++index} ${bucket.key}: ${bucket.doc_count}`));
		})
		.catch(console.error);
	};

	test();

	module.exports = {
		search
	};
} ());
