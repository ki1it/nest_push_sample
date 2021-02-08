## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Sending push notification

```bash 
curl --location --request POST 'http://localhost:3000/api/push/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "msg": "test"
}'
```

## Subscribe

```bash 
curl --location --request POST 'http://localhost:3000/api/push/subscribe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "01234214124212"
}'
```

## Unsubscribe

```bash 
curl --location --request POST 'http://localhost:3000/api/push/unsubscribe' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "01234214124212"
}'
```
