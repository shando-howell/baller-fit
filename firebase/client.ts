import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhKjAb0tjqwDgWd-YcjRNLARQl9WaUaMA",
  authDomain: "ballerfit-app.firebaseapp.com",
  projectId: "ballerfit-app",
  storageBucket: "ballerfit-app.firebasestorage.app",
  messagingSenderId: "489759022169",
  appId: "1:489759022169:web:c27444bc5e34c4d4c0e548"
};

const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };