const baseUrl = "http://3.145.21.71:81/api";

Vue.use(window.vuelidate.default)
const { required, minLength, maxLength, alpha, email } = window.validators

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
      alpha
    },
    message: {
      required,
      maxLength: maxLength(200)
    },
    email: {
      required,
      email
    },
    phone: {
      required
    }
  },
  computed: {
    firstName() {
      return this.name.split(" ")[0];
    }
  },
  methods: {
    async prev() {
      await this.step--;
      this.$refs[this.focusElements[this.step]].focus();
    },

    async next() {
      await this.step++;
      this.$refs[this.focusElements[this.step]].focus();
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
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.emailSending = true;
        this.submitStatus = 'PENDING';
        await this.saveToDatabase();
        await this.sendEmail();

        setTimeout(() => {
          this.emailSending = false;
        }, 10000);
      }
    },
  },

  mounted() {
    this.$refs.name.focus();
  }
});
