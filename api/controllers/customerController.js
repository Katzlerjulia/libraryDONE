const { getAllCustomers, editCustomer, getCustomerByKeyword, addCustomer, deleteCustomer } = require("../repositories/customerRepository");

async function get(req, res) {

    let data = await getAllCustomers();

    return res.json(data);
}

async function search(req, res) {

    let data = await getCustomerByKeyword(req.query.keyword, req.query.type);

    console.log(data);

    return res.json(data);
}

// function för att UPDATE en bok

async function edit(req, res) {
  await editCustomer(
    req.body.customerId,
    req.body.firstName, // title
    req.body.lastName, // author
    req.body.publicationYear,
    req.body.genre
  );

  res.sendStatus(200);
}

// lägger till add function (har även lagt till addCustomer i require raden)

async function add(req, res) {
  console.log(req.body);

  await addCustomer(req.body.firstName, req.body.lastName, req.body.publicationYear, req.body.genre);
}

// DELETE function
async function remove(req, res) {
  await deleteCustomer(req.body.customerId);
}

module.exports = {
    get,
    edit,
    search,

  add,
  remove

}
