app.component("do-tracking", {
  template: "#tpl-tracking",

  props: {
    data: { type: Object, required: true },
    pengirimanList: { type: Array, default: () => [] },
    paket: { type: Array, default: () => [] },
  },

  data() {
    return {
      tracking: {},

      searchDO: "",
      hasilTracking: null,
      notFound: false,

      newProgress: "",

      showModalTambah: false,

      newDO: {
        nomorDO: "",
        nim: "",
        nama: "",
        ekspedisi: "",
        tanggalRaw: new Date().toISOString().split("T")[0],
      },

      selectedPaket: "",
      errDO: {},
    };
  },

  computed: {
    trackingList() {
      return Object.keys(this.tracking).map((key) => ({
        nomorDO: key,
        ...this.tracking[key],
      }));
    },

    totalHarga() {
      return this.selectedPaket ? this.selectedPaket.harga : 0;
    },

    nomorDOBaru() {
      const tahun = new Date().getFullYear();
      const seq = String(this.trackingList.length + 1).padStart(4, "0");
      return `DO${tahun}-${seq}`;
    },
  },

  watch: {
    // Watcher 0: sync tracking dari fetch JSON
    data: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.tracking = JSON.parse(JSON.stringify(newVal));
        }
      },
    },

    // Watcher 1: log paket dipilih
    selectedPaket(newVal) {
      console.log(
        "[Tracking Watcher] Paket dipilih:",
        newVal ? newVal.nama : "-",
      );
    },

    // Watcher 2: reset hasil saat search dikosongkan
    searchDO(newVal) {
      if (!newVal) {
        this.hasilTracking = null;
        this.notFound = false;
      }
      console.log("[Tracking Watcher] Input cari:", newVal);
    },

    // Watcher 3: update nomorDO saat list bertambah
    trackingList() {
      this.newDO.nomorDO = this.nomorDOBaru;
    },
  },

  methods: {
    // Format helpers (Vue 3 tidak punya filters)
    formatRupiah(val) {
      if (!val && val !== 0) return "Rp 0";
      return "Rp " + Number(val).toLocaleString("id-ID");
    },

    formatTanggal(val) {
      if (!val) return "-";
      const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const parts = val.split("-");
      if (parts.length !== 3) return val;
      return `${parts[2]} ${bulan[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
    },

    cariTracking() {
      const q = this.searchDO.trim().toUpperCase();
      if (this.tracking[q]) {
        this.hasilTracking = { nomorDO: q, ...this.tracking[q] };
        this.notFound = false;
        return;
      }
      const foundKey = Object.keys(this.tracking).find(
        (key) => this.tracking[key].nim === this.searchDO.trim(),
      );
      if (foundKey) {
        this.hasilTracking = { nomorDO: foundKey, ...this.tracking[foundKey] };
        this.notFound = false;
      } else {
        this.hasilTracking = null;
        this.notFound = true;
      }
    },

    resetCari() {
      this.searchDO = "";
      this.hasilTracking = null;
      this.notFound = false;
    },

    pilihDO(item) {
      this.hasilTracking = item;
      this.searchDO = item.nomorDO;
      this.notFound = false;
    },

    openModalTambah() {
      this.newDO = {
        nomorDO: this.nomorDOBaru,
        nim: "",
        nama: "",
        ekspedisi: "",
        tanggalRaw: new Date().toISOString().split("T")[0],
      };
      this.selectedPaket = "";
      this.errDO = {};
      this.showModalTambah = true;
    },

    validateDO() {
      const err = {};
      if (!this.newDO.nim.trim()) err.nim = "NIM wajib diisi";
      if (!this.newDO.nama.trim()) err.nama = "Nama wajib diisi";
      if (!this.newDO.ekspedisi) err.ekspedisi = "Ekspedisi wajib dipilih";
      if (!this.selectedPaket) err.paket = "Paket wajib dipilih";
      this.errDO = err;
      return Object.keys(err).length === 0;
    },

    tambahDO() {
      if (!this.validateDO()) return;
      const nomorDO = this.newDO.nomorDO;
      this.tracking[nomorDO] = {
        nim: this.newDO.nim,
        nama: this.newDO.nama,
        status: "Dalam Perjalanan",
        ekspedisi: this.newDO.ekspedisi,
        tanggalKirim: this.formatTanggal(this.newDO.tanggalRaw),
        paket: this.selectedPaket.nama,
        total: this.totalHarga,
        perjalanan: [
          {
            waktu: new Date().toLocaleString("id-ID"),
            keterangan: "Paket berhasil dibuat dan siap dikirim",
          },
        ],
      };
      this.showModalTambah = false;
    },

    tambahProgress() {
      if (!this.newProgress.trim() || !this.hasilTracking) return;
      const nomorDO = this.hasilTracking.nomorDO;
      const entry = {
        waktu: new Date().toLocaleString("id-ID"),
        keterangan: this.newProgress.trim(),
      };
      if (this.tracking[nomorDO]) {
        this.tracking[nomorDO].perjalanan.push(entry);
        this.hasilTracking = { nomorDO, ...this.tracking[nomorDO] };
      }
      this.newProgress = "";
    },
  },

  mounted() {
    this.newDO.nomorDO = this.nomorDOBaru;
  },
});
