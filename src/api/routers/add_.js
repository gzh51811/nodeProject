const express=require('express');
const Router=express.Router();
const bodyParser=require('body-parser');
//引入封装的连接MongoDB函数
const db=require('../db');
const mongodb=require('mongodb');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
const jsonParser = bodyParser.json();

//接收js中add.js获取的前端数据
Router.post('/',jsonParser,urlencodedParser,async(req,res)=>{
    let _username=(req.body.dataid)*1;
    // console.log(_username)
        let name=await db.find('user',{dataid:_username});

        // console.log(name)
        res.send(name);
    // console.log(name);
})
module.exports=Router;