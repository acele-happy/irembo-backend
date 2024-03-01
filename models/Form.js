const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    citizenship: { type: String, required: true },
    phone: { type: Number, required: true },
    province1: { type: String, required: true },
    businessType: { type: String, required: true },
    companyname: { type: String, required: true },
    TIN: { type: Number, required: true },
    date: { type: String, required: true },
    province2: { type: String, required: true },
    purpose: { type: String, required: true },
    productcategory: { type: String, required: true },
    weight: { type: String, },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    pname: { type: String, required: true },
    email: { type: String, required: true },
    NID: { type: String, },
    passport: { type: String },
});

const Form = new mongoose.model("Form", formSchema);
module.exports = Form;
