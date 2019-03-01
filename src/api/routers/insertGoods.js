const express = require('express');
const Router = express.Router();
// const db = require("./../db/index");//封装好的数据库操作方法

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



//商品列表页
Router.get('/', (req, res) => {

    console.log(req.query)  //解构  
    //console.log(qty, page)
    let { goods_name, originalPrice, salespPrice, addTime, classification, stock, goods_content } = req.query;
    

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // 使用某个集合
        let collecton = db.collection('goods');
        //查全部返回长度
        let len = await collecton.find().toArray();
        len = len.length;

        let res = await collecton.insertOne({ goodId: len + 1, nowPrice: salespPrice, passPrice: originalPrice, inventory: stock, classification: classification, state: "online", addTime: addTime, name: goods_name, goods_content: goods_content });

    });
    res.send('yes');

});




module.exports = Router;