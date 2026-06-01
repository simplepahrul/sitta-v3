const app = Vue.createApp({
  data() {
    return {
      page: "login",
      tab: "stok",
      darkMode: localStorage.getItem("darkMode") === "true",
      userLogin: null,

      // Form login
      email: "",
      password: "",
      loginError: "",

      // Data dari JSON
      state: {
        stok: [],
        upbjjList: [],
        kategoriList: [],
        paket: [],
        pengirimanList: [],
        tracking: {},
      },

      loading: true,
      errorMsg: "",
      reorderCount: 0,
    };
  },

  computed: {
    greeting() {
      const jam = new Date().getHours();
      if (jam < 11) return "Selamat Pagi";
      if (jam < 15) return "Selamat Siang";
      if (jam < 18) return "Selamat Sore";
      return "Selamat Malam";
    },
  },

  watch: {
    // Watcher 1: darkMode
    darkMode(val) {
      localStorage.setItem("darkMode", val);
      document.body.classList.toggle("dark-mode", val);
    },

    // Watcher 2: tab
    tab(newTab) {
      console.log("[App Watcher] Tab aktif:", newTab);
    },

    // Watcher 3: reset error saat email berubah
    email() {
      this.loginError = "";
    },

    // Watcher 4: reset error saat password berubah
    password() {
      this.loginError = "";
    },
  },

  methods: {
    login() {
      const user = dataPengguna.find(
        (u) => u.email === this.email && u.password === this.password,
      );
      if (user) {
        this.userLogin = user;
        localStorage.setItem("userLogin", JSON.stringify(user));
        this.page = "app";
        this.loadData();
      } else {
        this.loginError = "Email atau password salah!";
      }
    },

    logout() {
      this.userLogin = null;
      this.email = "";
      this.password = "";
      localStorage.removeItem("userLogin");
      this.page = "login";
    },

    loadData() {
      this.loading = true;
      ApiService.fetchData()
        .then((data) => {
          this.state.stok = data.stok;
          this.state.upbjjList = data.upbjjList;
          this.state.kategoriList = data.kategoriList;
          this.state.paket = data.paket;
          this.state.pengirimanList = data.pengirimanList;
          this.state.tracking = data.tracking;
          this.loading = false;
        })
        .catch((err) => {
          this.errorMsg = "Gagal memuat data: " + err.message;
          this.loading = false;
        });
    },

    toggleTheme() {
      this.darkMode = !this.darkMode;
    },
    setTab(t) {
      this.tab = t;
    },
    handleReorderUpdate(count) {
      this.reorderCount = count;
    },
  },

  mounted() {
    if (this.darkMode) document.body.classList.add("dark-mode");

    const saved = localStorage.getItem("userLogin");
    if (saved) {
      this.userLogin = JSON.parse(saved);
      this.page = "app";
      this.loadData();
    } else {
      this.loading = false;
    }
  },
});

// Daftarkan komponen SEBELUM mount (urutan penting)
// File komponen sudah di-load sebelum app.js via <script> di HTML
