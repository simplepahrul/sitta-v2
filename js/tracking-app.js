new Vue({
  el: "#app",

  data: {
    // DARK MODE SYNC
    darkMode: localStorage.getItem("darkMode") === "true",

    searchDO: "",
    hasilTracking: null,
    notFound: false,

    pengirimanList: dataSITTA.pengirimanList,
    paket: dataSITTA.paket,
    tracking: dataSITTA.tracking,

    selectedPaket: "",

    newTracking: {
      nomorDO: "",
      nim: "",
      nama: "",
      ekspedisi: "",
      tanggalKirim: new Date().toISOString().split("T")[0],
    },
  },

  computed: {
    // object -> array
    trackingList() {
      return Object.keys(this.tracking).map((key) => ({
        nomorDO: key,
        ...this.tracking[key],
      }));
    },

    // total harga paket
    totalHarga() {
      return this.selectedPaket ? this.selectedPaket.harga : 0;
    },
  },

  methods: {
    cariTracking() {
      this.hasilTracking = this.tracking[this.searchDO];
      this.notFound = !this.hasilTracking;
    },

    generateNomorDO() {
      const tahun = new Date().getFullYear();
      const nomor = String(this.trackingList.length + 1).padStart(4, "0");
      return `DO${tahun}-${nomor}`;
    },

    tambahTracking() {
      if (!this.newTracking.nim || !this.newTracking.nama) {
        alert("NIM dan Nama wajib diisi!");
        return;
      }

      const dataBaru = {
        nomorDO: this.newTracking.nomorDO,
        nim: this.newTracking.nim,
        nama: this.newTracking.nama,
        status: "Dalam Perjalanan",
        ekspedisi: this.newTracking.ekspedisi,
        tanggalKirim: this.newTracking.tanggalKirim,
        paket: this.selectedPaket.nama,
        total: this.totalHarga,
        perjalanan: [
          {
            waktu: new Date().toLocaleString(),
            keterangan: "Paket berhasil dibuat",
          },
        ],
      };

      this.$set(this.tracking, dataBaru.nomorDO, dataBaru);

      alert("Tracking berhasil ditambahkan!");

      this.newTracking = {
        nomorDO: this.generateNomorDO(),
        nim: "",
        nama: "",
        ekspedisi: "",
        tanggalKirim: new Date().toISOString().split("T")[0],
      };

      this.selectedPaket = "";

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTambah"),
      );

      modal.hide();
    },

    // toggle dark mode
    toggleTheme() {
      this.darkMode = !this.darkMode;
    },
  },

  watch: {
    selectedPaket(newValue) {
      console.log("Paket dipilih:", newValue ? newValue.nama : "-");
    },

    searchDO(newValue) {
      console.log("Cari DO:", newValue);
    },

    // DARK MODE SYNC GLOBAL
    darkMode(newValue) {
      localStorage.setItem("darkMode", newValue);

      if (newValue) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },

  mounted() {
    // init dark mode
    if (this.darkMode) {
      document.body.classList.add("dark-mode");
    }

    this.newTracking.nomorDO = this.generateNomorDO();
  },
});
