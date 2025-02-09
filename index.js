const express = require("express");
const mongoose = require("mongoose");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly} = require('./middlewares/auth');
 



const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")



const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

const uri = "mongodb+srv://KishanKumar:Hellgate297@cluster0.cksrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

  app.set("view engine" , "ejs");
  app.set('views',path.resolve("./views"));



app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);




app.get('/url/:shortId', async(req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId,
  },{ $push : {
    visitHistory : {
      timestamp : Date.now(),
    }
  }
}
);
 res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=>{
  console.log(`server started at ${PORT} `);
})