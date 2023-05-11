/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDyYhRHw17P-HmTjBhdnMkxqVPdj1xBbeM",
  authDomain: "futures-d75fe.firebaseapp.com",
  projectId: "futures-d75fe",
  storageBucket: "futures-d75fe.appspot.com",
  messagingSenderId: "635651002708",
  appId: "1:635651002708:web:3f8f4f11c6e170137078c1",
  measurementId: "G-LT8YHC5N9W",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
