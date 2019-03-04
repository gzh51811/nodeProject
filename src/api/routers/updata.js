const express=require('express');
const Router=express.Router();
const bodyParser=require('body-parser');
//引入封装的连接MongoDB函数
const db1=require('../db');
const mongodb=require('mongodb');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 创建json编码解析（把请求头content-type值为application/json时的数据格式化到request.body中）
const jsonParser = bodyParser.json();

//接收获取的前端数据
Router.post('/',jsonParser,urlencodedParser, async (req,res)=>{
    // console.log(333333)
    let {username,password,telephone,signature,gender,grade,city,zy,text,time}=req.body;
    // console.log({username,password,telephone,signature,gender,grade,city,zy,text,dataid})
   
    // let _username=req.body.username;
    // let _password=req.body.password;
    // let _telephone=req.body.telephone;
    // let _signature=req.body.signature;
    // let _gender=req.body.gender;
    // let _grade=req.body.grade;
    // let _city=req.body.city;
    let _dataid=(req.body.dataid)*1;
    console.log(222)
    // let _text=req1.body.text;
    
        // console.log('21')
        // await db.find('user',{username});
        // // console.log(name)
        // res.send("name");

    
    // (async ()=>{
       
       
        // let name=await db.find('user',{username});
      
        // // console.log(name.length) 
        // if(name.length){
        //     res.send('no')
        // }
        // console.log(name1)
        
            //  console.log(222222)
            let name1=await db1.find('user',{dataid:_dataid})
            if(name1){
               const MongoClient=mongodb.MongoClient;
               MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },function(err,client){
                   if(err) throw err;
    
                   //连接数据库
                   let db=client.db('weixiao');
                   //使用集合
                   let collecton=db.collection('user');
                   //删除
                   collecton.remove({dataid:_dataid})
               })
            //    db.delete('user',{usrname:{$in:[_username]}})
            let name2=await db1.find('user',{username});
            // console.log(name2.length)
                if(name2.length){
                    res.send('no')
                }else{
                    await db1.insert('user',{username,password,telephone,signature,gender,grade,city,text,dataid:_dataid,zy,time});
                    res.send('yes');
                }
                
            }
           
        
        // else{
        //     res.send('no')
            // let name2=await db.find('user')
            // let myDate = new Date();
            // let year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            // let month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
            // let day=myDate.getDate();    //获取当前日(1-31)
            // let _time=year+'-'+ month+'-'+ day;
            // // console.log(time) 
            // let _dataid=name2.length+1;
            

        //     db.insert('user',{username,password,telephone,signature,
        //         gender,grade,city,zy,text})
        // }
    //     
    // })();
    // console.log(name);
})
module.exports=Router;