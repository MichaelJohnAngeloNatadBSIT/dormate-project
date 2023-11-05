const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");


const app = express();

global.__basedir = __dirname;

// origin: "http://localhost:8081",  origin: "http://192.168.1.178:8081", 192.168.1.209   origin: "http://localhost:8081",
var corsOptions = {

  origin: ["http://192.168.1.178:8081", "http://localhost:8081"],
  credentials: true
};

app.use(cors(corsOptions));

// const initRoutes = require("./app/routes");

// initRoutes(app); 

// parse requests of content-type - application/json
app.use(express.json());

// Make "public" Folder Publicly Available
app.use("/public", express.static("public"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// initRoutes(app);

app.use(
  cookieSession({
    name: "dormate-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to e-Tech application." });
});

//routes
require("./app/routes/dorm.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/index')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
// const HOSTNAME = "192.168.1.178";
app.listen( PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount( async (err, count) => {
      try{
        if (!err && count === 0) {
          new Role({
            name: "user"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
          });
    
          new Role({
            name: "landlord"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'landlord' to roles collection");
          });
    
          new Role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
          });
        }
      } catch (err) {
        console.log(err);
      }

    });
  }


  

