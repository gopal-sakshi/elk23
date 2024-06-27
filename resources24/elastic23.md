PUT vs POST
- POST autogenerates ID
- PUT, we provide 'id' for the document we want to insert

-----------------------------------------------------------------------
we are getting a 200-OK response 
201-Created response this time
-----------------------------------------------------------------------

PUT index23/_doc/id23 { payload }
- replaces whatever data is present in <id23> document with payload


PUT index23/_create/id23 { payload }
- throws error if id23 document already exists



POST index23/_update/1002
- updates the data in 1002 document

DELETE index23/_doc/1002
- delete the document

-----------------------------------------------------------------------

true positives (TP)     relevant docs & rightly returned
true negatives (TN)      irrelevant docs, but returned
false positives (FP)  irrelevant doc & rightly not returned
false negatives (FN)     relevant documents, but not returned

precision   = TP / (TP + FP)    
recall      = TP / (TP + FN)

precision
- what porition of retrieved data is actually relevant
- deals only with retrieved data (TP + FP)

recall
- what portion of relevant data is being returned as search results
- deals with all relevant documents... but only some of them returned

ranking
- most relevant docs at the top
- higher <score> means more relevant is the document to the query


`how to form good habits`

doc001        - it has 1 occurence of habit
doc002        - it has 4 occurences of habit
...
doc999        - 0 occurences of habit

term frequency
- term frequency is higher in doc002
- response (2 results) ==> doc002, doc001

inverse document frequency (IDF)
- how, to  ----> these common words are found in all 999 docs
- <to> this word occurs 
- if certain search terms are found in many documents, it knows that these terms are not useful at determining relevance.

-----------------------------------------------------------------------


