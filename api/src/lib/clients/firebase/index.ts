import firebase from 'firebase';
import firebaseConfig from './firebaseConfig.json';

const clientFirebase: firebase.app.App = firebase.initializeApp(firebaseConfig);

export { clientFirebase };
