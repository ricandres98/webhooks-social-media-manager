import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (request, response) => {
    response.send("Hola mundo");
});

app.listen(port, () => {
    console.log("corriendo en el puerto " + port);
});

app.get("/webhooks", (req, res) => {
    const query = req.query;
    const hubMode = query["hub.mode"];
    const hubChallenge = query["hub.challenge"];
    const hubVerifyToken = query["hub.verify_token"];
    console.log(query)

    const verifyToken = process.env.VERIFY_TOKEN;

    if(hubVerifyToken === verifyToken) {
        res.status(200).json({
            "hub.challenge": hubChallenge,
        });
    } else {
        res.status(400).send({
            error: "Invalid token"
        });
    }
});

app.post("/", (req, res) => {
    const { body } = req;

    res.status(200).json(body);
})