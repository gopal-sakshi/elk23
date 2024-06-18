### mappings
curl -XGET 'http://localhost:9200/_mapping?pretty=true'
curl -XGET 'http://localhost:9200/footballers_index12/_mapping?pretty=true'


`dynamic mapping`
- Every field in the document has a field type, which defines the type of data the field contains
- when you index a document, elastic search adds fields automatically with dynamic mapping.

`explicit mapping`
- you can specify <year field> should be of type <date>
- (or) indicate <year field> should be of type <text> or <integer> or <age>


Text fields
- not optimised for operations like aggregations & sorting
- use a <keyword field> instead
- see `qsl_intro1.md`       <term_vs_match>
