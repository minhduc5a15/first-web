import 'firebase/compat/database';

import firebaseConfig from '@/lib/firebase/config';
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { db };
export default firebase;
