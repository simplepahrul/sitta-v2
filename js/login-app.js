const { createApp } = Vue;

createApp({
  data() {
    return {
      email: "",
      password: "",
      darkMode: false,
      errorMessage: "",
    };
  },

  methods: {
    // LOGIN
    login() {
      // cek user dari dataPengguna
      const user = dataPengguna.find(
        (u) => u.email === this.email && u.password === this.password,
      );

      if (user) {
        alert(`Login berhasil!\nSelamat datang ${user.nama}`);

        // simpan user login
        localStorage.setItem("userLogin", JSON.stringify(user));

        // redirect
        window.location.href = "dashboard.html";
      } else {
        this.errorMessage = "Email atau password salah!";
      }
    },

    // DARK MODE
    toggleTheme() {
      this.darkMode = !this.darkMode;

      document.body.classList.toggle("dark-mode", this.darkMode);

      // simpan tema
      localStorage.setItem("darkMode", this.darkMode);
    },
  },

  // WATCHERS
  watch: {
    // watcher email
    email(newValue) {
      console.log("Email berubah:", newValue);

      this.errorMessage = "";
    },

    // watcher password
    password(newValue) {
      console.log("Password berubah");

      this.errorMessage = "";
    },
  },

  // MOUNTED
  mounted() {
    // load dark mode
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      this.darkMode = true;

      document.body.classList.add("dark-mode");
    }
  },
}).mount("#app");
