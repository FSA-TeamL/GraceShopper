"use strict";

const {
  db,
  models: { User, Product, Cart, CartItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  let plantNames = ["Agave Plant", "Azalea Bush", "Cactus", "Hibiscus", "Japanese Maple", "Marigold", "Orchid", "Rose Bush", "Sunflower", "Weeping Willow"];

  let plantDescriptions = ["Agave plant from southern Mexico", "Beautiful azalea bush with lovely spring blooms", "Hardy cactus needs minimal care", "Tropical hibiscus to remind you of the beach", "Japanese Maple to enhance your yard", "Marigolds to put around your garden", "Lovely orchid for the winter blues", "Classic red rose bush", "Sunflowers to brighten your day", "A graceful weeping willow"]

  let plantPrices = [23.99, 34.99, 21.99, 15.99, 81.99, 9.99, 12.99, 14.99, 14.99, 75.99];

  let plantImages = ["https://i.postimg.cc/qMCjpYHs/agave.png", "https://i.postimg.cc/vZrhVVBD/azalea.png", "https://i.postimg.cc/pLbkrZPg/cactus.png", "https://i.postimg.cc/mrVSdW7s/hibiscus.png", "https://i.postimg.cc/tRsLVBHT/maple.png", "https://i.postimg.cc/9fcptQRb/marigold.png", "https://i.postimg.cc/xCC3hpPb/orchid.png", "https://i.postimg.cc/dDMR7sc8/rose.png", "https://i.postimg.cc/1tjrQ0W7/sunflower.png", "https://i.postimg.cc/8cfBPF9p/willow.png"];

  for (let i = 0; i < plantNames.length; i++) {

    await Product.create({
      name: plantNames[i],
      description: plantDescriptions[i],
      price: plantPrices[i],
      imageUrl: plantImages[i]
    });
  }

  await Cart.create({
    id: 1
  })
  await Cart.create({
    id: 2
  })

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "user1@email.com", password: "password", addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234', cartId: 1 }),
    User.create({ username: "user2@email.com", password: "password", addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234', cartId: 2 }),
    User.create({ username: 'admin@email.com', password: 'password', isAdmin: true, addressLine1: '1 Main St.', city: 'New York', state: 'NY', zip: '12345-1234' })

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
