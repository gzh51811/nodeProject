const express = require('express');
const Router = express.Router();
// const db = require("./../db/index");//封装好的数据库操作方法

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



//商品列表页
Router.get('/', (req, res) => {

    //console.log(req.query)  //解构  
    //console.log(qty, page)
    let { goods_name, shelves } = req.query;

    

    console.log(goods_name)
    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // 使用某个集合
        let collecton = db.collection('goods');

        //下架
        if (shelves == 'true') {
            console.log('下架');
            let len = await collecton.updateOne({ name: goods_name }, { $set: { state: 'shelves'}});
        } else {
            //删除商品
            let len = await collecton.deleteOne({ name: goods_name });
            console.log('删除')
        }
     
    });
    res.send('yes');

});




module.exports = Router;