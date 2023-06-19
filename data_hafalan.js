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

let surah_awal =document.getElementById("surah_awal")
let ayat_awal =document.getElementById("ayat_awal")
let surah_akhir =document.getElementById("surah_akhir")
let ayat_akhir =document.getElementById("ayat_akhir")

let ayat

fetch('surah.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => {
    ayat=response.data
    response.data.map((datajson,i)=> {
        surah_awal.innerHTML+=`
        <option value =${datajson.surah} >${datajson.surah}</option>`
        surah_akhir.innerHTML+=`
        <option value =${datajson.surah} >${datajson.surah}</option>`

    })
   })
   .catch(error => console.log(error));

   surah_awal.addEventListener("change", function() {
       let selectedSurah = surah_awal.value;
       let selectedSurahData = ayat.find(datajson => datajson.surah === selectedSurah);
       ayat_awal.innerHTML = generateAyatOptions(selectedSurahData.ayat);
   });
   
   surah_akhir.addEventListener("change", function() {
       let selectedSurah = surah_akhir.value;
       let selectedSurahData = ayat.find(datajson => datajson.surah === selectedSurah);
       ayat_akhir.innerHTML = generateAyatOptions(selectedSurahData.ayat);
   });
   
   function generateAyatOptions(totalAyat) {
       let options = '';
       for (let i = 1; i <= totalAyat; i++) {
           options += `<option value="${i}">${i}</option>`;
       }
       return options;
   }
   
   
   
   
   let namasiswa= document.getElementById("nama")
   let kelassiswa = document.getElementById("kelas")
   let txtnis= document.getElementById("nim")
// Mendengarkan event saat pengguna menekan tombol Enter
document.getElementById("form_siswa").addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Mencegah pengiriman form
    let nis = txtnis.value;
    showdata(nis);
  }
});

// Fungsi untuk mengambil data dari Firebase berdasarkan NIS
function showdata(nis) {
  let dataRef = query(ref(db, "siswa"), orderByChild("nim"), equalTo(nis));
  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          let data = childSnapshot.val();
          let nama = data.nama;
          let kelas = data.kelas;
          namasiswa.value = nama; // Menampilkan nama di input "nama"
          kelassiswa.value = kelas; // Menampilkan kelas di input "kelas"
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Data tidak ditemukan',
          text: 'Silakan cek kembali NIS yang Anda masukkan'
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// simpan
let simpan_hafalan= document.getElementById("btnsimpan_hafalan")

simpan_hafalan.addEventListener("click", function() {
  get(query(ref(db, `siswa`), ...[orderByChild("nim"), equalTo(txtnis.value)])).then(snapshot => {
    let data = snapshot.val()
    let row = ""
    if (data != null) {
      let keys = Object.keys(data)
      let values = Object.values(data)
      values.map((val, idx) => {
        val.id = keys[idx]
        push(ref(db, 'siswa/' + val.id + "/hafalan"), {
            surah_awal: surah_awal.value,
            surah_akhir: surah_akhir.value,
            ayat_awal: ayat_awal.value,
            ayat_akhir: ayat_akhir.value,
            tanggal: Date.now()
          })
          .then(() => {
            window.swal({
              title: "Data berhasil ditambahkan!",
              icon: "success",
              button: "OK",
            });
            $("#staticBackdrop").modal("hide");
            document.getElementById("form_siswa").reset();
            document.getElementById("ayat_awal").innerHTML = "<option value='' disabled selected>Pilih</option>";
            document.getElementById("ayat_akhir").innerHTML = "<option value='' disabled selected>Pilih</option>";
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  });
});


// tampilkan 
// onValue(ref(db, 'siswa'), snapshot => {
//   const data = snapshot.val() 
//   let row = ""
//   let keys = Object.keys(data)
//   let values = Object.values(data)
//   values.map((val, idx) => {
//       val.id = keys[idx]
//       console.log(val.id)
//       if(val.hafalan!=null){
//       let keyh= Object.keys(val.hafalan)
//       let valuesh= Object.values(val.hafalan)
//       valuesh.map ((valh,idh)=>{
//         valh.id =keyh[idh]
//         row += `
//         <tr>
//             <td>${val.nim}</td>
//             <td>${val.nama}</td>
//             <td>${val.kelas}</td>
//             <td>${valh.surah_awal}</td>
//             <td>${valh.ayat_awal}</td>
//             <td>${valh.surah_akhir}</td>
//             <td>${valh.ayat_akhir}</td>
//             <td>${new Date(valh.tanggal).toLocaleDateString("id")}</td>
//             <td>
//                 <button id="btn-hapus" class="btn btn-danger btn-sm" onclick="hapus('${val.id}','${valh.id}')">Hapus </button>
//             </td>
//         </tr>
//         `
//       })}
      
//   })
//   tbody.innerHTML = row
//   //  console.log(values)
// })
onValue(ref(db, 'siswa'), snapshot => {
  const data = snapshot.val();
  let row = "";
  let keys = Object.keys(data);
  let values = Object.values(data);

  let allHafalan = [];
  values.forEach(val => {
    if (val.hafalan != null) {
      let hafalanKeys = Object.keys(val.hafalan);
      let hafalanValues = Object.values(val.hafalan);
      hafalanValues.forEach((valh, idx) => {
        valh.id = hafalanKeys[idx];
        valh.nim = val.nim;
        valh.nama = val.nama;
        valh.kelas = val.kelas;
        allHafalan.push(valh);
      });
    }
  });

  allHafalan.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  allHafalan.forEach(valh => {
    row += `
      <tr>
        <td>${valh.nim}</td>
        <td>${valh.nama}</td>
        <td>${valh.kelas}</td>
        <td>${valh.surah_awal}</td>
        <td>${valh.ayat_awal}</td>
        <td>${valh.surah_akhir}</td>
        <td>${valh.ayat_akhir}</td>
        <td>${new Date(valh.tanggal).toLocaleDateString("id")}</td>
        <td>
          <button id="btn-hapus" class="btn btn-danger btn-sm" onclick="hapus('${valh.id}')">Hapus </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = row;
});

//hapus 
window.hapus = function hapusSiswa(siswaid,hafalanid) {
  console.log(siswaid)  
  console.log(hafalanid)
  window.Swal.fire({
    title: 'Apakah Anda yakin ingin menghapus data hafalan ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus data ini!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      remove(ref(db, 'siswa/' +siswaid+"/hafalan/"+hafalanid )).then(() => {
        Swal.fire(
          'Terhapus',
          'Data berhasil terhapus.',
          'success'
          )
        })
      }
    })
  }
  

  