const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MySQL connection
console.log("Host:", JSON.stringify(process.env.DB_HOST));
console.log("User:", JSON.stringify(process.env.DB_USER));
console.log("Password length:", process.env.DB_PASSWORD?.length);
console.log("Database:", JSON.stringify(process.env.DB_NAME));
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("Connected to MySQL!");
});

// Booking API
app.post("/book", (req, res) => {

    const {
        name,
        email,
        phone,
        date,
        time,
        table,
        persons
    } = req.body;

    const sql = `
        INSERT INTO bookings
        (name, email, contact, booking_date, booking_time, table_number, guests)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, date, time, table, persons],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Booking failed"
                });
            }

            res.json({
                message: "Booking successful",
                bookingId: result.insertId
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});