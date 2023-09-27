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
  deleteField,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export const DEFAULT_CARD_STYLE = { "width": 380, "maxWidth": 380, "margin": "auto", "marginBottom": 5 };

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

export async function getUserAssets(userId) {
  return doc(db, "assets", userId);
}

export async function getSingleAsset(userId, lane, cardId) {
  try {
    const docRef = doc(collection(doc(db, "assets", userId), lane), cardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

export async function transferUserAsset(
  userId,
  originalLane,
  finalLane,
  id,
  cardData
) {

  try {

    cardData = await getSingleAsset(userId, originalLane, id);

    console.log(finalLane);

    // Update the title if necessary
    if (finalLane === "OXA Lane" && !cardData.isConvertedToOXA) {
      cardData.title = "OXA Equivalent: " + cardData.title;
      cardData.isConvertedToOXA = true;
    } else {
      cardData.title = cardData.title.replace("OXA Equivalent: ", "");
      cardData.isConvertedToOXA = false;
    }

    // Update the laneId
    cardData["laneId"] = finalLane;

    // Delete the document
    const deleteTarget = doc(db, "assets", userId, originalLane, id);
    
    await deleteDoc(deleteTarget);

    const addedDocRef = await addDoc(collection(db, "assets", userId, finalLane), cardData);
    
    await setDoc(addedDocRef, {
      "id": addedDocRef.id,
      "laneId": cardData.laneId,
      "title": cardData.title,
      "label": cardData.label,
      "cardStyle": DEFAULT_CARD_STYLE,
      "description": cardData.description,
      "isConvertedToOXA": cardData.isConvertedToOXA,
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
    [`${coinName}`]: deleteField(),
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
    [`watchlist.${coinName}`]: deleteField(),
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
  const dataCollection = collection(db, "user-activity", id, "activity-data");
  const docsSnap = await getDocs(dataCollection);
  return docsSnap;
}

export async function addUserActivity(id, data) {
  const nestedCollectionRef = collection(db, "user-activity", id, "activity-data");
  await addDoc(nestedCollectionRef, data);

  return true;
}

export async function addUserActivityBulk(id, documents) {
  documents.forEach((document) => {
    addUserActivity(id, document);
  });

  return true;
}