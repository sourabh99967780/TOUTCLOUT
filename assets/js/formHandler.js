var vueApp = new Vue({
  el: "#contact-form",
  data() {
    return {
      name: "",
      message: "",
      email: "",
      phone: "",
      emailSending: false,
    };
  },
  methods: {
    async saveToDatabase() {
      const url = "http://localhost:3300/api/db/insert-enquiry";
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
      };

      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
    },

    async sendEmail() {
      console.log("Email is sent");
    },

    async handleFormData() {
      this.emailSending = true;

      await this.saveToDatabase();
      await this.sendEmail();

      setTimeout(() => {
        this.emailSending = false;
      }, 10000);
    },
  },
});
