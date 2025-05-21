require("dotenv").config();
let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let categorieCtrl = require("./Controllers/CatgCtrl");

let app = express();

let mongoose = require("mongoose");
app.use(express.json());
app.use(
  cors({
    origin: process.env.url_front,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API !");
});

app.use(cookieParser());
app.use(bodyParser.json());

//importation admin Model
const adminModel = require("./models/AdminModel");

//importation Router
const adminRouter = require("./routes/Admin.Routers");
let catgRouter = require("./routes/Catg.Routers");
let produitsRouter = require("./routes/Produit.Routers");

app.use("/api", catgRouter);
app.use("/api", adminRouter);
app.use("/api", produitsRouter);

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    mongoose.connect(process?.env?.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB:", error);
    process.exit(1); // Arrête l'application en cas d'erreur
  }
}; // Appelle la fonction pour établir la connexion

// mongoose.connect(
//   process?.env?.mongo_url,

//   (error) => {
//     let db = mongoose.connection;
//     if (error) {
//       db.on("error", console.log.bind(console), "MongoDb error connection");
//     } else {
//       console.log("connect to MongoDb");
//     }
//   }
// );

//create admin if not exixte
let createAdmin = async () => {
  try {
    let findAdmin = await adminModel.findOne();
    console.log("finded admin: ", findAdmin);
    if (!findAdmin) {
      let passe = "admin@1234";
      let passwordHash = await bcrypt.hash(passe, 10);
      await adminModel.create({
        nom: "admin",
        email: "admin@gmail.com",
        password: passwordHash,
        role: "admin",
      });
    }
  } catch (error) {
    console.error("error:", error);
  }
};
connectDB()
  .then(createAdmin)
  .catch((error) => console.log(error));

let port = process?.env?.port || 3200;

app.listen(port, () => {
  console.log(`Server running at :${port}/`);
});
