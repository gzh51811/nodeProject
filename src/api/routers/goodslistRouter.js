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
Router.post('/', urlencodedParser, jsonParser, (req, res) => {

    let { qty, page } = req.body;  //解构  
    //console.log(qty, page)

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库


        // 使用某个集合
        let collecton = db.collection('goods');

        //查一页的数据
        let data = await collecton.find().limit(Number(qty)).toArray();

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

//页数请求
// Router.get('/', (req, res) => {
//     MongoClient.connect("mongodb://localhost:27017", function (err, client) {
//         if (err) throw err;
//         let db = client.db('xiaoming'); //连接数据库
//         // 使用某个集合
//         let collecton = db.collection('goods');
//         //查
//         collecton.find().toArray((err, data) => {
//             client.close();

//             res.send(data.length);

//         });

//     });
// });




// //列表页中某类
// Router.get('/:category', (req, res) => {
//     let sql = `SELECT * FROM user where username='${req.params.category}'`;

//     db.query("SET NAMES 'utf8'; " + sql, (err, data) => {
//         if (err) {
//             //res.send(formatData({ code: 100, data: err }));
//             return;
//         }
//         // res.send(formatData({ data }))
//         console.log(data)
//         res.send(data);
//     });
// });



module.exports = Router;