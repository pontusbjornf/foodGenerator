import firebase from 'firebase'
  
const config =  {
  apiKey: "AIzaSyBlfPEDlw1ltXf0UQ7h9MyHm2Exzpx0pms",
  authDomain: "foodgeneratordb.firebaseapp.com",
  projectId: "foodgeneratordb",
  storageBucket: "foodgeneratordb.appspot.com",
  messagingSenderId: "779132111138",
  appId: "1:779132111138:web:07478c494da2ac68eafd7b",
  measurementId: "G-R1RFDK4JZP"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection('users');

export const createUser = user => {
return usersCollection.add(user);
}

export const getUser = async id=> {
const user = await usersCollection.doc(id).get()
return user.exists ? user.data() : null;
}
export const updateUser = (id, user) =>{
return usersCollection.doc(id).update(user)
}
export const deleteUser = id => {
return usersCollection.doc(id).delete();
}
export const useLoadUsers = () => {
const users = ref([])
usersCollection.onSnapshot(snapshot => {
  users.value = snapshot.dosc.map(doc => ({ id: doc.id, ...doc.data()}))
})
onUnmounted(close);
return users
}