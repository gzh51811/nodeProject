const express=require('express');
const Router=express.Router();
const bodyParser=require('body-parser');

//引入有封装了MongoDB的函数
const db1=require('../db');
const mongodb=require('mongodb');
let urlencodedParser=bodyParser.urlencoded({
    extended:false
});
// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
const jsonParser=bodyParser.json();
Router.post('/',jsonParser,urlencodedParser,async (req,res)=>{
    //使用premise对象
    let _username=req.body.delete;
    // console.log(_username)
        let name=await db1.find('user',{username:_username})
        console.log(22);
        if(name.length){
           const MongoClient=mongodb.MongoClient;
           MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },function(err,client){
               if(err) throw err;

               //连接数据库
               let db=client.db('weixiao');
               //使用集合
               let collecton=db.collection('user');
               //删除
               collecton.remove({username:_username})
           })
        //    db.delete('user',{usrname:{$in:[_username]}})
        }

});
module.exports=Router;
