import { connect } from './dbConfig'
const sql = require('mssql');

const getAllBooks = async () => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName,Books.bookRatesAmount
    FROM Books
    JOIN Categories ON Categories.categoryId = Books.categoryId 
    WHERE Books.isArchived=0
    GROUP BY Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName, Books.isArchived, Books.bookRatesAmount`);

    return data.recordset;
  } catch (err) {
    console.log("Error from getAllBooks:" + err);
  }
};

const getArchivedBooks = async () => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName,Books.isArchived,Books.bookRatesAmount 
    FROM Books
    JOIN Categories ON Categories.categoryId = Books.categoryId
    WHERE Books.isArchived=1
    GROUP BY Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName, Books.isArchived,Books.bookRatesAmount`);

    return data.recordset;
  } catch (err) {
    console.log("Error from getAllBooksAdmin:" + err);
  }
};


const getSearchedBooks = async (searchString, year, price) => {
  try {
    const pool = await connect();


    const yearArray = year.split(',');
    const priceArray = price.split(',');



    const data = await pool.request().query(`SELECT Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName,Books.bookRatesAmount
    FROM Books
    JOIN Categories ON Categories.categoryId = Books.categoryId 
    WHERE (bookName LIKE '%${searchString}%' OR bookAuthor LIKE '%${searchString}%') AND bookYear>=${yearArray[0]} AND bookYear <=${yearArray[1]} AND bookPrice>=${priceArray[0]} AND bookPrice <=${priceArray[1]} AND Books.isArchived=0
    GROUP BY Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName, Books.isArchived, Books.bookRatesAmount`);





    return data.recordset;
  } catch (err) {
    console.log('Error from getSearchedBooks: ' + err);
  }
};

const getSearchedBooksAdmin = async (searchString, year, price) => {
  try {
    const pool = await connect();


    const yearArray = year.split(',');
    const priceArray = price.split(',');



    const data = await pool.request().query(`SELECT Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName,Books.isArchived,Books.bookRatesAmount
    FROM Books
    JOIN Categories ON Categories.categoryId = Books.categoryId 
    WHERE (bookName LIKE '%${searchString}%' OR bookAuthor LIKE '%${searchString}%') AND bookYear>=${yearArray[0]} AND bookYear <=${yearArray[1]} AND bookPrice>=${priceArray[0]} AND bookPrice <=${priceArray[1]}
    GROUP BY Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName, Books.isArchived, Books.bookRatesAmount`);





    return data.recordset;
  } catch (err) {
    console.log('Error from getSearchedBooks: ' + err);
  }
};

const addBook = async (book) => {

  try {
    const pool = await connect();
    console.log(book)
    const result = await pool
      .request()
      .input('bookName', book.bookName)
      .input('bookPrice', book.bookPrice)
      .input('bookRating', 0)
      .input('bookAuthor', book.bookAuthor)
      .input('bookYear', book.bookYear)
      .input('bookDescription', book.bookDescription)
      .input('bookImage', book.bookImage)
      .input('categoryId', book.categoryId)
      .input('isArchived', false)
      .input('bookRatesAmount', 0)
      .output('bookId', sql.Int)
      .query(`
      INSERT INTO Books (bookName, bookPrice, bookRating, bookAuthor, bookYear, bookDescription, bookImage, categoryId, isArchived,bookRatesAmount)
      OUTPUT inserted.bookId
      VALUES (@bookName, @bookPrice, @bookRating, @bookAuthor, @bookYear, @bookDescription,@bookImage,  @categoryId, @isArchived,@bookRatesAmount)
    `);

    const newBookId = result.recordset[0].bookId;
    return newBookId;

  } catch (err) {

    console.log('Error from addBook: ' + err);
  }
}

const addBookImage = async (dbImagePath, bookId) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()

      .input('bookImage', dbImagePath)
      .output('bookId', sql.Int)
      .query(`UPDATE Books 
      SET bookImage = @bookImage 
      OUTPUT INSERTED.bookId 
      WHERE bookId = ${bookId}`);

    const updatedBookId = result.recordset[0].bookId;
    return updatedBookId;

  } catch (err) {

    console.log('Error from addBookImage: ' + err);
  }
}

