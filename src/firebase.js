import config from "./config.json";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: config.firebase[1].apiKey,
  authDomain: config.firebase[1].authDomain,
  projectId: config.firebase[1].projectId,
  storageBucket: config.firebase[1].storageBucket,
  messagingSenderId: config.firebase[1].messagingSenderId,
  appId: config.firebase[1].appId,
  measurementId: config.firebase[1].measurementId,
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const Sendrequest = (uid) => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, { vapidKey: config.firebase[1].vapidKey })
        .then(async (currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
            await setDoc(doc(db, "fcms", currentToken), {
              token: currentToken,
            });
          } else {
            console.log("Failed to generate the registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};
