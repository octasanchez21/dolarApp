// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Agrega Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwcHeT12qjQtN7HBxFwOO-P5s3IU0kxcY",
  authDomain: "dolar12-3c7d6.firebaseapp.com",
  projectId: "dolar12-3c7d6", // Asegúrate de que este sea el ID correcto
  storageBucket: "dolar12-3c7d6.firebasestorage.app",
  messagingSenderId: "19459510939",
  appId: "1:19459510939:web:bcd22a1d6f31aff629ec3e",
  measurementId: "G-KWCSFGWHGZ",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa Firestore

export { db }; // Exporta Firestore para usarlo en otros archivos