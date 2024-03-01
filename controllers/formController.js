const { sendEmail } = require("../utils/email");
const Form = require("../models/Form");

exports.sendPayload = async(req, res) => {
    const data = req.body;

    try {
        const newForm = await new Form(data).save();
        sendEmail(req.body.email, "Your Data From Irembo Form", JSON.stringify(data));
        return res.status(201).send(newForm);
    } catch (err) {
        return res.status(500).send(err);
    }

};
