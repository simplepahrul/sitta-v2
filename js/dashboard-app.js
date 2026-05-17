const { createApp } = Vue;

createApp({
  data() {
    return {
      darkMode: false,

      // ambil user login
      user: JSON.parse(localStorage.getItem("userLogin")) || {},
    };
  },

  // COMPUTED
  computed: {
    // total bahan ajar
    totalBahanAjar() {
      return dataSITTA.stok.length;
    },

    // total stok
    totalStok() {
      return dataSITTA.stok.reduce((total, item) => total + item.qty, 0);
    },

    // total tracking
    totalTracking() {
      return Object.keys(dataSITTA.tracking).length;
    },

    // total user
    totalUser() {
      return dataPengguna.length;
    },

    // stok menipis
    stokMenipis() {
      return dataSITTA.stok.filter((item) => item.qty <= item.safety).length;
    },

    // greeting sesuai waktu
    greeting() {
      const jam = new Date().getHours();

      if (jam >= 4 && jam < 11) {
        return "Selamat Pagi";
      } else if (jam >= 11 && jam < 15) {
        return "Selamat Siang";
      } else if (jam >= 15 && jam < 18) {
        return "Selamat Sore";
      } else {
        return "Selamat Malam";
      }
    },
  },

  // METHODS
  methods: {
    // logout
    logoutUser() {
      localStorage.removeItem("userLogin");

      alert("Logout berhasil!");

      window.location.href = "index.html";
    },

    // dark mode
    toggleTheme() {
      this.darkMode = !this.darkMode;

      document.body.classList.toggle("dark-mode", this.darkMode);

      // simpan tema
      localStorage.setItem("darkMode", this.darkMode);
    },
  },

  // WATCHERS
  watch: {
    // watcher 1
    darkMode(newValue) {
      console.log("Dark mode:", newValue ? "Aktif" : "Nonaktif");
    },

    // watcher 2
    user(newValue) {
      console.log("User login:", newValue.nama);
    },
  },

  // MOUNTED
  mounted() {
    // cek login
    if (!this.user.nama) {
      alert("Silakan login terlebih dahulu!");

      window.location.href = "index.html";
    }

    // load dark mode
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      this.darkMode = true;

      document.body.classList.add("dark-mode");
    }
  },
}).mount("#app");
