import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

var firebaseConfig = {
  //     apiKey: "AIzaSyDhjK7pbxyhaBKCFmGCz9OF4Y53SR9LunI",
  //     authDomain: "social-app-manhnhat.firebaseapp.com",
  //     databaseURL: "https://social-app-manhnhat-default-rtdb.firebaseio.com",
  //     projectId: "social-app-manhnhat",
  //     storageBucket: "social-app-manhnhat.appspot.com",
  //     messagingSenderId: "739250176617",
  //     appId: "1:739250176617:web:bca39e1dc285b2ba0998f8",
  //     measurementId: "G-55BTZ6M8PN"
  // };

  apiKey: 'AIzaSyBpKGIKcJPski1Rg_c0LvE_qQz0asBqVxA',
  authDomain: 'todo-app-tienkim.firebaseapp.com',
  databaseURL: 'https://todo-app-tienkim.firebaseio.com',
  projectId: 'todo-app-tienkim',
  storageBucket: 'todo-app-tienkim.appspot.com',
  messagingSenderId: '513400048747',
  appId: '1:513400048747:web:b062ff959830acf0ef752e',
  measurementId: 'G-X1ZCS5H953',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
