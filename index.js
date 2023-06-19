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

    
let nim = document.getElementById("nim")
let nama = document.getElementById("nama")
let kelas = document.getElementById("kelas")
let jenis_kelamin
let no_hp = document.getElementById("no_hp")
let tgllahir = document.getElementById("tgllahir")



//simpan_siswa
let simpan = document.getElementById('btnsimpan_siswa')
simpan?.addEventListener("click", function(){
  if(simpan.dataset.siswaId){ //untuk update data
    let ele = document.getElementsByName('jekel');
    
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            jenis_kelamin = ele[i].value
        }}
      if ($('#nim').val() == ""|| $('#nim').val() == 0) {
          // focus ke input provider pulsa
          $("#nim").focus();
          // tampilkan peringatan data tidak boleh kosong
          window.swal("Peringatan!", "Nis tidak boleh kosong.", "warning");
      }else if ($('#nama').val() == "" ) {
          // focus ke input nominal
          $("#nama").focus();
          // tampilkan peringatan data tidak boleh kosong
          window. swal("Peringatan!", "Nama tidak boleh kosong.", "warning");
      }
      // jika prodi kosong
      else if ($('#kelas').val() == "Pilih..") {
          // focus ke input harga
          $("#kelas").focus();
          // tampilkan peringatan data tidak boleh kosong
          window. swal("Peringatan!", "kelas tidak boleh kosong.", "warning");
      }
      // jika semester kosong atau 0 (nol)
      else if ($('input[name="jekel"]:checked').length == 0) {
          // focus ke input nominal
          // $("#").focus();
          // tampilkan peringatan data tidak boleh kosong
          window.swal("Peringatan!", "jenis kelamin tidak boleh kosong.", "warning");
      }
      
      else if ($('#no_hp').val() == "") {
          // focus ke input harga
          $("#no_hp").focus();
          // tampilkan peringatan data tidak boleh kosong
          window. swal("Peringatan!", "Nomor Telepon harus diisi.", "warning");
      }
      else {
    update(ref(db, 'siswa/'+simpan.dataset.siswaId), {
      nim: nim.value,
      nama : nama.value,
      kelas: kelas.value,
      jenis_kelamin: jenis_kelamin,
      no_hp: no_hp.value
    })
    .then(() => {
      // Refresh data setelah berhasil diubah
      window.swal({
          title: "Data berhasil diubah",
          icon: "success",
          button: "OK",})
      $("#staticBackdrop").modal("hide");
      document.getElementById("form_siswa").reset();
    })
    .catch((error) => {
      console.error(error);
    });
    simpan.dataset.siswaId = null
    document.getElementById("form_siswa").reset();}
}else{
    let ele = document.getElementsByName('jekel');
    
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            jenis_kelamin = ele[i].value
        }
    }
    console.log(nama.value)

    if ($('#nim').val() == ""|| $('#nim').val() == 0) {
        // focus ke input provider pulsa
        $("#nim").focus();
        // tampilkan peringatan data tidak boleh kosong
        window.swal("Peringatan!", "Nis tidak boleh kosong.", "warning");
    }else if ($('#nama').val() == "" ) {
        // focus ke input nominal
        $("#nama").focus();
        // tampilkan peringatan data tidak boleh kosong
        window. swal("Peringatan!", "Nama tidak boleh kosong.", "warning");
    }
    // jika prodi kosong
    else if ($('#kelas').val() == "Pilih..") {
        // focus ke input harga
        $("#kelas").focus();
        // tampilkan peringatan data tidak boleh kosong
        window. swal("Peringatan!", "kelas tidak boleh kosong.", "warning");
    }
    // jika semester kosong atau 0 (nol)
    else if ($('input[name="jekel"]:checked').length == 0) {
        // focus ke input nominal
        // $("#").focus();
        // tampilkan peringatan data tidak boleh kosong
        window.swal("Peringatan!", "jenis kelamin tidak boleh kosong.", "warning");
    }
    
    else if ($('#no_hp').val() == "") {
        // focus ke input harga
        $("#no_hp").focus();
        // tampilkan peringatan data tidak boleh kosong
        window. swal("Peringatan!", "Nomor Telepon harus diisi.", "warning");
    }
    else {

        push(ref(db, 'siswa'), {
            nim: nim.value,
            nama : nama.value,
            kelas: kelas.value,
            jenis_kelamin: jenis_kelamin,
            no_hp: no_hp.value,
            hafalan:{}
          })
          .then(() => {
            // Refresh data setelah berhasil menambahkan
            window.swal({
                title: "Data berhasil ditambahkan!",
                icon: "success",
                button: "OK",})
            $("#staticBackdrop").modal("hide");
            document.getElementById("form_siswa").reset();
          })
          .catch((error) => {
            console.error(error);
          });
 
}}
})



let tabel_siswa = document.getElementById('tabel_siswa');
onValue(ref(db, 'siswa'), (snapshot) => {
    let data = snapshot.val();
    let tabel_siswa_html = '';

    let nomor = 1; // tambahkan variabel nomor

    for (let siswa_id in data) {
        tabel_siswa_html += '<tr>';
        tabel_siswa_html += '<td>' + nomor++ + '</td>'; // tambahkan nomor
        tabel_siswa_html += '<td>' + data[siswa_id].nim + '</td>';
        tabel_siswa_html += '<td>' + data[siswa_id].nama + '</td>';
        tabel_siswa_html += '<td>' + data[siswa_id].kelas + '</td>';
        tabel_siswa_html += '<td>' + data[siswa_id].jenis_kelamin + '</td>';
        tabel_siswa_html += '<td>' + data[siswa_id].no_hp + '</td>';
        tabel_siswa_html += '<td id= "tpbtn" >';
        tabel_siswa_html += '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalEditSiswa" onclick=" editSiswa(\''+siswa_id+'\')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>';
        tabel_siswa_html += ' <button type="button" class="btn btn-danger btn-sm" onclick="hapusSiswa(\''+siswa_id+'\')">Hapus</button>';
        tabel_siswa_html += '</td>';
        tabel_siswa_html += '</tr>';
    }

    $('#tabel_siswa tbody').html(tabel_siswa_html);
});


