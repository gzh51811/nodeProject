const express=require('express');
const Router=express.Router();

const db1=require('../db');
// const bodyParser=require('body-parser');
// //引入封装的函数MongoDB
// // const db=require('../db');

const mongodb=require('mongodb');

// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
// const jsonParser = bodyParser.json();


Router.get('/',async(req,res)=>{
        //所有用户
        // res.send("222")
        let users=await db1.find('user');
        let index=(req.query.index)*1;
        // console.log(111)
        let _num=(req.query.limit)*1;
        let page=(index-1)*_num;
        console.log(0)
        // console.log(_index,_num)
        const MongoClient=mongodb.MongoClient;
        MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },async function(err,client){
            if(err) throw err;

            //连接数据库
            let db=client.db('weixiao');
            //使用集合
            let collecton=db.collection('user');
         //    console.log(collecton)
            let name1=await collecton.find().skip(page).limit(_num).toArray()
            // let name2=await collecton.find().limit(_num).toArray()
            //  console.log(name)
  
        // db.test.find({}).sort({"amount":1}).skip(10).limit(_num)//这里忽略掉查询语句
        // console.log(a);
        //总条数
        let total=users.length;
        // console.log(total)
        res.send({total,name1});
    })


})
module.exports=Router;