import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "real_estate"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// 🔹 Register API
app.post("/register", async (req, res) => {
    const { full_name, email, phone, password, user_type } = req.body;

    if (!full_name || !email || !phone || !password || !user_type) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (full_name, email, phone, password_hash, user_type) VALUES (?, ?, ?, ?, ?)`;

        db.query(sql, [full_name, email, phone, hashedPassword, user_type], (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });

            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user.id, email: user.email, user_type: user.user_type }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
