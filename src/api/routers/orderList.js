const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

//编辑页请求渲染的数据
Router.get('/', (req, res) => {

    let { m } = req.query;
    //console.log(id)
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // 使用某个集合
        let collecton = db.collection('orderList');

        if (m == 'render') {
            let len = await collecton.find().toArray()
            //console.log(len)
            res.send(len);
        } else if (m == 'delete') {
            
            let { id } = req.query;
            id = id * 1;
            let len = await collecton.deleteOne({ id });
            res.send(len);
        }

        
    });

});


module.exports = Router;