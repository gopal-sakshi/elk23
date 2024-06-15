// create index
await client.indices.create({ index: 'my_index' });


// index a document
await client.index({
    index: 'index23_MUST-be__string',
    id: '',
    document: 'any json object it seems'
});
