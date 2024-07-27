const express = require('express');

const app = express();

const codes = require('./codes');
const regs = require('./regs');
const mamont = require('./mamont');
const fs = require('fs');


// functions
function RandomizeCode() {


  var text = "ZM-";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var LengthOfCode = 5 // put length of code lmao

  for (var i = 0; i < LengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  }

  return text;

}

function RandomizeUID() {


  var text = "";
  var possible = "0123456789";
  var LengthOfCode = 3 // put length of code lmao

  for (var i = 0; i < LengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  }

  return text;

}

function RandomizeBoostCode() {


  var text = "mamont-";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var LengthOfCode = 5 // put length of code lmao

  for (var i = 0; i < LengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  }

  return text;

}


app.get('/', (req, res) => {

  var randomized_code = RandomizeBoostCode()
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(ip != "p"){
    mamont[randomized_code] = {
    
    "ip": "no ip"
  }

  fs.writeFileSync(__dirname + "/mamont.json", JSON.stringify(mamont, null, 4));
  res.send("hi")
  console.log("urself log! ")
  }else{
    mamont[randomized_code] = {
    
    "ip": ip
  }

  fs.writeFileSync(__dirname + "/mamont.json", JSON.stringify(mamont, null, 4));
  res.send("hi")
  console.log("new log! " + randomized_code)
  }
  
  

});

// test

app.get('/pon', (req, res) => {
  res.send(' ')
  console.log(req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress)
  
});

app.get('/logss', (req, res) => {
  res.send('true')
  console.log(req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress)
  
});

// routes

app.get("/ext/boost-make-code", (req, res) => {
var randomized_code = RandomizeCode()
  mamont[randomized_code] = {
    "ip": req.headers['x-forwarded-for'] || req.connection.remoteAddress
  }

  fs.writeFileSync(__dirname + "/codes.json", JSON.stringify(codes, null, 4));
  res.send()

})

app.get("/ext/make-code/:nefr", (req, res) => {
  var nefr = req.params.nefr
  var randomized_code = RandomizeCode()
  var randomized = RandomizeUID()
  codes[randomized_code] = {
    "name": nefr,
    "UID": randomized,
    "days": "30",
    "premium": "false",
    "scripts": "false"
  }

  fs.writeFileSync(__dirname + "/codes.json", JSON.stringify(codes, null, 4));
  res.send(randomized_code)


})

app.get("/ext/validate-code/:code", (req, res) => {
  var code = req.params.code

  if (!codes.hasOwnProperty(code)) return res.send("false")
  regs[code] = {
    "last login": new Date(),
    "last ip": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    "logined from": req.headers['user-agent']
  }
  fs.writeFileSync(__dirname + "/regs.json", JSON.stringify(regs, null, 4));
  console.log(code + " has logged in!")
  res.send("true")
  
  
});

app.get("/vs/name/:code", (req, res) => {
  var code = req.params.code

  res.send(codes[code].name)
  
  
  
});

app.get("/vs/days/:code", (req, res) => {
  var code = req.params.code

  res.send(codes[code].days)
  
  
  
});

app.get("/vs/premium/:code", (req, res) => {
  var code = req.params.code

  res.send(codes[code].premium)
  
  
  
});

app.get("/vs/script/:code", (req, res) => {
  var code = req.params.code

  res.send(codes[code].scripts)
  
  
  
});

app.get("/vs/uid/:code", (req, res) => {
  var code = req.params.code

  res.send(codes[code].uid)
  
  
  
});

app.listen(3000, () => {
  console.log('server started');
});