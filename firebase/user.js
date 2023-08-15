import firebase_app from "./config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function createUser(id) {
    let result = null;
    let error = null;

    let data = {}

    try {
        result = await setDoc(doc(db, "holdings", id), data, {
            merge: true,
        });
    } catch (e) {
        console.log(e.message);
        error = e;
    }

    return { result, error };
}

export async function getUserHoldings(id) {
    try {
        const docRef = doc(db, 'holdings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        return null;
    }
}