import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js'
import {
	collection,
	getFirestore,
	getDocs,
	getDoc,
	addDoc,
	setDoc,
	onSnapshot,
	doc,
	arrayUnion,
	updateDoc,
	serverTimestamp,
	query,
	orderBy
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js'
// import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-functions.js'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js'

const app = initializeApp({
	apiKey: 'AIzaSyDX6zYmTkCIT8YonEw1Ginm3Jz935-GRWE',
	authDomain: 'sih-a7673.firebaseapp.com',
	projectId: 'sih-a7673',
	storageBucket: 'sih-a7673.appspot.com',
	messagingSenderId: '277065565804',
	appId: '1:277065565804:web:694ce3cf697b54df4b7a49'
})

const auth = getAuth(app)
const storage = getStorage(app)
const firestore = getFirestore(app)
// const functions = getFunctions(app)

export {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	auth,
	onAuthStateChanged,
	signOut,
	firestore,
	getDocs,
	getDoc,
	addDoc,
	setDoc,
	doc,
	collection,
	arrayUnion,
	updateDoc,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
	storage,
	ref,
	uploadBytes,
	getDownloadURL
}
