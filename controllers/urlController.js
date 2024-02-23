const Url = require("../models/Url");
require("dotenv").config();
const cron = require('node-cron');

exports.text = async (req, res) => {
  return res.send("Helloo brotherr");
};
const generateRandom = ()=>{
  const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return randomNumber;
}

const generateUniqueAlias =async()=> {
  let uniqueAlias;
  do {
      uniqueAlias = generateRandom();
  } while (await Url.findOne({ alias: uniqueAlias }));
  return uniqueAlias;
}

exports.shorten = async (req, res) => {
  const longUrl = req.body.longUrl;
  const customAlias = req.body.customAlias;
  try {
    let alias;
    if (customAlias) {
      const existingUrl = await URL.findOne({ alias: customAlias });
      if (existingUrl) {
        return res.status(409).json({ error: "Custom alias already exists" });
      }
      alias = customAlias;
      return res
        .status(200)
        .send({ shortUrl: `http://localhost:${process.env.PORT}/${alias}` });
    } else {
      //   const uniqueAlias = generator.nextId().toString();
      const uniqueAlias = await generateUniqueAlias()
      if(await Url.findOne({alias: uniqueAlias})){
        uniqueAlias = generateRandom()
      }
      const url = await new Url({ longUrl, alias:uniqueAlias });
      await url.save();

      res.status(200).send({
        shortUrl: `http://localhost:${process.env.PORT}/${uniqueAlias}`,
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.redirect = async (req, res) => {
  const alias = req.params.alias.split(':')[1];
  //   const / = re
  try {
    const url = await Url.findOne({ alias });
    console.log(url +"urrr")
    if (url) {
      url.clickCount= url.clickCount++;
      await url.save();
      return res.redirect(301, url.longUrl); // Redirect to the original URL
    } else {
      return res.status(404).send("Alias not found");
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
};

// Cron job to delete expired URLs every day
cron.schedule("0 0 * * *", async () => {
  try {
    // Find and delete expired URLs
    await URL.deleteMany({ expiresAt: { $lte: new Date() } });
    console.log("Expired URLs deleted successfully");
  } catch (err) {
    console.error("Error deleting expired URLs:", err);
  }
});
