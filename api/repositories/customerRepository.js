const customerModel = require("../models/customerModel");
const db_context = require("../db_context");

async function getAllCustomers() {

    let customers = [];

    let data = await db_context.selectAllCustomers()

    data.forEach(customer => {
        customers.push(new customerModel(customer.title, customer.author, customer.loaned, customer.available))
    });

    return customers;
};

// lägger till add function

async function addCustomer(firstName, lastName, publicationYear, genre) {

    db_context.insertCustomer(firstName, lastName, publicationYear, genre);
};

async function getCustomerByKeyword(keyword, type) {

    let customers = [];

    let data = await db_context.selectCustomerByKeyword(keyword, type)

    data.forEach(customer => {
        customers.push(new customerModel(customer.title, customer.author, customer.loaned, customer.available)) // title har first name och author har email
    });

    return customers;
};

// edit customer function

async function editCustomer(customerId, firstName, lastName, publicationYear, genre) {

    db_context.updateCustomer(customerId, firstName, lastName, publicationYear, genre);
};

// DELETE
async function deleteCustomer(customerId) {

    db_context.deleteCustomer(customerId);
};



module.exports = {
  getAllCustomers,
  editCustomer,
  getCustomerByKeyword,
  addCustomer,
  deleteCustomer,
};
