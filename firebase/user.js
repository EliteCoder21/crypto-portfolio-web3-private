import firebase_app from "./config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function createUser(id) {
    let result = null;
    let error = null;

    let data = {}
    let dataHoldings = {
        "bitcoin": {symbol: "btc"}, 
        "ethereum": {symbol: "eth"}, 
        "tether": {symbol: "usdt"},
        "binancecoin": {symbol: "bnb"},
        "ripple": {symbol: "xrp"},
        "usd-coin": {symbol: "usdc"},
        "dogecoin": {symbol: "doge"},
        "solana": {symbol: "sol"}
    }

    try {
        result = await setDoc(doc(db, "holdings", id), data, {
            merge: true,
        });
        await setDoc(doc(db, "settings", id), dataHoldings, {
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

export async function addUserHoldings(id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, "holdings", id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getUserSettings(id) {
    try {
        const docRef = doc(db, 'settings', id);
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

export async function setUserSettings(id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, "settings", id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}