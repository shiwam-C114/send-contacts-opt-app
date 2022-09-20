// Vonage SDK for sending OTP
const Vonage = require('@vonage/server-sdk')
const fs = require('node:fs');
const path = require("path");

// creating vonage instance 
const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

// function to write message logs to the Msglogs.json file
function WriteToMsgLog(OTP, name, status) {

    // getting the path to Msglogs file
    let curPath = path.resolve("./") + '/public/Msglogs.json'

    // reading data first to get the prev state
    fs.readFile(path.resolve(curPath), (err, data) => {
        data = JSON.parse(data)

        // reversing twice to order msg the latest to the top 
        data.msglog.reverse()
        data.msglog.push({ msg: OTP, name: name, timestamp: Date(), status: status })
        data.msglog.reverse()
        data = JSON.stringify(data)
        fs.writeFile(curPath, data, 'utf-8', (err) => {
            console.log(err)
        })
    })
}

// function to handle request and response from the frontend
export default function handler(req, res) {

    //  destructuring name, phone, OTP from req.body
    let { name, phone_no, OTP } = req.body

    if (req.method == "POST") {
        const from = "me"
        const to = phone_no
        const text = `${name} your OTP is:${OTP}`
        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg:"internal server error" })
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");

                    // writing data to msg logger in case of message send.
                    WriteToMsgLog(OTP, name, "success")
                    res.json({ msg: "Message sent successfully." })
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    
                    // writing data to msg logger in case of message failed.
                    WriteToMsgLog(OTP, name, "failed")
                    res.json({ msg: responseData.messages[0] })
                }
            }
        })
    }
}
