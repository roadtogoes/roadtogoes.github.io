// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction, set, push } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

// Function to update the leader message
function updateLeader(counter1Value, counter2Value) {
    const leaderElement = document.getElementById('leader');
    if (counter1Value > counter2Value) {
        leaderElement.textContent = "Ramón está en cabeza";
    } else if (counter2Value > counter1Value) {
        leaderElement.textContent = "Santiago está en cabeza";
    } else {
        leaderElement.textContent = "Empate";
    }
}

// Get the counter values and display them
onValue(counter1Ref, (snapshot) => {
    const counter1Value = snapshot.val();
    document.getElementById('counter1').textContent = counter1Value;
    const counter2Value = parseInt(document.getElementById('counter2').textContent);
    updateLeader(counter1Value, counter2Value);
});

onValue(counter2Ref, (snapshot) => {
    const counter2Value = snapshot.val();
    document.getElementById('counter2').textContent = counter2Value;
    const counter1Value = parseInt(document.getElementById('counter1').textContent);
    updateLeader(counter1Value, counter2Value);
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

// Chat functionality

// Reference to the chat in the database
const chatRef = ref(db, 'chat');

// Function to add a message to the chat
function addMessageToChat(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the bottom
}

// Listen for new messages
onValue(chatRef, (snapshot) => {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';  // Clear existing messages
    snapshot.forEach(childSnapshot => {
        const message = childSnapshot.val();
        addMessageToChat(message);
    });
});

// Send a new message
document.getElementById('send-message-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('chat-input');
    const newMessage = messageInput.value;
    if (newMessage) {
        push(chatRef, newMessage);
        messageInput.value = '';  // Clear the input
    }
});
