const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();
app.use(express.json());
//app.use(cors());





app.use(
  cors({
    // origin included of localhost 127.0.0.1
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

const userModel = require("./DummySchema");
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO).then(console.log("db connected"));




const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          // User is authenticated; proceed to the next middleware or route
          req.user = decoded; // Attach user data to the request object
          next();
        } 
      });
    }
  };

app.get('/hello', verifyuser, (req, res) => {
    // Assuming you have access to user data (e.g., from a database)
    const { name, email } = req.user; // Extract user data from the request
    res.json({ name, email }); // Send the user data as JSON
  });


  app.post("/login",[
   

    // Validate email (valid email format)
    check("email").isEmail().withMessage("Invalid email"),

    // Validate password (min 8 characters)
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ], (req, res) => {
    const { email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ name: user.name ,email:user.email}, "jwt-secret-key", {
              expiresIn: "1h",
            });


            res.cookie("token", token, { httpOnly: true,sameSite:true });
            return res.json({status:true,token});

          } else {
            return res.json({status:false});
          }
        });
      } else {
        return res.json({status:false});
      }
    });
  });
  
  

  //news api 

  app.get('/api/news', async (req, res) => {
    const { location, category, pageSize } = req.query;
  
    // Validate input parameters
    if (!location || !category || !pageSize) {
      return res.status(400).json({ error: 'Missing required parameters: location, category, or pageSize' });
    }
  
    try {
      // Construct the NewsAPI URL with dynamic parameters
      const url = `https://newsapi.org/v2/top-headlines?country=${location}&category=${category}&pageSize=${(pageSize * 3) + 6}&apiKey=${process.env.NEWS_API_KEY}`;
      
      // Fetch data from NewsAPI
      const response = await axios.get(url);
      
       
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).send('Error fetching news');
    }
  });



  app.get('/getbookmarks',verifyuser, async (req, res) => {
    try {
      const  username  =  req.user.name;
      
      // Find the user by name
      const user = await userModel.findOne({ name : username});
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Send back the user's bookmarks
      res.json(user.bookmarkdata);
      
    } catch (error) {
      console.error("Error retrieving bookmark data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  app.post("/insbookmark",verifyuser, async (req, res) => {
    try {
       
      const { name,title, author, imagesrc, link, description } = req.body;
  
      // Find the user by username
      const user = await userModel.findOne({ name });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the bookmark already exists
      const existingBookmark = user.bookmarkdata.find(
        (bookmark) =>
          bookmark.title === title &&
          bookmark.author === author &&
          bookmark.link === link
      );
  
      if (existingBookmark) {
        return res.json({bk : "bookmark already exist"});
      
      }
  
      // Push the new bookmark data into the array
      user.bookmarkdata.push({ title, author, imagesrc, link, description });
  
      // Save the updated user
      await user.save();
  
      res.json({ name, title, author, imagesrc, link, description });
    } catch (error) {
      console.error("Error saving bookmark data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


/*
const verifyuser = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded =  await jwt.verify(token,'jwt-secret-key');
    req.user = decoded.user
    next()
  } catch (err) {
    return res.json(err);
  }
}; */

app.get("/getprofile", verifyuser, async (req, res) => {
  try {
    const name = req.user.name; // Assuming 'name' is set by the verifyuser middleware

    // Find the user by name
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back the user's pagesize and location
    res.json({ pagesize: user.pagesize, location: user.location });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.post('/updateprofile', verifyuser, async (req, res) => {
 
  try {
    const { pagesize, location } = req.body;
    const name = req.user.name; // Assuming 'name' is set by the verifyuser middleware

    // Find the user by name
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's pagesize and location
    user.pagesize = pagesize;
    user.location = location;

    // Save the updated user
    await user.save();

    res.json({ name, pagesize, location });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post(
  "/register",
  [
    // Validate name (not empty)
    check("name").notEmpty().withMessage("Name is required"),

    // Validate email (valid email format)
    check("email").isEmail().withMessage("Invalid email"),

    // Validate password (min 8 characters)
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  (req, res) => {
    const { name, email, password } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hash the password
    userModel.findOne({ email: email }).then((existingUser) => {
      if (existingUser) {
        // Email already exists
        return res.json({ message: "Email already registered" });
      } 
      else {
        bcrypt
        .hash(password, 10)
        .then((hash) => {
          userModel
            .create({ name, email, password: hash })
            .then((user) => res.json({ message: "Registration successful" }))
            .catch((err) => res.status(500).json({ error: err.message }));
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  }).catch((err) => {
 
    res.json({ error: err.message });
  });
}
);



app.get('/', (req, res) => {
  res.json({ message: 'Server for newswave is running perfectly!  😊👍' });
});




// Assuming you have an endpoint for deleting bookmarks, e.g., "/deletebookmark"
app.delete("/deletebookmark", verifyuser, async (req, res) => {
  try {
    const { name, title, author, link } = req.body;

    // Find the user by username
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the bookmark exists
    const existingBookmarkIndex = user.bookmarkdata.findIndex(
      (bookmark) =>
        bookmark.title === title &&
        bookmark.author === author &&
        bookmark.link === link
    );

    if (existingBookmarkIndex === -1) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    // Remove the bookmark from the array
    user.bookmarkdata.splice(existingBookmarkIndex, 1);

    // Save the updated user
    await user.save();

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


 
app.listen(4515, () => {
  console.log("server is running : )");
});
