import firebase_app from "./config";
import { React, window } from "react";
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

export const DEFAULT_USER_ID = "5ntPFGMhxD4llc0ObTwF";

export const DEFAULT_CARD_STYLE = { "width": 150, "marginBottom": 5, "opacity": 1.0 };

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
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function addUserAsset(
  userId,
  laneId,
  cusip,
  offer,
  description
) {
  try {
    const addedDocRef = await addDoc(collection(db, "assets", userId, laneId), {});

    await setDoc(addedDocRef, {
      "id": addedDocRef.id,
      "laneId": laneId,
      "cusip": cusip,
      "title": "CUSIP# " + cusip,
      "cardStyle": DEFAULT_CARD_STYLE,
      "offer": offer,
      "description": description,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteUserAsset(
  userId,
  laneId,
  cardId
) {
  try {
    const deleteTarget = doc(db, "assets", userId, laneId, cardId);

    console.log(deleteTarget);
    
    await deleteDoc(deleteTarget);
  } catch (e) {
    console.log(e);
  }
}

export async function getUserAssetOptions(id, collectionId) {
  const dataCollection = collection(db, "assets", id, collectionId);
  const docsSnap = await getDocs(dataCollection);
  return docsSnap;
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

    if (finalLane == "RWA Lane") {
      cardData.title = "CUSIP# " + cardData.cusip;
    } else if (finalLane == "AUT Lane") {
      cardData.title = "AUT for " + cardData.cusip;
    } else if (finalLane == "OXA Lane") {
      cardData.title = "Immobilized " + cardData.cusip;
    } else if (finalLane == "OXA2 Lane") {
      cardData.title = "Credit for " + cardData.cusip;
    } else if (finalLane == "Dig Lane") {
      cardData.title = "BTC - Bitcoin";
    }

    cardData["laneId"] = finalLane;

    const deleteTarget = doc(db, "assets", userId, originalLane, id);
    
    await deleteDoc(deleteTarget);

    const addedDocRef = await addDoc(collection(db, "assets", userId, finalLane), cardData);

    await setDoc(addedDocRef, {
      "id": addedDocRef.id,
      "laneId": cardData.laneId,
      "cusip": cardData.cusip,
      "title": cardData.title,
      "cardStyle": DEFAULT_CARD_STYLE,
      "offer": cardData.offer,
      "description": cardData.description,
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
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
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