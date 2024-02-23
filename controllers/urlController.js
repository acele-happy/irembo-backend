const Url = require("../models/Url");
// const { nanoid } = require ("nanoid");
const { v4: uuid4 } = require("uuid");
// const snowflake = require("snowflake-node");
require("dotenv").config();
const cron = require('node-cron');

// const generator = new snowflake.Snowflake({
//   mid: 1, // Machine ID (unique for each server or instance)
//   offset: (2022 - 1970) * 31536000 * 1000, // Start time (milliseconds since UNIX epoch)
// });

exports.text = async (req, res) => {
  return res.send("Helloo brotherr");
};

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
      const uniqueAlias = uuid4()
      const url = await new Url({ longUrl, uniqueAlias });
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
  const alias = req.params.alias;
  //   const / = re
  try {
    const url = Url.findOne({ alias });
    if (url) {
      url.clickCount++;
      await url.save();
      return res.redirect(301, url.longUrl); // Redirect to the original URL
    } else {
      return res.status(404).send("Alias not found");
    }
  } catch (err) {
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
