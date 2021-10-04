import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDTD0GH3Fv6GFkXVSQKVGpujYAffbaPOZo",
  authDomain: "quizgame-935fc.firebaseapp.com",
  databaseURL: "https://quizgame-935fc-default-rtdb.firebaseio.com",
  projectId: "quizgame-935fc",
  storageBucket: "quizgame-935fc.appspot.com",
  messagingSenderId: "986485292389",
  appId: "1:986485292389:web:2e1e9790896213f514f58c",
};

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
