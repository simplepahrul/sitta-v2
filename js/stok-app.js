new Vue({
  el: "#app",

  data: {
    // dark mode
    darkMode: localStorage.getItem("darkMode") === "true",

    upbjjList: dataSITTA.upbjjList,
    kategoriList: dataSITTA.kategoriList,
    stok: dataSITTA.stok,

    // filter
    search: "",
    selectedUpbjj: "",
    selectedKategori: "",
    sortBy: "",
    warningOnly: false,

    // tambah
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

    // edit
    editStok: {},
  },

  // COMPUTED
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

      if (this.sortBy === "judul") {
        data.sort((a, b) => a.judul.localeCompare(b.judul));
      }

      if (this.sortBy === "qty") {
        data.sort((a, b) => b.qty - a.qty);
      }

      if (this.sortBy === "harga") {
        data.sort((a, b) => b.harga - a.harga);
      }

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

  // METHODS
  methods: {
    // ===== TAMBAH =====
    tambahStok() {
      if (!this.newStok.kode || !this.newStok.judul) {
        alert("Kode dan Judul wajib diisi!");
        return;
      }

      this.stok.push({
        ...this.newStok,
      });

      this.resetNewForm();

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTambah"),
      );

      modal.hide();

      alert("Data berhasil ditambahkan!");
    },

    resetNewForm() {
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
    },

    // ===== EDIT (FIX UTAMA) =====
    editData(item) {
      this.editStok = item; // IMPORTANT: langsung reference asli
    },

    updateData() {
      // karena editStok = reference asli, Vue otomatis update UI

      if (this.editStok.qty < 0) {
        alert("Qty tidak boleh minus!");
        return;
      }

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalEdit"),
      );

      modal.hide();

      alert("Data berhasil diupdate!");
    },

    // ===== RESET FILTER =====
    resetFilter() {
      this.search = "";
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.sortBy = "";
      this.warningOnly = false;
    },

    // ===== DARK MODE =====
    toggleDark() {
      this.darkMode = !this.darkMode;
    },
  },

  // WATCHERS
  watch: {
    darkMode(val) {
      localStorage.setItem("darkMode", val);

      if (val) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },

  // MOUNTED
  mounted() {
    if (this.darkMode) {
      document.body.classList.add("dark-mode");
    }
  },
});
