import { connect } from './dbConfig'
const sql = require('mssql');

const getAllBooks = async () => {
  try {
    const pool = await connect();

    const data = await pool.request().query('SELECT * FROM Books')

    return data.recordset;
  } catch (err) {
    console.log("Error from getAllBooks:" + err);
  }
};


const getSearchedBooks = async (searchString, year, price) => {
  try {
    const pool = await connect();


    const yearArray = year.split(',');
    const priceArray = price.split(',');



    const data = await pool.request().query(`SELECT * FROM Books WHERE (bookName LIKE '%${searchString}%' OR bookAuthor LIKE '%${searchString}%') AND bookYear>=${yearArray[0]} AND bookYear <=${yearArray[1]} AND bookPrice>=${priceArray[0]} AND bookPrice <=${priceArray[1]}`);

    return data.recordset;
  } catch (err) {
    console.log('Error from getSearchedBooks: ' + err);
  }
};


const addUser = async (user) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()
      .input('userName', user.userName)
      .input('userEmail', user.userEmail)
      .input('passwordHash', user.passwordHash)
      .input('roleId', user.roleId)
      .output('userId', sql.Int)
      .query(`
      INSERT INTO Users (userName, userEmail, passwordHash, roleId)
      OUTPUT inserted.userId
      VALUES (@userName, @userEmail, @passwordHash, @roleId)
    `);

    const newUserId = result.recordset[0].userId;
    return newUserId;

  } catch (err) {

    console.log('Error from addUser: ' + err);
  }
}



const getUserById = async (userId) => {

  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Users.userId, Users.userName, Users.userEmail, Users.userImage,Users.passwordHash , Roles.roleName
    FROM Users
    JOIN Roles ON Users.roleId = Roles.roleId
    WHERE Users.userId = ${userId}`);

    return data.recordset;

  } catch (err) {

    console.log('Error from getUserById: ' + err);
  }
}

const getUserByName = async (userName) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Users.userId, Users.userName, Users.userEmail, Users.userImage,Users.passwordHash , Roles.roleName
    FROM Users
    JOIN Roles ON Users.roleId = Roles.roleId
    WHERE Users.userName = '${userName}'`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getUserByName: ' + err);
  }
}

const getUserByEmail = async (userEmail) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Users.userId, Users.userName, Users.userEmail, Users.userImage,Users.passwordHash , Roles.roleName
    FROM Users
    JOIN Roles ON Users.roleId = Roles.roleId
    WHERE Users.userEmail = '${userEmail}'`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getUserByEmail: ' + err);
  }
}


const setRefreshToken = async (userId, refreshToken) => {
  try {
    const pool = await connect();

    await pool.request().query(`INSERT INTO RefreshTokens (refreshToken, userId) 
      VALUES ('${refreshToken}', '${userId}')
      `);


  } catch (err) {

    console.log('Error from setRefreshToken: ' + err);
  }
}


const getRefreshToken = async (userId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT * FROM RefreshTokens WHERE userId=${userId}`);

    return data.recordset;

  } catch (err) {

    console.log('Error from getRefreshToken: ' + err);
  }
}


const deleteRefreshToken = async (userId) => {
  try {
    const pool = await connect();

    await pool.request().query(`DELETE FROM RefreshTokens WHERE userId=${userId}`);

  } catch (err) {

    console.log('Error from deleteRefreshToken: ' + err);
  }
}

module.exports = {
  getAllBooks,
  getSearchedBooks,
  addUser,
  getUserById,
  getUserByName,
  getUserByEmail,
  setRefreshToken,
  getRefreshToken,
  deleteRefreshToken,

};