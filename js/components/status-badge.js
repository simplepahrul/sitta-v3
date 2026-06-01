app.component("status-badge", {
  template: "#tpl-badge",

  props: {
    qty: { type: Number, required: true },
    safety: { type: Number, required: true },
    catatan: { type: String, default: "" },
  },

  computed: {
    statusLabel() {
      if (this.qty === 0) return "Kosong";
      if (this.qty < this.safety) return "Menipis";
      return "Aman";
    },
    statusIcon() {
      if (this.qty === 0) return "🔴";
      if (this.qty < this.safety) return "🟠";
      return "🟢";
    },
    statusClass() {
      if (this.qty === 0) return "bg-danger";
      if (this.qty < this.safety) return "bg-warning text-dark";
      return "bg-success";
    },
  },
});
