const express = require('express');
const Router = express.Router();
const url = require('url');
const queryString = require('querystring');

// const db = require("./../db/index");//封装好的数据库操作方法

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



//商品列表页
Router.get('/', (req, res) => {

     //解构  
    //console.log(qty, page)
    
    
    let { id } = req.query;
    //console.log(id)
    
    
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // 使用某个集合
        let collecton = db.collection('goods');
        //查全部返回长度
        let len = await collecton.find({goodId:Number(id)}).limit(1).toArray();
       //console.log(len)
        res.send(len);  

    });
    

});




module.exports = Router;