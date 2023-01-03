const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const fileName = './data.json';
const file = require(fileName);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    
})

const jsonParser = express.json();

app.use(cors({
    origin: '*'
}));

app.post('/save', jsonParser, function (req, res) { //saving data from user
    if(!req.body) return res.sendStatus(400);

    saveToFile(req.body);
    console.log(req.body);
    res.json(req.body);
});

app.get('/load', function (req, res) { //loading data to user
    const userIP= req.query.ip;
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;

        let parsedFile = JSON.parse(data);
        res.send(parsedFile[userIP]);
    });
    
});

function saveToFile(jsonData)
{
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;

        let parsedFile = JSON.parse(data);
        parsedFile[jsonData["ip"]] = jsonData["htmlContent"];

        console.log(jsonData);

        fs.writeFile(fileName, JSON.stringify(parsedFile), function writeJSON(err) {
            if (err) return console.log(err);
           });
        
    });
    
}