const getBookById = async (bookId) => {

  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Books.bookId, Books.bookName, Books.bookPrice, Books.bookRating, Books.bookAuthor, Books.bookYear, Books.bookDescription, Books.bookImage, Categories.categoryName, Books.isArchived,Books.bookRatesAmount 
    FROM Books
    JOIN Categories ON Categories.categoryId = Books.categoryId
    WHERE Books.bookId = ${bookId}`);

    return data.recordset;

  } catch (err) {

    console.log('Error from getBookById: ' + err);
  }
}


const updateBook = async (book) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()
      .input('bookName', book.bookName)
      .input('bookPrice', book.bookPrice)
      .input('bookRating', 0)
      .input('bookAuthor', book.bookAuthor)
      .input('bookYear', book.bookYear)
      .input('bookDescription', book.bookDescription)
      .input('bookImage', book.bookImage)
      .input('categoryId', book.categoryId)
      .output('bookId', sql.Int)
      .query(`
      UPDATE Books SET bookName = @bookName, bookPrice = @bookPrice, bookRating = @bookRating, bookAuthor = @bookAuthor, bookYear = @bookYear, bookDescription = @bookDescription, bookImage = @bookImage, categoryId = @categoryId
      OUTPUT INSERTED.bookId
WHERE bookId = ${book.bookId}
    `);

    const updatedBookId = result.recordset[0].bookId;
    return updatedBookId;

  } catch (err) {

    console.log('Error from updateBook: ' + err);
  }
}

const archiveBook = async (bookId, status) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()
      .input('isArchived', status)
      .output('bookId', sql.Int)
      .query(`
      UPDATE Books SET isArchived = @isArchived
      OUTPUT INSERTED.bookId
      WHERE bookId = ${bookId}
    `);

    const updatedBookId = result.recordset[0].bookId;
    return updatedBookId;

  } catch (err) {

    console.log('Error from archiveBook: ' + err);
  }
}


const getAllCategories = async () => {
  try {
    const pool = await connect();

    const data = await pool.request().query('SELECT * FROM Categories')

    return data.recordset;
  } catch (err) {
    console.log("Error from getAllCategories:" + err);
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

const getAllUsers = async (userId) => {

  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT Users.userId, Users.userName, Users.userEmail, Users.userImage,Users.passwordHash , Roles.roleName
    FROM Users
    JOIN Roles ON Users.roleId = Roles.roleId`);

    return data.recordset;

  } catch (err) {

    console.log('Error from getAllUsers: ' + err);
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


const getOrdersByUserId = async (userId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT 
    o.orderId, 
    o.userId, 
    o.bookId,
    b.bookName,
    b.bookPrice,
    b.bookRating,
    b.bookAuthor,
    b.bookYear,
    b.bookDescription,
    b.bookImage,
    b.categoryId,
    b.isArchived,
    b.bookRatesAmount
FROM 
    Orders o
JOIN 
    Books b ON o.bookId = b.bookId
WHERE 
    o.userId =${userId};`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getOrdersByUserId: ' + err);
  }
}

const getOrdersByUserIdAndBookId = async (userId, bookId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT 
    o.orderId, 
    o.userId, 
    o.bookId,
    b.bookName,
    b.bookPrice,
    b.bookRating,
    b.bookAuthor,
    b.bookYear,
    b.bookDescription,
    b.bookImage,
    b.categoryId,
    b.isArchived,
    b.bookRatesAmount
FROM 
    Orders o
JOIN 
    Books b ON o.bookId = b.bookId
WHERE 
    o.userId =${userId} AND o.bookId=${bookId};`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getOrdersByUserId: ' + err);
  }
}

const getAllOrders = async (userId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT  
    o.orderId, 
    o.userId, 
    u.userName, 
    o.bookId,
    b.bookName,
    b.bookPrice,
    b.bookRating,
    b.bookAuthor,
    b.bookYear,
    b.bookDescription,
    b.bookImage,
    b.categoryId,
    b.isArchived,
    b.bookRatesAmount
FROM 
    Orders o
JOIN 
    Books b ON o.bookId = b.bookId    
JOIN 
    Users u ON o.userId = u.userId;
`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getAllOrders: ' + err);
  }
}

const addOrder = async (userId, bookId) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()
      .input('userId', userId)
      .input('bookId', bookId)
      .output('orderId', sql.Int)
      .query(`
      INSERT INTO Orders (userId, bookId)
      OUTPUT inserted.orderId
      VALUES (@userId, @bookId)
    `);

    const newUserId = result.recordset[0].userId;
    return newUserId;

  } catch (err) {

    console.log('Error from addOrder: ' + err);
  }
}

const deleteOrder = async (orderId) => {
  try {
    const pool = await connect();

    await pool.request().query(`DELETE FROM Orders
    WHERE orderId = ${orderId};`);

  } catch (err) {

    console.log('Error from deleteOrder: ' + err);
  }
}

const getUserBooks = async (userId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT   
    ub.bookId,
    ub.userId,
    b.bookName,
    b.bookPrice,
    b.bookRating,
    b.bookAuthor,
    b.bookYear,
    b.bookDescription,
    b.bookImage,
    b.categoryId,
    b.isArchived,
    b.bookRatesAmount
FROM 
    UserBooks ub
JOIN 
    Books b ON ub.bookId = b.bookId
WHERE 
    ub.userId = ${userId};
`);

    return data.recordset;

  } catch (err) {
    console.log('Error from getUserBooks: ' + err);
  }
}

const deleteUserBook = async (userId, bookId) => {
  try {
    const pool = await connect();

    await pool.request().query(`DELETE FROM UserBooks
    WHERE bookId = ${bookId} AND userId= ${userId};`);

  } catch (err) {

    console.log('Error from deleteUserBook: ' + err);
  }
}

const searchUserBook = async (userId, bookId) => {
  try {
    const pool = await connect();

    const data = await pool.request().query(`SELECT * FROM UserBooks
    WHERE bookId = ${bookId} AND userId= ${userId};`);
    return data.recordset;
  } catch (err) {
    console.log('Error from searchUserBook: ' + err);
  }
}

const addUserBook = async (userId, bookId) => {

  try {
    const pool = await connect();

    const result = await pool
      .request()
      .input('bookId', bookId)
      .input('userId', userId)
      .query(`
      INSERT INTO UserBooks (bookId, userId)      
      VALUES (@bookId, @userId)
    `);


    return result;

  } catch (err) {

    console.log('Error from addUserBook: ' + err);
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
  getArchivedBooks,
  addBook,
  getAllCategories,
  updateBook,
  addBookImage,
  getBookById,
  getSearchedBooksAdmin,
  archiveBook,
  getOrdersByUserId,
  getAllOrders,
  deleteOrder,
  getUserBooks,
  deleteUserBook,
  addUserBook,
  addOrder,
  getOrdersByUserIdAndBookId,
  searchUserBook,
  getAllUsers
};