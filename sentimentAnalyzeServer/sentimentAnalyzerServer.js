const express = require('express');
const app = new express();

app.use(express.static('client'))

require('dotenv').config()
const cors_app = require('cors');
app.use(cors_app());

const getNLUInstance = () => {
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
    const { IamAuthenticator } = require("ibm-watson/auth");

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: API_KEY,
        }),
        serviceUrl: API_URL,
    });

    return naturalLanguageUnderstanding;
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", async (req,res) => {
    const nlu = getNLUInstance();
    const response = await nlu.analyze({
        features: {
            emotion: {}
        },
        url: req.query.url
    });

    const emotions = Object.keys(response.result.emotion.document.emotion).map((emotion, i) => ({
        label: emotion,
        score: response.result.emotion.document.emotion[emotion]
    }));


    return res.send(emotions);
});

app.get("/url/sentiment", async (req,res) => {
    const nlu = getNLUInstance();
    const response = await nlu.analyze({
        features: {
            sentiment: {}
        },
        url: req.query.url
    });

    return res.send(response.result.sentiment.document.label);
});

app.get("/text/emotion", async (req,res) => {
    const nlu = getNLUInstance();
    const response = await nlu.analyze({
        features: {
            emotion: {}
        },
        text: req.query.text
    });

    const emotions = Object.keys(response.result.emotion.document.emotion).map((emotion, i) => ({
        label: emotion,
        score: response.result.emotion.document.emotion[emotion]
    }));

    return res.send(emotions);
});

app.get("/text/sentiment", async (req,res) => {
    const nlu = getNLUInstance();
    const response = await nlu.analyze({
        features: {
            sentiment: {}
        },
        text: req.query.text
    });

    return res.send(response.result.sentiment.document.label);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

