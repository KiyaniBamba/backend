const router = require("express").Router();
const { generateToken } = require("../utils");
const User = require("./user-model");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  if (user) {
    const token = generateToken(user);

    res.status(200).json({
      message: `Welcome ${username}`,
      token
    });
  } else {
    res.status(401).json({ error: "invalid username or password" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.add(req.body);
    res.status(201).json(user);
  } catch ({ message, status }) {
    res.status(status || 500).json({ error: message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
