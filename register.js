import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push,onValue,remove,get,update,query,orderByChild, equalTo,startAt,endAt } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
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
const db = getDatabase(app);

let nip = document.getElementById("nip")
let nama = document.getElementById("nama")
let password = document.getElementById("password")
let jenisKelamin = document.querySelector('input[name="jenis_kelamin"]:checked')
let alamat = document.getElementById("alamat")
let noTelepon = document.getElementById("no_telepon")
let simpan = document.getElementById('btn_simpanguru')
simpan?.addEventListener("click", function(e){
    
  
    // Membuat objek baru dengan data form
    e.preventDefault();
    push(ref(db, 'guru'), {
      nip: nip.value,
      nama: nama.value,
      password: password.value,
      jenis_kelamin: jenisKelamin,
      alamat: alamat.value,
      no_telepon: noTelepon.value
    })
        // Mengosongkan form
        document.getElementById("form_register").reset();
})
 //login 
 let namaLogin = document.getElementById("username_login");
 let passwordLogin = document.getElementById("password_login");
 let login = document.getElementById("btnlogin");
 
 login.addEventListener("click", function() {
   const nama = namaLogin.value;
   const password = passwordLogin.value;
   if (nama.trim() === "" || password.trim() === "") {
    // Menampilkan pesan error jika username atau password kosong
    Swal.fire("Peringatan", "Username dan password harus diisi", "warning");
    return;
  }
   const guruRef = ref(db, "guru");
   const guruQuery = query(guruRef, orderByChild("nama"), equalTo(nama));
 
   get(guruQuery)
     .then((snapshot) => {
       if (snapshot.exists()) {
         snapshot.forEach((childSnapshot) => {
           const guru = childSnapshot.val();
           // Memeriksa kecocokan password
           if (guru.password === password) {
             // Username dan password cocok, pindah ke halaman dashboard
             localStorage.setItem("masuk",JSON.stringify(guru));
             console.log(guru);
             window.location.href = "data_hafalan.html";
           } else {
             // Password salah
             Swal.fire("Peringatan", "Username Atau Password Salah", "warning");
           }
         });
       }
     })
     .catch((error) => {
       console.error(error);
       Swal.fire("Error", "Terjadi kesalahan saat melakukan login", "error");
     });
 });
 
 
 
 
 
 