const db = require("../config/connection");
const { User } = require("../models");

const userSeed = require("./userSeeds.json");

db.once("open", async () => {
  
  await User.deleteMany({});

  const user = await User.create(userSeed);
  console.log(user);
  
  console.log("all done!");
  process.exit(0);
});
