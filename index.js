const express = require("express");
const urlRoute = require("./routes/url");
const mongoose = require("mongoose");
const URL = require("./models/url");
 
const app = express();
const PORT = 8000;
app.use(express.json());

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

app.use("/url", urlRoute);
app.get('/:shortId', async(req,res)=>{
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