import firebase_app from "./config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  deleteField
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function createUser(id) {
  let result = null;
  let error = null;

  let dataEmpty = {};
  let dataSettings = {
    currency: "usd",
    transactions: "disabled",
    watchlist: {
      bitcoin: { symbol: "BTC" },
      ethereum: { symbol: "ETH" },
      tether: { symbol: "USDT" },
      binancecoin: { symbol: "BNB" },
      ripple: { symbol: "XRP" },
      "usd-coin": { symbol: "USDC" },
      dogecoin: { symbol: "DOGE" },
      solana: { symbol: "SOL" },
    },
  };

  try {
    result = await setDoc(doc(db, "holdings", id), dataEmpty, {
      merge: true,
    });
    result = await setDoc(doc(db, "user-activity", id), dataEmpty, {
      merge: true,
    });
    await setDoc(doc(db, "settings", id), dataSettings, {
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
    const docRef = doc(db, "holdings", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function getUserAssets(id) {

  return doc(collection(db, "assets"), id);
}

export async function transferUserAsset(userId, originalLane, finalLane, id) {
  try {
    // Save the document
    const originalColRef = collection(doc(collection(db, "assets"), userId), originalLane.replace(" Lane", ""));
    const finalColRef = collection(doc(collection(db, "assets"), userId), originalLane.replace(" Lane", ""));
    const data = (await getDoc(doc(originalColRef, id))).data()

    //data['laneId'] = finalLane;

    setDoc(doc(finalColRef, id), data);

    // Delete the document
    deleteDoc(doc(originalColRef, id));
  } catch (e) {
    console.log(e);
  }
}

export async function saveUserAssets(id, data) {

  try {
    clearUserAssets(id);

    const autRef = collection(doc(collection(db, "assets"), id), 'AUT');
    data.lanes[1].cards.forEach(c => {
      setDoc(doc(autRef, c.id), c);
    });
    

    const digRef = collection(doc(collection(db, "assets"), id), 'Digital Assets');
    data.lanes[3].cards.forEach(c => {
      setDoc(doc(digRef, c.id), c);
    });
    

    const oxaRef = collection(doc(collection(db, "assets"), id), 'OXA');
    data.lanes[2].cards.forEach(c => {
      setDoc(doc(oxaRef, c.id), c);
    });
    
    const rwaRef = collection(doc(collection(db, "assets"), id), 'RWA');
    data.lanes[0].cards.forEach(c => {
      setDoc(doc(rwaRef, c.id), c);
    });
    
  } catch (e) {
    console.log(e);
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

export async function deleteUserHoldings(id, coinName) {
  const documentRef = doc(db, "holdings", id);

  const updateData = {
    [`${coinName}`]: deleteField()
  };

  try {
    await updateDoc(documentRef, updateData);
    return true;
  } catch (error) {
    console.error("Error deleting field:", error);
    return false;
  }
}

export async function getUserSettings(id) {
  try {
    const docRef = doc(db, "settings", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
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

export async function deleteWatchlist(id, coinName) {
  const documentRef = doc(db, "settings", id);

  const updateData = {
    [`watchlist.${coinName}`]: deleteField()
  };

  try {
    await updateDoc(documentRef, updateData);
    return true;
  } catch (error) {
    console.error("Error deleting field:", error);
    return false;
  }
}

export async function getUserActivities(id) {
  const dataCollection = collection(
    doc(collection(db, "user-activity"), id),
    "activity-data"
  );

  const docsSnap = await getDocs(dataCollection);
  return docsSnap;
}

export async function addUserActivity(id, data) {
  const userActivityDocRef = doc(collection(db, "user-activity"), id);
  const nestedCollectionRef = collection(userActivityDocRef, "activity-data");
  await addDoc(nestedCollectionRef, data);

  return true;
}

export async function addUserActivityBulk(id, documents) {
  documents.forEach((document) => {
    addUserActivity(id, document);
  });

  return true;
}