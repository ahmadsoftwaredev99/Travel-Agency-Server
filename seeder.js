const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();

const makeAdmin = async () => {
  await connectDB();
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user = new User({
      name: "rufaida",
      email: "rufaidasalman@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    if (user) {
      console.log(" User updated to admin:", user.email, user.role);
    } else {
      console.log("User not found");
    }

    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();
