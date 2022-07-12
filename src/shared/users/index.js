import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import db from "../../service/firebase";

const getAllUser = async () => {
  const userCol = collection(db, 'users');
  const userSnapShot = await getDocs(userCol);
  const userList = userSnapShot.docs.map(doc => doc.data());
  return userList;
}

const addUser = async (data) => {
  const userCol = collection(db, 'users');
  addDoc(userCol, data)
}

export {
  getAllUser, addUser
}
