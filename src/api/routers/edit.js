const express = require('express');
const Router = express.Router();
const url = require('url');
const queryString = require('querystring');
const bodyParser = require('body-parser');

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

//编辑页请求渲染的数据
Router.get('/', (req, res) => {

    let { id } = req.query;
    //console.log(id)
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // 使用某个集合
        let collecton = db.collection('goods');
        let len = await collecton.find({ goodId: Number(id) }).limit(1).toArray()  

       //console.log(len)
        res.send(len);  

    }); 

});


//编辑某一件商品
Router.post('/', jsonParser, urlencodedParser,(req, res) => {

    let { goodId, goods_name, originalPrice, salespPrice, classification, stock } = req.body;

    console.log(goodId, goods_name, originalPrice, salespPrice, classification, stock)
   
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库
        goodId = goodId * 1;
        //console.log(goodId)
        //使用某个集合
        let collecton = db.collection('goods');
        let len = await collecton.updateOne({ goodId }, { $set: { goodId, name: goods_name, nowPrice: Number(originalPrice), passPrice: Number(salespPrice), inventory: Number(stock), classification } });
   
        res.send("ok");

    });
   

});





module.exports = Router;