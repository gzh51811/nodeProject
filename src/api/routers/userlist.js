const express=require('express');
const Router=express.Router();
const bodyParser=require('body-parser');
//引入封装的函数MongoDB
// const db=require('../db');

const mongodb=require('mongodb');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
const jsonParser = bodyParser.json();

Router.post('/',jsonParser,urlencodedParser,async(req,res)=>{
    //查询数据库里所有的数据
        let now=(req.body.num)*1;
        console.log(now)
        const MongoClient=mongodb.MongoClient;
           MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },async function(err,client){
               if(err) throw err;

               //连接数据库
               let db=client.db('weixiao');
               //使用集合
               let collecton=db.collection('user');
            //    console.log(collecton)
               let name=await collecton.find().limit(now).toArray()
        console.log(name)
        res.send(name);
    })
})
module.exports=Router;