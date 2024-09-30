// const { getMessaging } = require("firebase/messaging");

// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyC5L2oukJpE2sAb_zGnk_j-xjqNFlODM_Y",
//   authDomain: "test-9317d.firebaseapp.com",
//   projectId: "test-9317d",
//   storageBucket: "test-9317d.appspot.com",
//   messagingSenderId: "859946608953",
//   appId: "1:859946608953:web:e4f0a498555d8182b120e8",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
// messaging.messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// const messagin = getMessaging();
// onMessage(messagin, (payload) => {
//   console.log("Message received. ", payload);
//   // ...
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// import { onMessage } from "firebase/messaging";

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyC5L2oukJpE2sAb_zGnk_j-xjqNFlODM_Y",
//   authDomain: "test-9317d.firebaseapp.com",
//   projectId: "test-9317d",
//   storageBucket: "test-9317d.appspot.com",
//   messagingSenderId: "859946608953",
//   appId: "1:859946608953:web:e4f0a498555d8182b120e8",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC_cUwPNDvaR-2L-A_9BGYfr9FEYdmPp44",
  authDomain: "aapno-abhimanyu.firebaseapp.com",
  projectId: "aapno-abhimanyu",
  storageBucket: "aapno-abhimanyu.appspot.com",
  messagingSenderId: "225410619356",
  appId: "1:225410619356:web:a7ec82d6cbf8c8cfcd6119",
  measurementId: "G-1YGGSTJXEN"
};



firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// messaging.messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// const messagin = getMessaging();
// onMessage(messagin, (payload) => {
//   console.log("Message received. ", payload);
//   // ...
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
