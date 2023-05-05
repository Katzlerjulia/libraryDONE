// require är saker som hämtas

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:juliasdatabas@localhost:5432/mylibrary')

async function selectAllCustomers() {

  let data = await db.many("SELECT * FROM mybooks") // detta kopplas med customerRepository.js och API-TEST.html

  return data;
}

// function för insert (add) customer för create
async function insertCustomer(firstName, lastName, publication_year, genre) {
  db.none(`INSERT INTO mybooks (title, author, publication_year, genre)
           VALUES ('${firstName}', '${lastName}',${publication_year}, '${genre}')`)
}

// function för UPDATE
// detta kan strula
// firstName är title, lastName är author,
async function updateCustomer(customerId, firstName, lastName, publicationYear, genre) {
  await db.none(
    `UPDATE mybooks
     SET title = '${firstName}', author = '${lastName}', publication_year = ${publicationYear}, genre = '${genre}'
     WHERE book_id = ${customerId}`
  );
}

async function deleteCustomer(customerId) {
  await db.none(`DELETE FROM mybooks WHERE book_id = ${customerId}`);
}

async function selectCustomerByKeyword(keyword, type) {
  // detta är kopplat till search.html och customerController.js
  let data = '';

  if (type === "title") {
    data = await db.any(
     `SELECT * FROM mybooks WHERE title LIKE '${keyword}%'`
    );
  } else {
    data = await db.any(
      `SELECT * FROM mybooks WHERE author LIKE '${keyword}%'`
    )
  }

  console.log(data);

  return data;
}



// detta är funktioner som exporteras till andra ställen

module.exports = {
  selectAllCustomers,
  selectCustomerByKeyword,
  insertCustomer,
  updateCustomer,
  deleteCustomer
};
