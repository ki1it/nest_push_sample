/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js');

const firebaseConfig = {

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/push/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// [END background_handler]
