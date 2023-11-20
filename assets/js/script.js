var dataBarang = [
];
var totalHarga = 0;

function isNumber(a) {
  if (!isNaN(a) && a > 0) {
    return a;
  }
  return 0;
}


function showBarang() {
  let listBarang = document.getElementById("list-barang");
  listBarang.innerHTML = "";
  listBarang.innerHTML += "<tr><th>Nama Barang</th><th>Jumlah</th><th>Harga</th><th>Total</th><th>Aksi</th></tr>";

  let total = 0;
  for (let i = 0; i < dataBarang.length; i++) {

    const diskon = check_diskon(dataBarang[i].nama, dataBarang[i].jumlah);
    if (diskon != false) {
      dataBarang[i].total = diskon;
    }

    listBarang.innerHTML += "<tr><td>" + dataBarang[i].nama + "</td><td>" + dataBarang[i].jumlah + "</td><td>" + dataBarang[i].harga + "</td><td>" + dataBarang[i].total + "</td><td>[ <a href='#' onclick='editBarang(" + i + ")'>Edit</a> | <a href='#' onclick='deleteBarang(" + i + ")'>Delete</a> ]</td></tr> ";
    total += dataBarang[i].total;
  }
  this.totalHarga = total;




  document.getElementById("hasil").innerHTML = total;

}

function addBarang() {
  let barang = document.getElementById("jenisPakaian").value;
  let jumlah = isNumber(document.querySelector("input[name=total]").value);
  let harga;
  let total;

  if (check_barang(barang, jumlah)) {
    showBarang();
    return;
  }
  if (barang == "Pakaian") {
    harga = 15000;
    total = jumlah * harga;
  } else if (barang == "Bedcover") {
    harga = 100000;
    total = jumlah * harga;
  } else if (barang == "Karpet") {
    harga = 120000;
    total = jumlah * harga;
  }
  dataBarang.push({ nama: barang, jumlah: jumlah, harga: harga, total: total });
  showBarang();
}

function check_diskon(namaBarang, jumlah) {

  const i = dataBarang.findIndex(function (item) {
    return item.nama == namaBarang;
  });

  if (i >= 0) {
    let total = 0;
    if (namaBarang == "Pakaian" && jumlah > 5) {
      total = dataBarang[i].total = parseInt(dataBarang[i].harga) * (parseInt(dataBarang[i].jumlah) - 1);
      return total;
    } else if (namaBarang == "Bedcover" && jumlah > 3) {
      total = dataBarang[i].total = parseInt(dataBarang[i].harga) * (parseInt(dataBarang[i].jumlah) - 1);
      return total;
    }
  }

  return false;
}

function check_barang(namaBarang, jumlah) {
  const i = dataBarang.findIndex(function (item) {
    return item.nama == namaBarang;
  });

  if (i >= 0) {
    dataBarang[i].jumlah = parseInt(dataBarang[i].jumlah) + parseInt(jumlah);
    dataBarang[i].total = parseInt(dataBarang[i].harga) * parseInt(dataBarang[i].jumlah);
    return true;
  }
  return false;

}


function editBarang(id) {
  let newJumlah = prompt("Input jumlah baru...", dataBarang[id].jumlah);
  let jumlah = isNumber(newJumlah) || dataBarang[id].jumlah;
  dataBarang[id] = {
    nama: dataBarang[id].nama,
    harga: dataBarang[id].harga,
    jumlah: jumlah,
    total: dataBarang[id].harga * jumlah || dataBarang[id].total
  };
  showBarang();
}


function deleteBarang(id) {
  dataBarang.splice(id, 1);
  showBarang();
}

function bayar() {
  let bayar = document.getElementById("bayar").value;
  let kembalian = bayar - this.totalHarga;
  document.getElementById("kembalian").innerHTML = kembalian;
}

showBarang();

function refreshForm() {
  dataBarang = [];
  showBarang();
  document.getElementById("bayar").value = 0;
  document.getElementById("kembalian").innerHTML = 0;
}
