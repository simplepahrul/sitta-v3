var ApiService = {
  _cache: null,

  fetchData: function () {
    if (this._cache) return Promise.resolve(this._cache);
    return fetch("data/dataBahanAjar.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Gagal memuat data: " + res.status);
        return res.json();
      })
      .then(function (data) {
        ApiService._cache = data;
        return data;
      });
  },
};

var dataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta",
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar",
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat",
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP",
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat",
  },
  {
    id: 6,
    nama: "M. Pahrul Amri",
    email: "pahrul@ut.ac.id",
    password: "a",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Pekanbaru",
  },
];
