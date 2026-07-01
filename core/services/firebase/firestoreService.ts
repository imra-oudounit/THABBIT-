import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { firebaseDb } from "./client";

/**
 * Generic Firestore document helpers.
 * Features should depend on this, not on raw firebase/firestore.
 */
export const firestoreService = {
  async getDoc<T = DocumentData>(collection: string, id: string): Promise<T | null> {
    const snap = await getDoc(doc(firebaseDb, collection, id));
    return snap.exists() ? (snap.data() as T) : null;
  },

  async setDoc(collection: string, id: string, data: DocumentData): Promise<void> {
    await setDoc(doc(firebaseDb, collection, id), data);
  },

  async updateDoc(collection: string, id: string, patch: DocumentData): Promise<void> {
    await updateDoc(doc(firebaseDb, collection, id), patch);
  },

  watchDoc<T = DocumentData>(
    collection: string,
    id: string,
    onData: (data: T | null) => void,
    onError?: (e: unknown) => void,
  ): Unsubscribe {
    return onSnapshot(
      doc(firebaseDb, collection, id),
      (snap: DocumentSnapshot) => onData(snap.exists() ? (snap.data() as T) : null),
      (err) => onError?.(err),
    );
  },

  serverTime() {
    return serverTimestamp();
  },
};
