import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import db from "../../service/firebase";

const getAllUser = async () => {
  const userCol = collection(db, 'users');
  const userSnapShot = await getDocs(userCol);
  const userList = userSnapShot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  });
  return userList;
}

const addUser = async (data) => {
  const userCol = collection(db, 'users');
  addDoc(userCol, data)
}

const updateUser = async (id, data) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, data);
}

const deleteUser = async (id) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
}

export {
  getAllUser, addUser, deleteUser, updateUser
}
