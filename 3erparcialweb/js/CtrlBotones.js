// Importar las funciones necesarias de los SDKs que se requieren
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSyxvTNSag-uHOz8Onc8QOCVERqfU_PaU",
  authDomain: "pp3-evaluacionweb.firebaseapp.com",
  databaseURL: "https://pp3-evaluacionweb-default-rtdb.firebaseio.com",
  projectId: "pp3-evaluacionweb",
  storageBucket: "pp3-evaluacionweb.appspot.com",
  messagingSenderId: "166388355323",
  appId: "1:166388355323:web:4e7f4cf29eff822fad205e",
  measurementId: "G-Q7R8G984ED"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

// Función para mostrar el nombre de usuario y habilitar el botón de Cerrar sesión
function showUserInfo(user) {
  const userDiv = document.getElementById('user-div');
  const userEmail = document.getElementById('user-email');
  const signOutButton = document.getElementById('sign-out-button');

  userDiv.style.display = 'block';
  userEmail.textContent = user.email;
  signOutButton.style.display = 'block';
}

// Función para ocultar el nombre de usuario y deshabilitar el botón de Cerrar sesión
function hideUserInfo() {
  const userDiv = document.getElementById('user-div');
  const signOutButton = document.getElementById('sign-out-button');

  userDiv.style.display = 'none';
  signOutButton.style.display = 'none';
}

// Función para mostrar los datos en la lista
function showDataList(data) {
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = '';

  data.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `Atributo 1: ${item.attribute1}, Atributo 2: ${item.attribute2}, Atributo 3: ${item.attribute3}, Atributo 4: ${item.attribute4}, Atributo 5: ${item.attribute5}`;
    dataList.appendChild(li);
  });
}

// Función para agregar datos a Firestore
async function addData(event) {
  event.preventDefault();

  const dataForm = document.getElementById('data-form');
  const attribute1Input = document.getElementById('attribute1');
  const attribute2Input = document.getElementById('attribute2');
  const attribute3Input = document.getElementById('attribute3');
  const attribute4Input = document.getElementById('attribute4');
  const attribute5Input = document.getElementById('attribute5');

  const attribute1 = attribute1Input.value;
  const attribute2 = attribute2Input.value;
  const attribute3 = attribute3Input.value;
  const attribute4 = attribute4Input.value;
  const attribute5 = attribute5Input.value;

  try {
    await addDoc(collection(firestore, 'entidad_r'), {
      attribute1: attribute1,
      attribute2: attribute2,
      attribute3: attribute3,
      attribute4: attribute4,
      attribute5: attribute5,
    });
    dataForm.reset();
  } catch (error) {
    console.log(error);
  }
}

// Función para cerrar sesión
function signOut() {
  firebaseSignOut(auth)
    .then(() => {
      hideUserInfo();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Observador de estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    showUserInfo(user);

    const dataListRef = collection(firestore, 'entidad_r');
    getDocs(dataListRef)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        showDataList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    hideUserInfo();
  }
});

// Función para iniciar sesión con Google
function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      showUserInfo(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Evento de submit del formulario
const dataForm = document.getElementById('data-form');
dataForm.addEventListener('submit', addData);
