'use strict'

const Subject = (function() {
  this.id;
  this.name;
  this.userId;
  return {
    setId(id) {
      this.id = id;
    },

    getId() {
      return this.id;
    },

    setName(name) {
      this.name = name;
    },

    getName() {
      return this.name;
    },

    setUserId(userId) {
      this.userId = userId;
    },

    getUserId() {
      return this.userId;
    }
  }
})()

module.exports = Subject;