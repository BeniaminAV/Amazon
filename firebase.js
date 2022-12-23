import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByyBsBCcXlkB0ahtYRhhgH6MGI7kBfXa4",
  authDomain: "e-dc6de.firebaseapp.com",
  projectId: "e-dc6de",
  storageBucket: "e-dc6de.appspot.com",
  messagingSenderId: "291123182229",
  appId: "1:291123182229:web:dd60260ad0fb112255b99c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const database = app.firestore();

export default database;
