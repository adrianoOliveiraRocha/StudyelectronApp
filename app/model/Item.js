'use strict'

const Item = (function() {
  this.id;
  this.name;
  this.subjectId;
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

    setSubjectId(subjectId) {
      this.subjectId = subjectId;
    },

    getSubjectId() {
      return this.subjectId;
    }
  }
})()

module.exports = Item;