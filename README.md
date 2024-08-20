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
        "clientId": "client3",
        "pickupLocation": "387 Pine St",
        "dropoffLocation": "733 Main St",
        "proposedPrice": 50
    }

- list rides(GET): http://localhost:4000/rides

- make bid on ride(PATCH): http://localhost:4000/bids/{rideId}
    - url example: http://localhost:4000/bids/ride3
    - json body
    ```
    {
        "fleetId": "fleet1",
        "bidAmount": 23
    }

- list bids(GET): http://localhost:4000/bids/client/{clientId}
    - example url: http://localhost:4000/bids/client/client3

- accept a bid(PATCH): http://localhost:4000/bids/{rideId}/accept
    - url example: http://localhost:4000/bids/ride3/accept
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