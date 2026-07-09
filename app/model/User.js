'use strict'

const User = (function () {
  this.email;
  this.pwd;
  return {
    setEmail(email) {
      this.email = email;
    }, 

    getEmail() {
      return this.email;
    },

    setPwd(pwd) {
      this.pwd = pwd;
    }, 

    getPwd() {
      return this.pwd;
    }
  }
})() 