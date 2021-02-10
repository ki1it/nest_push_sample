## Installation

```bash
$ npm install
```

## Preparation
Для полноценного функционирования приложения необходимо иметь json файл авторизации, который можно получить следуя инструкции: [ссылка](https://medium.com/@sharma.vikashkr/firebase-how-to-setup-an-app-in-firebase-9ddbacfe8ad1).
Этот файл нужно положить на диск и указать у нему путь в .env файле, пример можно увидеть в .env.example файле.

Для работы веб-клиента необходимо создать Web App в Firebase console, затем внести данные авторизации в объекте firebaseConfig файлах public/push/firebase-messaging-sw.js и public/push/main.js.
В итоге объект firebaseConfig должен иметь вид: 
```js
{
    apiKey: "",
    authDomain: "",
    projectId: "nest-push-sample",
    storageBucket: "nest-push-sample.appspot.com",
    messagingSenderId: "",
    appId: ""

}
```
А также указать gcm_sender_id в файле public/push/manifest.json, которые совпадает с полем messagingSenderId в firebaseConfig.


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
