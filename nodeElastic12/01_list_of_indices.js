(async function () {
	'use strict';
    const { esClient } = require('./exportClient');

	const indices = function indices() {
		return esClient.cat.indices({v: true})
		.then((resp) => {
            console.log("list of indices =======> ", resp);
            return resp
        })
		.catch(err => console.error(`Error connecting to the es client: ${err}`));
	};

	const test = function test() {
		indices();
	};

	test();

	module.exports = {
		indices
	};
} ());
