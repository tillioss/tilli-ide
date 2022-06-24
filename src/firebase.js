
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBDZKjzSt3VBIZlDb31jgxGm9-bDQ_XobA",
    authDomain: "dataemergence-d66e4.firebaseapp.com",
    projectId: "dataemergence-d66e4",
    storageBucket: "dataemergence-d66e4.appspot.com",
    messagingSenderId: "489074515707",
    appId: "1:489074515707:web:6d32c448b8b64c32589a5e",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({ vapidKey: 'BASSpbzTxoZkJ3Pj8n_QRbru4NPiO_gBbeXey7qtirL721ggC3rit4mvA202zrk-ew5ntq21YDRWNPgHkTs5tC8' }).then((currentToken) => {
        if (currentToken) {
            // console.log('current token for client: ', currentToken);
            setTokenFound(currentToken);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
