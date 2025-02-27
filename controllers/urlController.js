const { jwtDecode } = require("jwt-decode");
const Url = require("../models/Url");
require("dotenv").config();
const cron = require("node-cron");

exports.text = async (req, res) => {
  return res.send("Helloo brotherr");
};
const generateRandom = () => {
  const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  return randomNumber;
};

const generateUniqueAlias = async () => {
  let uniqueAlias;
  do {
    uniqueAlias = generateRandom();
  } while (await Url.findOne({ alias: uniqueAlias }));
  return uniqueAlias;
};

exports.shorten = async (req, res) => {
  const longUrl = req.body.longUrl;
  const customAlias = req.body.customAlias;
  const userId = req.params.id.split(":")[1];
  try {
    if (customAlias) {
      const existingUrl = await Url.findOne({ alias: customAlias });
      if (existingUrl) {
        return res.status(409).send("Custom alias already exists");
      }
      const newurl = await new Url({ userId, longUrl, alias: customAlias });
      await newurl.save();
      return res.status(200).send({
        shortUrl: `http://shorturl/${newurl.alias}`,
      });
    } else {
      //   const uniqueAlias = generator.nextId().toString();
      const uniqueAlias = await generateUniqueAlias();
      const url = await new Url({ userId, longUrl, alias: uniqueAlias });
      await url.save();

      res.status(200).send({
        shortUrl: `http://shorturl/${uniqueAlias}`,
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.redirect = async (req, res) => {
  const alias = req.params.alias.split(":")[1];
  //   const / = re
  try {
    const url = await Url.findOne({ alias });

    if (url) {
      url.clickCount = url.clickCount + 1;
      await url.save();
      return res.status(200).send(url.longUrl); // Redirect to the original URL
    } else {
      return res.status(404).send("Alias not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.getUrlsByUserId = async (req, res) => {
  const userId = req.params.id.split(":")[1];
  try {
    const urls = await Url.find({ userId: userId }).sort({ createdAt: -1 });
    return res.status(200).send(urls);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// function cronDefinition() {

// }

// Cron job to delete expired URLs every day
cron.schedule("0 0 * * *", async () => {
  try {
    // Find and delete expired URLs
    await Url.deleteMany({ expiresAt: { $lte: new Date() } });
    console.log("Expired URLs deleted successfully");
  } catch (err) {
    console.error("Error deleting expired URLs:", err);
  }
});
