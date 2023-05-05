module.exports = class customer {
  constructor(firstName, email, loaned, available, publicationYear, genre, customerId, lastName ) {
    this.firstName = firstName;
    this.email = email;
    this.loaned = loaned;
    this.available = available;
   this.publicationYear = publicationYear; //ta bort dessa om det inte funka
   this.genre = genre; // och denna (eventuellt de nedanför också)
    this.customerId = customerId;
    this.lastName = lastName;
  }
}

// firstname är TITLE och email är AUTHOR för search
