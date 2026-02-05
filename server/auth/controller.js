const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const authService = require("./service");

const SALT_ROUNDS = 12;

async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid input"
      });
    }
    
    const { username, email, password } = req.body;

    const existing = await authService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingUser = await authService.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await authService.createUser(username, email, hash);

    res.status(201).json({
    message: "User created",
    user: {
    id: user.id,
    username: user.username
  }
});
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({ message: "User already exists" });
      }
      next(err);
    }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role, 
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login success", token });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      points: user.points ?? 0
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
