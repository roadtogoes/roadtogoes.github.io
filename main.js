// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8OdhN3fGV1Cddnfg6PR0fAONsEpAAoIE",
    authDomain: "boletines-19b15.firebaseapp.com",
    databaseURL: "https://boletines-19b15-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "boletines-19b15",
    storageBucket: "boletines-19b15.appspot.com",
    messagingSenderId: "243669411437",
    appId: "1:243669411437:web:b66e3203df873ec4c08164",
    measurementId: "G-9H8HL91EH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the first counter in the database
const counter1Ref = ref(db, 'counter1');

// Get the first counter value and display it
onValue(counter1Ref, (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counter1').textContent = counterValue;
});

// Increment the first counter
document.getElementById('incrementBtn1').addEventListener('click', () => {
    runTransaction(counter1Ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
});

// Reference to the second counter in the database
const counter2Ref = ref(db, 'counter2');

// Get the second counter value and display it
onValue(counter2Ref, (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counter2').textContent = counterValue;
});

// Increment the second counter
document.getElementById('incrementBtn2').addEventListener('click', () => {
    runTransaction(counter2Ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
});
