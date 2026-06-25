'use strict'
const Database = require('./../db/db-connect');

const UserControl = (() => {
  return {
    showUser: () => {
      return userPreloads.getUser();
    }
  }
})() 