// hapus_siswa
window.hapusSiswa = function hapusSiswa(siswaId) {
  window.Swal.fire({
    title: 'Apakah Anda yakin ingin menghapus data siswa ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus data ini!'
  }).then((result) => {
    if (result.isConfirmed) {

      remove(ref(db, 'siswa/' + siswaId)).then(() => {
          Swal.fire(
            'Terhapus',
            'Data berhasil terhapus.',
            'success'
          )
      })
      }
  })
}


//edit_siswa
window.editSiswa = function editSiswa(siswaId){
  console.log(siswaId)
  simpan.dataset.siswaId = siswaId
  get(ref(db, "siswa/"+siswaId)).then((snapshot)=> {
      // console.log(snapshot.val())
      let data = snapshot.val()
      nim.value = data.nim,
      nama.value = data.nama,
      kelas.value= data.kelas,
      document.querySelector(`input[name="jekel"][value="${data.jenis_kelamin}"]`).checked = true;
      no_hp.value= data.no_hp
  })
}
//cari data_siswa
const search = document.getElementById("cari_siswa")
const tbody = document.getElementById("tbody")

search?.addEventListener("change", function(e){
    let input = e.target.value
    get(query(ref(db, `siswa`), ...[orderByChild("nama"), equalTo(input)])).then(snapshot => {
        let data = snapshot.val()
        let row = ""
        if(data != null){
            let keys = Object.keys(data)
            let values = Object.values(data)
            values.map((val, idx) => {
                val.id = keys[idx]
                row += ` 
                <tr>
                    <th scope="row">${idx+1}</th>
                    <td>${val.nim}</td>
                    <td>${val.nama}</td>
                    <td>${val.kelas}</td>
                    <td>${val.jenis_kelamin}</td>
                    <td>${val.no_hp}</td>
                    <td>
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalEditSiswa" onclick=" editSiswa(\''+siswa_id+'\')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="hapusSiswa(\''+siswa_id+'\')">Hapus</button>
                    </td>
                </tr>
                `
            })

            tbody.innerHTML = row
        }else {
            window.swal("Data Tidak Ditemukan", "", "warning");
            search.value="";
                
        }
    })
})

//cari berdasarkan tanggal
// let tglawal = document.getElementById("tglawal");
// let tglakhir = document.getElementById("tglakhir");
// cari_tgl.addEventListener("click", function(){
//     get(query(ref(db, `siswa`), ...[orderByChild("tgllahir"), startAt(tglawal.value),endAt(tglakhir.value)])).then(snapshot => {
//         let data = snapshot.val()
//         let row = ""
//         if(data != null){
//             let keys = Object.keys(data)
//             let values = Object.values(data)
//             values.map((val, idx) => {
//                 val.id = keys[idx]
//                 row += ` 
//                 <tr>
//                     <th scope="row">${idx+1}</th>
//                     <td>${val.nim}</td>
//                     <td>${val.nama}</td>
//                     <td>${val.kelas}</td>
//                     <td>${val.jenis_kelamin}</td>
//                     <td>${val.no_hp}</td>
//                     <td>${val.keterangan}</td>
//                     <td>${val.tgllahir}</td>
//                     <td>
//                     <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalEditSiswa" onclick=" editSiswa(\''+siswa_id+'\')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
//                     <button type="button" class="btn btn-danger btn-sm" onclick="hapusSiswa(\''+siswa_id+'\')">Hapus</button>
//                     </td>
//                 </tr>
//                 `
//             })

//             tbody.innerHTML = row
//         }
//     })
// })


//reset tabel
let reset_tabel = document.getElementById('reset_siswa')
reset_tabel?.addEventListener("click", function(){
    let tabel_siswa = document.getElementById('tabel_siswa');
    onValue(ref(db, 'siswa'), (snapshot) => {
        let data = snapshot.val();
        let tabel_siswa_html = '';
    
        let nomor = 1; // tambahkan variabel nomor
    
        for (let siswa_id in data) {
            tabel_siswa_html += '<tr>';
            tabel_siswa_html += '<td>' + nomor++ + '</td>'; // tambahkan nomor
            tabel_siswa_html += '<td>' + data[siswa_id].nim + '</td>';
            tabel_siswa_html += '<td>' + data[siswa_id].nama + '</td>';
            tabel_siswa_html += '<td>' + data[siswa_id].kelas + '</td>';
            tabel_siswa_html += '<td>' + data[siswa_id].jenis_kelamin + '</td>';
            tabel_siswa_html += '<td>' + data[siswa_id].no_hp + '</td>';
            tabel_siswa_html += '<td>';
            tabel_siswa_html += '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalEditSiswa" onclick=" editSiswa(\''+siswa_id+'\')"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>';
            tabel_siswa_html += ' <button type="button" class="btn btn-danger btn-sm" onclick="hapusSiswa(\''+siswa_id+'\')">Hapus</button>';
            tabel_siswa_html += '</td>';
            tabel_siswa_html += '</tr>';
        }
    
        $('#tabel_siswa tbody').html(tabel_siswa_html);
    });
    // tglawal.value = ""
    // tglakhir.value = ""
})



let reset_modalsiswa = document.getElementById('btntambah')
reset_modalsiswa.addEventListener("click",function (){document.getElementById("form_siswa").reset();})

