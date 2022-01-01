const baseUrl = "http://3.145.21.71:81/api";

Vue.use(window.vuelidate.default)
const { required, minLength, maxLength, email } = window.validators

var vueApp = new Vue({
  el: "#contact-form",
  data() {
    return {
      step: 1,
      name: "",
      message: "",
      email: "",
      phone: "",
      emailSending: false,
      focusElements: {
        1: "name",
        2: "message",
        3: "email",
        4: "phone",
      },
      submitStatus: ''
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    message: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10000),
    },
    email: {
      required,
      maxLength: maxLength(320),
      email
    },
    phone: {
      required
    }
  },
  computed: {
    firstName() {
      return this.name.split(" ")[0];
    },

    isAPhoneNumber() {
      const match = /^\+?\d{0,3}[\(\- ]?\d{3}\)?[\- ]?\d{3,4}[\- ]?\d{4}/.test(this.phone);
      return match;
    },
  },
  methods: {
    async prev() {
      await this.step--;
      this.$refs[this.focusElements[this.step]].focus();
    },

    async next() {
      if (this.step === 1) {
        this.$v.name.$touch();
        if (!this.$v.name.$invalid) {
          await this.step++;
          this.$refs[this.focusElements[this.step]].focus();
        }
      } else if (this.step === 2) {
        this.$v.message.$touch();
        if (!this.$v.message.$invalid) {
          await this.step++;
          this.$refs[this.focusElements[this.step]].focus();
        }
      } else if (this.step === 3) {
        this.$v.email.$touch();
        if (!this.$v.email.$invalid) {
          await this.step++;
          this.$refs[this.focusElements[this.step]].focus();
        }
      } else if (this.step === 4) {
        this.$v.phone.$touch();
        if (!this.$v.phone.$invalid && this.isAPhoneNumber) {
          await this.step++;
          this.$refs[this.focusElements[this.step]].focus();
        }
      }
    },

    async saveToDatabase() {
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
      };

      const response = await fetch(`${baseUrl}/db/insert-enquiry`, {
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
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
        phone: this.phone
      }
      const response = await fetch(`${baseUrl}/email`, {
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

    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid || !this.isAPhoneNumber) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.emailSending = true;
        this.submitStatus = 'PENDING';
        await this.saveToDatabase();
        await this.sendEmail();
        this.submitStatus = 'OK';
        this.emailSending = false;
      }
    },
  },

  mounted() {
    this.$refs.name.focus();
  }
});
