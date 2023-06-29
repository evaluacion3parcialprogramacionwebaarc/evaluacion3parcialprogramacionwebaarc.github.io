// Configurar la inicialización de Firebase
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
// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

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