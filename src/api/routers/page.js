const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
// const db = require("./../db/index");//封装好的数据库操作方法

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();


//商品列表页
Router.get('/', (req, res) => {

    let { page, qty } = req.query;  //解构  

    //console.log(page,qty)

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // // 使用某个集合
        let collecton = db.collection('goods');

        let num = qty * page;  //跳过数量
        //console.log(num)

        // //查一页的数据
        let data = await collecton.find().limit(Number(qty)).skip(num).toArray();

        //查全部返回长度
        let len = await collecton.find().toArray();
        len = len.length;
        //console.log(len.length)

        res.send({
            data,
            len,
            qty,
            page
        });

    });

});


//排序(升降序)
Router.get('/sorting', (req, res) => {
    let { page, qty, sorting } = req.query;  //解构  

    //console.log(page, qty, sorting)

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // // 使用某个集合
        let collecton = db.collection('goods');

        let num = qty * page;  //跳过数量
        //console.log(num)

        // //查一页的数据
        let data = await collecton.find().sort({ goodId: Number(sorting) }).limit(Number(qty)).toArray();

        //查全部返回长度
        let len = await collecton.find().toArray();
        len = len.length;
        //console.log(len.length)

        res.send({
            data,
            len,
            qty,
            page
        });
    });

});


//排序()
Router.get('/sorting/page', (req, res) => {
    let { curr, qty, sorting } = req.query;  //解构  

    console.log(curr, qty, sorting)
    //res.send(req.query);

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // // 使用某个集合
        let collecton = db.collection('goods');

        let num = qty * curr;  //跳过数量
        

        let data = await collecton.find().sort({ goodId: Number(sorting) }).limit(Number(qty)).skip(num).toArray();


       
        

        // //查全部返回长度
        let len = await collecton.find().toArray();
        len = len.length;
        // //console.log(len.length)

        res.send({
            data,
            len,
            qty,
            curr
        });
    });

});





module.exports = Router;