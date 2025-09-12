This directory contains static JSON datasets used by the application to simulate SQL query results. Most files are adapted from the [graphql-compose-examples Northwind dataset](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/json).

To support performance and virtualization testing, a large dataset (`customers.json`) was added by downloading and copying the `5MB-min.json` file into this folder from [here](https://microsoftedge.github.io/Demos/json-dummy-data/).

This data is fetched using GET requests on the client side.
