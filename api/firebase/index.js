import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_APIKEY}`,
  authDomain: `${process.env.NEXT_PUBLIC_AUTHDOMAIN}`,
  projectId: `${process.env.NEXT_PUBLIC_PROJECTID}`,
  storageBucket: `${process.env.NEXT_PUBLIC_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGINGSENDERID}`,
  appId: `${process.env.NEXT_PUBLIC_APPID}`,
  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firebase
const postOrder = async (order) => {
    try {
      const orderWithTimestamp = {
        ...order,
        createdAt: new Date(),
        isPayed : false,
      };
        await setDoc(doc(db, "orderList", order.orderId), orderWithTimestamp);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
};
const getOrdersByDate = async (date) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const q = query(
    collection(db, "orderList"),
    where("createdAt", ">=", startOfDay),
    where("createdAt", "<=", endOfDay),
  );

  try {
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data());
    });
    return orders;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};

export { postOrder, getOrdersByDate };
