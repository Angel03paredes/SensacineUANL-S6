const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const multer = require('multer');
const {v4:uuidv4} = require('uuid');

require("./routes/passport");

const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/img'),
  filename: (req,file,cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase() );
  }
});


///////dbconetion
mongoose
  .connect("mongodb+srv://angel03ps:angel03ps123@cluster0.uco7o.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Mongodb connected"))
  .catch((err) => console.log(err));
///////dbconetion
app.set('port',process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/////////archivos estaticos
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
/////////midldlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ storage , dest:path.join(__dirname,'public/img'), limits: { fileSize: 100000000}}).single('file'));
app.use(session({
     secret: "secret",
      resave: true,
       saveUninitialized: false,
       rolling:true,
       cookie: { 
        secure: false,
        maxAge: 600000
    } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//////////////globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("message");
  res.locals.error = req.flash("error");
  res.locals.pagenotfound = req.flash("error404");
  res.locals.usuario = req.user || null;
  next();
});
////////////////////////////////////
/////////routes
app.use("/", routes);




//app.use(express.static('statics'));
app.listen(app.get('port'), () => {
  console.log("Start", path.join(__dirname, "views"));
  console.log(__dirname + "/public/css");
});

//npm run dev
