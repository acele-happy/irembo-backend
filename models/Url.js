const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  longUrl: { type: String, required: true },
  alias: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
  clickCount: { type: Number, default: 0 },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Url = new mongoose.model("Url", urlSchema);
module.exports = Url;
