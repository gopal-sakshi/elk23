# EXPLANATION23

combine metric & bucket aggregations
- sum of revenue per day
- step1 ----> split data into daily buckets
- step2 ----> within each bucket, we have to perform metric aggregations

we have two aggregations
- transaction_value_per_day12
- daily_revenue13

===================================================

`step1`
transaction_value_per_day12
- we are running a "date_histogram" (a type of bucket aggregation)
- then, as output, we get data23 ---> where dataset is split into daily buckets


===================================================

`step2`
step1 gives an output...
on that output, we apply sub-aggregation ---> daily_revenue13
revenue of a transaction ===> unitprice * quantity
that is why we use script tag

`step3`

multiple aggregations
- on "transactions_per_day12" ----> we will run 2 sub-aggregations
- 2 sub-aggregations
    daily_revenue13
    number_of_unique_customers_per_day14