const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create the uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tarlacmedsocietydb"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log("Connected to MySQL database");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// GET endpoint to fetch all news
app.get("/api/news", (req, res) => {
    const sql = "SELECT * FROM news ORDER BY date_published DESC";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching news:", err);
            return res.status(500).json({ error: "Error fetching news" });
        }
        
        // Map the results to include proper image URLs
        const newsWithImages = result.map(news => ({
            ...news,
            // If image exists, ensure it's the full URL
            image: news.image ? news.image : null
        }));
        
        res.json(newsWithImages);
    });
});

// POST endpoint to add news
app.post("/api/news", upload.single("image"), (req, res) => {
    const { title, summary, content, date_published } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO news (title, image, summary, content, date_published) 
                VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [title, image, summary, content, date_published], (err, result) => {
        if (err) {
            console.error("Error adding news:", err);
            return res.status(500).json({ error: "Error saving news: " + err.message });
        }
        res.json({ message: "News added successfully", id: result.insertId });
    });
});

// DELETE endpoint to remove news
app.delete("/api/news/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM news WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting news:", err);
            return res.status(500).json({ error: "Error deleting news" });
        }
        res.json({ message: "News deleted successfully" });
    });
});

// PUT endpoint to update news
app.put("/api/news/:id", upload.single("image"), (req, res) => {
    const id = req.params.id;
    const { title, summary, content, date_published } = req.body;
    const image = req.file ? req.file.filename : null;

    let sql = `UPDATE news SET title = ?, summary = ?, content = ?, date_published = ?`;
    const values = [title, summary, content, date_published];

    if (image) {
        sql += `, image = ?`;
        values.push(image);
    }

    sql += ` WHERE id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating news:", err);
            return res.status(500).json({ error: "Error updating news" });
        }
        res.json({ message: "News updated successfully" });
    });
});

// GET activities
app.get("/api/activities", (req, res) => {
    const sql = `
        SELECT a.*, GROUP_CONCAT(ai.image_url) as images 
        FROM activities a 
        LEFT JOIN activity_images ai ON a.id = ai.activity_id 
        GROUP BY a.id 
        ORDER BY a.date DESC, a.time DESC
    `;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).json({ error: "Error fetching activities" });
        }
        
        // Process the results to format images array
        const activities = result.map(activity => ({
            ...activity,
            images: activity.images ? activity.images.split(',') : []
        }));
        
        res.json(activities);
    });
});

// POST new activity
app.post("/api/activities", upload.array("images"), (req, res) => {
    const { title, date, time, organizer, venue } = req.body;
    const images = req.files;

    db.beginTransaction(async (err) => {
        if (err) {
            return res.status(500).json({ error: "Error starting transaction" });
        }

        try {
            // Insert activity
            const [activityResult] = await db.promise().query(
                "INSERT INTO activities (title, date, time, organizer, venue) VALUES (?, ?, ?, ?, ?)",
                [title, date, time, organizer, venue]
            );

            // Insert images
            if (images && images.length > 0) {
                const imageValues = images.map(file => [
                    activityResult.insertId,
                    file.filename
                ]);

                await db.promise().query(
                    "INSERT INTO activity_images (activity_id, image_url) VALUES ?",
                    [imageValues]
                );
            }

            await db.promise().commit();
            res.json({ message: "Activity added successfully", id: activityResult.insertId });
        } catch (error) {
            await db.promise().rollback();
            console.error("Error adding activity:", error);
            res.status(500).json({ error: "Error saving activity" });
        }
    });
});

// DELETE activity
app.delete("/api/activities/:id", (req, res) => {
    const id = req.params.id;
    
    db.query("DELETE FROM activities WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting activity:", err);
            return res.status(500).json({ error: "Error deleting activity" });
        }
        res.json({ message: "Activity deleted successfully" });
    });
});

// PUT (update) activity
app.put("/api/activities/:id", upload.array("images"), (req, res) => {
    const id = req.params.id;
    const { title, date, time, organizer, venue } = req.body;
    const images = req.files;

    db.beginTransaction(async (err) => {
        if (err) {
            return res.status(500).json({ error: "Error starting transaction" });
        }

        try {
            // Update activity
            await db.promise().query(
                "UPDATE activities SET title = ?, date = ?, time = ?, organizer = ?, venue = ? WHERE id = ?",
                [title, date, time, organizer, venue, id]
            );

            // If new images are uploaded, replace old ones
            if (images && images.length > 0) {
                await db.promise().query("DELETE FROM activity_images WHERE activity_id = ?", [id]);
                
                const imageValues = images.map(file => [
                    id,
                    file.filename
                ]);

                await db.promise().query(
                    "INSERT INTO activity_images (activity_id, image_url) VALUES ?",
                    [imageValues]
                );
            }

            await db.promise().commit();
            res.json({ message: "Activity updated successfully" });
        } catch (error) {
            await db.promise().rollback();
            console.error("Error updating activity:", error);
            res.status(500).json({ error: "Error updating activity" });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
