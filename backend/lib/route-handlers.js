import express from "express"
import multer from "multer"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import csrf from "csurf"
import cors from "cors"
import dotenv from "dotenv"
import { database } from "./persistent-database.js" // or use "./in-memory-database.js"
import path from "path"

const router = express.Router() // Create a router

/**
 * Mount Middleware
 */

// Public files, form data, JSON, CSRF protection, and CORS
router.use(express.static("public"))
router.use(express.static("uploads"))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(express.json())
router.use(cookieParser())
const csrfProtection = csrf({ cookie: true })
router.use(
  cors({
    origin: true, // Allows any origin
    credentials: true,
  })
)

// Configure for multi-part, form-based file uploads
const upload = multer({ dest: "uploads/" })

// configure for handling credentials stored in .env
dotenv.config()

/**
 * Route Definitions
 */

// Home route
router.get("/", async (req, res) => {
  try {
    const subscribers = await database.getSubscribers()
    res.render("home", { subscribers })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Subscribe route
router.get("/subscribe", csrfProtection, async (req, res) => {
  const csrfToken = req.csrfToken()
  try {
    const subscribers = await database.getSubscribers()
    res.render("subscribe", { csrfToken, subscribers })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Create subscriber route
router.post(
  "/subscribers/create",
  upload.single("avatar"),
  csrfProtection,
  async (req, res) => {
    console.log(req.body)
    let fileName = null
    if (req.file) {
      const ext = path.extname(req.file.originalname)
      fileName = `${req.file.filename}${ext}`
      const fs = await import("fs/promises")
      await fs.rename(req.file.path, path.join(req.file.destination, fileName))
    }
    const subscriberData = {
      ...req.body,
      portrait_img: fileName,
    }
    try {
      await database.addSubscriber(subscriberData)
      res.redirect("/")
    } catch (error) {
      console.error(error)
      res.status(500).send("Internal Server Error")
    }
  }
)

// Delete subscriber route
router.post("/subscribers/delete/:id", async (req, res) => {
  try {
    await database.removeSubscriber(req.params.id)
    res.redirect("/")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Favorite subscriber route
router.post("/subscribers/favorite/:id", async (req, res) => {
  try {
    await database.favoriteSubscriber(req.params.id)
    res.redirect("/")
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

// Route for CSRF token (when needed)
router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// API route to fetch movie data
router.get("/api/movies", async (req, res) => {
  const { title, year } = req.query

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${process.env.OMDB_API_KEY}`
    )
    const data = await response.json()

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error })
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie data" })
  }
})

export default router
