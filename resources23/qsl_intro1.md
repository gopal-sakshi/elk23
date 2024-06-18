# DSL (Domain Specific Language)

`leaf query clauses`

<match>


<term>


<range>

<!-------------------------------------------------------------------------->

`compound query clauses`
- wrap other leaf/compound queries
- combine multiple queries using <bool> <dis_max>


<!-------------------------------------------------------------------------->


`term_vs_match`
- When a document is indexed, the text fields are analyzed. 
- Analysis includes tokenizing & lowercasing the text and removing punctuation. 
- Unlike match queries, which analyze the query text, 
- term queries <only match the exact term> and thus may not return relevant results. 
- Avoid using term queries on text fields. 
- it is best to use term level queries with keyword type fields

field of <keyword type>
- text is indexed as it is in Elasticsearch
- "New York" =====> stored as "New York"

field of <text type>
- text is analyzed at the index time itself and stored in Elasticsearch.
- "New York" =======> broken down into "new" and "york"
- you will find the results <while searching for "yor*"> in the <city field>




Unlike full-text queries, term-level queries do not analyze search terms. 
Instead, term-level queries match the exact terms stored in a field.

However it is best to use term level queries with keyword type fields