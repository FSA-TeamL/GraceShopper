"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

const faker = require("faker");
const Cart = require("../server/db/models/Cart");
const CartItem = require("../server/db/models/CartItem");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  for (let i = 1; i <= 20; i++) {

    let fakeProductName = faker.commerce.product();
    let fakeProductDescription = faker.commerce.productDescription();
    let fakerProductPrice = faker.commerce.price(1, 1000, 2);
    let fakerProductImageUrl = faker.image.nature(150, 150);

    await Product.create({
      name: fakeProductName,
      description: fakeProductDescription,
      price: fakerProductPrice,
      imageUrl: fakerProductImageUrl
    });
  }

  await Cart.create({
    id:1
  })
  await Cart.create({
    id:2
  })

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "user1@email.com", password: "password", addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234', cartId:1}),
    User.create({ username: "user2@email.com", password: "password", addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234', cartId:2}),
    User.create({ username: 'admin@email.com', password: 'password', isAdmin:true, addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234'})
  ]);


  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      user: users[0],
      admin: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
