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
let datalaporan=document.getElementById("data_laporan")
let txtcari=document.getElementById("cari")
let cari= document.getElementById("cari_siswa")
cari.addEventListener("click",function(e){   
    showdata(txtcari.value)
})    
function showdata(nis) {
    let dataRef = query(ref(db, "siswa"), orderByChild("nim"), equalTo(nis));
    get(dataRef)
      .then((snapshot) => { 
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val();
            let nis =data.nim;
            let nama = data.nama;
            let kelas = data.kelas;
            let data_h = Object.values(data.hafalan);
            let atas =`
            <h1 class="text-center mb-5">Hasil Laporan Hafalan Siswa</h1> 
                    <table>
                        <tr>
                            <td>NIS</td>
                            <td>: </td>
                            <td>${ nis}</td>
                        </tr>
                        <tr>
                            <td>NAMA</td>
                            <td>: </td>
                            <td>${ nama}</td>
                        </tr>
                        <tr>
                            <td>KELAS</td>
                            <td>: </td>
                            <td>${ kelas}</td>
                        </tr>
                    </table>
                    <br>
                    <table id="tabel_hafalan" class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Dari Surah</th>
                                <th scope="col">Ayat</th>
                                <th scope="col">Sampai Surah</th>
                                <th scope="col">Ayat</th>
                                <th scope="col">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">`
                        let tengah =""
                        data_h.map((hafalan)=>
                        tengah +=
                            `<tr>
                            <td>${hafalan.surah_awal}</td>
                            <td>${hafalan.ayat_awal}</td>
                            <td>${hafalan.surah_akhir}</td>
                            <td>${hafalan.ayat_akhir}</td>
                            <td>${new Date(hafalan.tanggal).toLocaleDateString("id")}</td>
                        </tr>
                        `
                        )
                        let bawah =`</tbody>
                    </table>`
           datalaporan.innerHTML=atas+tengah+bawah;
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Data tidak ditemukan',
            text: 'Silakan cek kembali NIS yang Anda masukkan'
          });
          datalaporan.innerHTML=""
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }