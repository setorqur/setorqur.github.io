import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import "https://cdn.jsdelivr.net/npm/sweetalert2@11"

const firebaseConfig = {
    apiKey: "AIzaSyBElrUrrKvje2PcoW6TyvCTq5flFIjV_8g",
    authDomain: "myproject-196eb.firebaseapp.com",
    projectId: "myproject-196eb",
    storageBucket: "myproject-196eb.appspot.com",
    messagingSenderId: "930827370547",
    appId: "1:930827370547:web:07b07bec1cc7e96d3c2346",
    measurementId: "G-CLQNSG94J1",
    databaseURL: "https://myproject-196eb-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan elemen tautan logout
    let logoutLink = document.getElementById("logout");
  
    // Menambahkan event listener saat tautan logout diklik
    logoutLink.addEventListener("click", function(e) {
      e.preventDefault();
      logout();
    });
  
    // Fungsi logout
    function logout() {
      // Hapus status login dari localStorage
      localStorage.removeItem("masuk");
  
      // Hapus riwayat navigasi dan arahkan ke halaman login
      window.history.replaceState({}, document.title, "login.html");
      window.location.href = "login.html";
    }
  });