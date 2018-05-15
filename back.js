var express = require('express');
var app = express();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var currentAmount = '25'; //in grams
var currentInterval = '30'; //dispense interval in minutes

app.set('view engine', 'ejs')

const dispenseData = [
]

app.use(express.static("static"));

//implement dispense route and append to dispenseData

app.get('/', (req, res) => {
    res.render('home', { dispenseData: dispenseData })
})

app.post('/postData',urlencodedParser, (req, res) => {
  currentAmount = (req.body.amount || currentAmount);
  currentInterval = (req.body.interval || currentInterval);
  console.log(currentAmount);
  console.log(currentInterval);
  res.render('home', { dispenseData: dispenseData })
})

app.get('/interval', (req,res)=>{
  res.send(currentInterval);
}) 


app.get('/amount', (req,res)=>{
  res.send(currentAmount);
})

app.get('/dispense', (req, res) => {
  dispenseData.push({time: new Date(), amount: currentAmount});
  res.end();
})

app.listen(8080)