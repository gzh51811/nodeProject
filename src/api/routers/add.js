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
Router.post('/',jsonParser,urlencodedParser,(req,res)=>{
    //获取传过来的数据
    let _username=req.body.username;
    // console.log(req.body.username)
    let _password=req.body.password;
    let _telephone=req.body.telephone;
    let _signature=req.body.signature;
    let _gender=req.body.gender;
    let _grade=req.body.grade;
    let _city=req.body.city;
    let _zy=req.body.zy;
    let _text=req.body.text;
    

    //查询数据库中是否存在
    
    (async ()=>{
        let name=await db.find('user',{username:_username});
        let name1=await db.find('user',);
        // console.log(name)
        if(name.length){
            // console.log(name.length)
            res.send('yes')
        }else{
            let myDate = new Date();
            let year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            let month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
            let day=myDate.getDate();    //获取当前日(1-31)
            let _time=year+'-'+ month+'-'+ day;
            // console.log(time) 
            let _dataid=(name1.length+1)*1;

            // console.log(time1)
            res.send('no')
            db.insert('user',{username:_username,password:_password,telephone:_telephone,signature:_signature,
                gender:_gender,grade:_grade,city:_city,zy:_zy,text:_text,dataid:_dataid,time:_time})
           
        }
    })()

})
module.exports=Router;