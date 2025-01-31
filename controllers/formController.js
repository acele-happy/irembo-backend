const { sendEmail } = require("../utils/email");
const Form = require("../models/Form");

function getEmailTemplate(data) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>User Information</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                background: #ffffff;
                margin: 20px auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background: #007bff;
                color: white;
                text-align: center;
                padding: 10px;
                font-size: 20px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .email-body {
                padding: 20px;
                font-size: 16px;
                color: #333;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            .data-table th, .data-table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            .data-table th {
                background-color: #007bff;
                color: white;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">User Information</div>
            <div class="email-body">
                <p>Hello,</p>
                <p>Here are the details you provided:</p>
                <table class="data-table">
                    <tr><th>Field</th><th>Value</th></tr>
                    <tr><td>Citizenship</td><td>${data.citizenship || 'N/A'}</td></tr>
                    <tr><td>Phone</td><td>${data.phone || 'N/A'}</td></tr>
                    <tr><td>Province</td><td>${data.province1 || 'N/A'}</td></tr>
                    <tr><td>Business Type</td><td>${data.businessType || 'N/A'}</td></tr>
                    <tr><td>Company Name</td><td>${data.companyname || 'N/A'}</td></tr>
                    <tr><td>TIN</td><td>${data.TIN || 'N/A'}</td></tr>
                    <tr><td>Date</td><td>${data.date || 'N/A'}</td></tr>
                    <tr><td>Product Category</td><td>${data.productcategory || 'N/A'}</td></tr>
                    <tr><td>Weight</td><td>${data.weight || 'N/A'}</td></tr>
                    <tr><td>Unit</td><td>${data.unit || 'N/A'}</td></tr>
                    <tr><td>Quantity</td><td>${data.quantity || 'N/A'}</td></tr>
                    <tr><td>Description</td><td>${data.description || 'N/A'}</td></tr>
                    <tr><td>Product Name</td><td>${data.pname || 'N/A'}</td></tr>
                    <tr><td>Email</td><td>${data.email || 'N/A'}</td></tr>
                    <tr><td>NID</td><td>${data.NID || 'N/A'}</td></tr>
                    <tr><td>Passport</td><td>${data.passport || 'N/A'}</td></tr>
                </table>
                <p>If any of this information is incorrect, please contact us.</p>
            </div>
            <div class="footer">
                Thank you,<br>
                <strong>Irembo</strong>
            </div>
        </div>
    </body>
    </html>
    `;
}


exports.sendPayload = async(req, res) => {
    const data = req.body;

    try {
        const newForm = await new Form(data).save();
        sendEmail(req.body.email, "Your Data From Irembo Form", getEmailTemplate(data));
        return res.status(201).send(newForm);
    } catch (err) {
        return res.status(500).send(err);
    }

};
