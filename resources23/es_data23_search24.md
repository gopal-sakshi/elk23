curl -XGET http://127.0.0.1:9200/footballers_index12/_search            <!-- show all documents -->

`query params`

curl -XGET http://127.0.0.1:9200/eng_movies24/_search?

pretty                      <!-- show all documents pretty format -->
size=2                      <!-- show ONLY 2 hits from eng_movies24 index -->
size=3&from=100             <!-- show 3 documents... but offset from 100 -->


`search with keyword`
curl -XGET http://127.0.0.1:9200/footballers_index12/_search?

q=France                            <!-- returns all documents with "France" text -->
q=Frace~                            <!-- fuzzy search with tilde -->



<!------------------------------------------------------------------------------>
curl -XGET http://127.0.0.1:9200/eng_movies24/_search?q=Aladag
- returns 2 hits (or) 2 movies associated with Aladag
- movie titles ==========> Inbetween Worlds (or) When We Leave
- see the search_with_q.json
- Note the score value in the result, this indicates the relevance of the hit, in this case 7.1502776.


curl -XGET http://127.0.0.1:9200/eng_movies24/_search?q=Aladag~
- apply fuzzy search (by adding tilde at the end)
<!------------------------------------------------------------------------------>