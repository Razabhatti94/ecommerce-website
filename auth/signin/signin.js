import { auth, signInWithEmailAndPassword } from "../utils.js";

const signInForm = document.getElementById('signInForm');
const emailId = document.getElementById('emailinput');

emailId.addEventListener('change', () => {
    const signinStorage = JSON.parse(localStorage.getItem("UserData")) || [];
    
    const findUser = signinStorage.find(function (data) {
        return data.email.trim() === emailId.value.trim();  
    });
    console.log('Found user:', findUser);
});
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
        email: e.target[0].value,
        password: e.target[1].value,
        remember: e.target[2].checked,
    }
    if (userData.remember) {
        let users = JSON.parse(localStorage.getItem('UserData')) || [];
        
        const userIndex = users.findIndex(user => user.email === userData.email);
        if (userIndex > -1) {
            users[userIndex] = userData; 
        } else {
            users.push(userData); 
        }

        localStorage.setItem('UserData', JSON.stringify(users));
        console.log('User Data saved into local storage');
    } else {
        let users = JSON.parse(localStorage.getItem('UserData')) || [];
        users = users.filter(user => user.email !== userData.email);
        localStorage.setItem('UserData', JSON.stringify(users));
        console.log('User Data removed from local storage');
    }

    const { email, password } = userData;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            console.log('User Login successful');

            window.location.href = '/';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error: ${errorCode}, ${errorMessage}`);
        });
});
