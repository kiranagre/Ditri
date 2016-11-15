var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['productlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/allproducts', function (req, res) {
  console.log('I received a GET request');
  db.productlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/productlist', function (req, res) {
  console.log(req.body);
  db.productlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/productlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.productlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/productlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.productlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/productlist/:id', function (req, res) {
  console.log("----",req.params);
  var id = req.params.id;
  console.log("??????????",req.body);
  db.productlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {companyName: req.body.companyName, productName: req.body.productName,batch:req.body.batch,ExDt:req.body.ExDt,
mrp:req.body.mrp,qty:req.body.qty,free:req.body.free,rate:req.body.rate,vat:req.body.vat}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");