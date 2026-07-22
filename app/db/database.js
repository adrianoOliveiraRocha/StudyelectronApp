// app/db/db-connect.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'study.db');
const db = new sqlite3.Database(dbPath);

const Database = {
  query(sql, params) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  async getUsers() {
    try {
      const users = await this.query('SELECT * FROM user');
      return users;
    } catch (error) {
      console.error('Error fetching users from DB:', error);
      return [];
    }
  },

  async getUser(email, pwd) {
    try {
      const sql = `select * from user where email = ? and pwd = ?;`;
      const result = await this.query(sql, [email, pwd]);
      if(result.length == 1) {
        return {success: true, user: result[0]};
      } else {
        return {success: false, user: null, message: "User not found!"};
      }
    } catch (error) {
      console.error(`database.js, line: 34: ${error}`);
    }
    
  }
};

module.exports = Database;