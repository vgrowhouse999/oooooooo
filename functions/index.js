// Import the necessary Firebase Functions and Admin SDKs
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Example: Create an HTTP function
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

// Example: Firebase Cloud Function triggered by Firestore changes
exports.onUserCreate = functions.firestore.document('users/{userId}').onCreate((snap, context) => {
  const newUser = snap.data();
  console.log('A new user was added:', newUser);
  return admin.firestore().collection('logs').add({message: `New user added: ${newUser.name}`});
});

// Example: Firebase Cloud Function triggered by Authentication events
exports.onUserSignUp = functions.auth.user().onCreate((user) => {
  console.log('A new user signed up:', user.email);
  return admin.firestore().collection('logs').add({message: `New user signed up: ${user.email}`});
});
