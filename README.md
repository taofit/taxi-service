# Taxi-service

## Explanation
In order to make a bid and accept a bid on ride,
first, you need to call certain APIs to populate the mongodb Collections, they are as follows:
- add client api
- add fleet api
- add/request ride api<br>

then you can call
- make a bid api
- accept a bid api  

## Run task
- ``docker-compose down --remove-orphans``
- ``docker-compose up --build``

## populate mock data
- you can populate the data as follows or skip these steps and use APIs call instead
- download MongoDB database tools
- get database connection string from such as mongoDB compass
- go to mongoDB's server bin folder
- run command:  
    - .\mongoimport --uri mongodb://localhost:27018/ --jsonArray --db taxiService --collection clients --file \[project root directory\]\src\db\clients.json
    - .\mongoimport --uri mongodb://localhost:27018/ --jsonArray --db taxiService --collection rides --file \[project root directory\]\src\db\rides.json 
    - .\mongoimport --uri mongodb://localhost:27018/ --jsonArray --db taxiService --collection fleets --file \[project root directory\]\src\db\fleets.json

to populate the database

## Run test
1. first find the running application(not mongodb) container name using  `docker ps` command
1. for example, if the container name is `ikea-app-1`, then run command `docker exec -it ikea-app-1 sh` to start an interactive shell. 
1. enter command: `npm run test` in the shell to run test.  

or use docker desktop, 
1. click container name,
1. click `Exec` then in the opening shell, enter command `npm run test` to run test.   

## Calling APIs
- add client(POST): http://localhost:4000/clients
    json body 
    ```
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890"
    }
- list clients(GET): http://localhost:4000/clients

- add fleet(POST): http://localhost:4000/fleets
json body
    ```
    {
        "name": "Express Cars",
        "email": "expresscars@example.com",
        "phone": "+9876543210"
    }

- list fleets(GET): http://localhost:4000/fleets

- add/request ride(POST): http://localhost:4000/rides
json body
    ```
    {
        "clientId": "66ca2c5ff5bdf7ce35396d45",
        "pickupLocation": "387 Pine St",
        "dropoffLocation": "733 Main St",
        "proposedPrice": 50
    }

- list rides(GET): http://localhost:4000/rides

- make bid on ride(PATCH): http://localhost:4000/bids/{rideId}
    - url example: http://localhost:4000/bids/66cadeea0082a6720a2ceeb2
    - json body
    ```
    {
        "fleetId": "66caddc20fea77e5f1d20787",
        "bidAmount": 23
    }

- list bids(GET): http://localhost:4000/bids/client/{clientId}
    - example url: http://localhost:4000/bids/client/66caddef5a3de43194eb0191

- accept a bid(PATCH): http://localhost:4000/bids/{rideId}/accept
    - url example: http://localhost:4000/bids/66cadeea0082a6720a2ceeb2/accept
    - json body
    ```
    {
	    "bidId": "bid5"
    }

## further improvement

- validate the request
- more endpoints testing
- separating more code into functions, need more time.
- paginate the fetch result list
- could use mongoose instead, which enables schema enforcement, validation, a bit easier to code, etc. 