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
				minYear23: {
					min: { field: 'year' }
				},
				maxYear23: {
					max: { field: 'year' }
				},
				yearPercentile23: {
					percentiles: { field: 'year' }
				},
				yearHistogram23: {
					histogram: { field: 'year', interval: 5 }
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
            console.log("results ====> ", JSON.stringify(results))
			console.log(`calculated aggregations in =======> ${results.took}ms`);
			console.log(`oldest article is published in ===> ${results.aggregations.minYear23.value}`);
			console.log(`newest article is published in ===> ${results.aggregations.maxYear23.value}`);
			console.log(`histogram of number of articles published in 5-year intervals`);
			results.aggregations.yearHistogram23.buckets.forEach(bucket => {
                console.log(`count in ${bucket.key}-${bucket.key + 4}: ${'#'.repeat(bucket.doc_count/5)} (${bucket.doc_count})`)
            });

			console.log(`percentile of articles published in different years:`);
			console.log(`01% of articles published on or before ${results.aggregations.yearPercentile23.values['1.0']}`);
			console.log(`05% of articles published on or before ${results.aggregations.yearPercentile23.values['5.0']}`);
			console.log(`25% of articles published on or before ${results.aggregations.yearPercentile23.values['25.0']}`);
			console.log(`50% of articles published on or before ${results.aggregations.yearPercentile23.values['50.0']}`);
			console.log(`75% of articles published on or before ${results.aggregations.yearPercentile23.values['75.0']}`);
			console.log(`95% of articles published on or before ${results.aggregations.yearPercentile23.values['95.0']}`);
			console.log(`99% of articles published on or before ${results.aggregations.yearPercentile23.values['99.0']}`);

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
