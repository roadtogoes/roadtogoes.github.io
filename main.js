// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

// References to the counters in the database
const counter1Ref = ref(db, 'counter1');
const counter2Ref = ref(db, 'counter2');
const countdownRef = ref(db, 'countdown');

// Get the counter values and display them
onValue(counter1Ref, (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counter1').textContent = counterValue;
});

onValue(counter2Ref, (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counter2').textContent = counterValue;
});

// Increment the counters
document.getElementById('incrementBtn1').addEventListener('click', () => {
    runTransaction(counter1Ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
});

document.getElementById('incrementBtn2').addEventListener('click', () => {
    runTransaction(counter2Ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
});

// Reset the counters
document.getElementById('resetBtn1').addEventListener('click', () => {
    set(counter1Ref, 0);
});

document.getElementById('resetBtn2').addEventListener('click', () => {
    set(counter2Ref, 0);
});

// Countdown Timer
let countdownInterval;
const countdownElement = document.getElementById('countdown');
const startCountdownBtn = document.getElementById('startCountdownBtn');
const resetCountdownBtn = document.getElementById('resetCountdownBtn');

// Get the countdown value and display it
onValue(countdownRef, (snapshot) => {
    const countdownValue = snapshot.val();
    if (countdownValue) {
        startCountdown(countdownValue);
    } else {
        countdownElement.textContent = "01:00:00";
    }
});

// Function to start the countdown
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    countdownInterval = setInterval(() => {
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = Math.floor(timer % 60);

        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (--timer < 0) {
            clearInterval(countdownInterval);
        } else {
            set(countdownRef, timer);
        }
    }, 1000);
}

// Start countdown button
startCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    set(countdownRef, 3600);
});

// Reset countdown button
resetCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    set(countdownRef, null);
    countdownElement.textContent = "01:00:00";
});
