app.component("app-modal", {
  template: "#tpl-modal",

  props: {
    title: { type: String, default: "Modal" },
    show: { type: Boolean, default: false },
  },

  emits: ["close"],
});
