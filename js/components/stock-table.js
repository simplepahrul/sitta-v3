app.component("ba-stock-table", {
  template: "#tpl-stock",

  props: {
    items: { type: Array, required: true },
    upbjjList: { type: Array, default: () => [] },
    kategoriList: { type: Array, default: () => [] },
  },

  emits: ["reorder-update"],

  data() {
    return {
      stok: [],

      search: "",
      selectedUpbjj: "",
      selectedKategori: "",
      sortBy: "",
      warningOnly: false,

      showModalTambah: false,
      showModalEdit: false,
      showModalHapus: false,

      newStok: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      },
      errNew: {},

      editStok: null,
      editIndex: -1,
      errEdit: {},

      hapusTarget: null,
      hapusIndex: -1,
    };
  },

  computed: {
    filteredStok() {
      let data = this.stok.filter((item) => {
        const matchSearch =
          item.judul.toLowerCase().includes(this.search.toLowerCase()) ||
          item.kode.toLowerCase().includes(this.search.toLowerCase());
        const matchUpbjj =
          !this.selectedUpbjj || item.upbjj === this.selectedUpbjj;
        const matchKategori =
          !this.selectedKategori || item.kategori === this.selectedKategori;
        const matchWarning =
          !this.warningOnly || item.qty < item.safety || item.qty === 0;
        return matchSearch && matchUpbjj && matchKategori && matchWarning;
      });

      if (this.sortBy === "judul")
        data = [...data].sort((a, b) => a.judul.localeCompare(b.judul));
      if (this.sortBy === "qty") data = [...data].sort((a, b) => b.qty - a.qty);
      if (this.sortBy === "harga")
        data = [...data].sort((a, b) => b.harga - a.harga);

      return data;
    },

    totalQty() {
      return this.filteredStok.reduce((t, i) => t + Number(i.qty), 0);
    },

    reorderCount() {
      return this.filteredStok.filter((i) => i.qty < i.safety || i.qty === 0)
        .length;
    },
  },

  watch: {
    // Watcher 0: sync stok saat props items datang dari fetch
    items: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length > 0) this.stok = [...newVal];
      },
    },

    // Watcher 1: reset kategori saat upbjj berubah
    selectedUpbjj(newVal) {
      this.selectedKategori = "";
      console.log("[Stok Watcher] UPBJJ:", newVal || "Semua");
    },

    // Watcher 2: emit reorderCount ke parent
    reorderCount(newVal) {
      this.$emit("reorder-update", newVal);
      console.log("[Stok Watcher] Reorder count:", newVal);
    },

    // Watcher 3: warningOnly filter
    warningOnly(newVal) {
      console.log(
        "[Stok Watcher] Filter reorder:",
        newVal ? "Aktif" : "Nonaktif",
      );
    },
  },

  methods: {
    // Format helpers (Vue 3 tidak punya filters, pakai methods)
    formatRupiah(val) {
      if (!val && val !== 0) return "-";
      return "Rp " + Number(val).toLocaleString("id-ID");
    },
    formatBuah(val) {
      return val + " buah";
    },

    resetFilter() {
      this.search = "";
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.sortBy = "";
      this.warningOnly = false;
    },

    validateNew() {
      const err = {};
      if (!this.newStok.kode.trim()) err.kode = "Kode wajib diisi";
      if (!this.newStok.judul.trim()) err.judul = "Judul wajib diisi";
      if (!this.newStok.kategori) err.kategori = "Kategori wajib dipilih";
      if (!this.newStok.upbjj) err.upbjj = "UPBJJ wajib dipilih";
      if (this.newStok.harga < 0) err.harga = "Harga tidak boleh negatif";
      if (this.newStok.qty < 0) err.qty = "Qty tidak boleh negatif";
      this.errNew = err;
      return Object.keys(err).length === 0;
    },

    tambahStok() {
      if (!this.validateNew()) return;
      if (this.stok.find((s) => s.kode === this.newStok.kode)) {
        this.errNew.kode = "Kode sudah ada!";
        return;
      }
      this.stok.push({ ...this.newStok });
      this.newStok = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      };
      this.errNew = {};
      this.showModalTambah = false;
    },

    openEdit(item) {
      this.editIndex = this.stok.indexOf(item);
      this.editStok = { ...item };
      this.errEdit = {};
      this.showModalEdit = true;
    },

    validateEdit() {
      const err = {};
      if (!this.editStok.judul.trim()) err.judul = "Judul wajib diisi";
      if (this.editStok.harga < 0) err.harga = "Harga tidak boleh negatif";
      if (this.editStok.qty < 0) err.qty = "Qty tidak boleh negatif";
      this.errEdit = err;
      return Object.keys(err).length === 0;
    },

    updateData() {
      if (!this.validateEdit()) return;
      this.stok[this.editIndex] = { ...this.editStok };
      this.showModalEdit = false;
      this.editStok = null;
    },

    hapusData(item) {
      this.hapusTarget = item;
      this.hapusIndex = this.stok.indexOf(item);
      this.showModalHapus = true;
    },

    konfirmasiHapus() {
      if (this.hapusIndex !== -1) this.stok.splice(this.hapusIndex, 1);
      this.showModalHapus = false;
      this.hapusTarget = null;
      this.hapusIndex = -1;
    },
  },
});
