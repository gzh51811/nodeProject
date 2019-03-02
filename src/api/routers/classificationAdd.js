const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();

//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

//
Router.get('/', (req, res) => {

    let { m } = req.query;  //解构  

    //console.log(m, eclass)

    MongoClient.connect("mongodb://localhost:27017", async function (err, client) {
        if (err) throw err;

        let db = client.db('xiaoming'); //连接数据库

        // // 使用某个集合
        let collecton = db.collection('classification');
        
        //渲染数据
        if (m == 'render') {
            let data = await collecton.find().toArray();

            let len = data.length;

            res.send({
                data,
                len
            });
        } else if (m == 'delete') {  
            //删除

            let { eclass } = req.query;  
            await collecton.deleteOne({ eclass });
            res.send('yes');
        }
        else if (m == 'edit') {
            //编辑
            let { id, str, note } = req.query;
            id = id * 1;
            let data = await collecton.updateOne({ id }, { $set: { class: str, note}});
            res.send(data);
        }
        else if (m == 'renderClass') {
            //渲染编辑页

            let { classificationGoods } = req.query;
            let data = await collecton.find({ eclass: classificationGoods}).toArray();
            res.send(data);
        }
        else if (m == 'add') {
            //添加分类

            let { str, note } = req.query;

            let len = await collecton.find().toArray();
            len = len.length * 1;

            let data = await collecton.insertOne({ id: len + 1, class: str, note});
            res.send(data);
        }
        else if (m == 'deleteId') {
            //删除多条

            let { class_id } = req.query;
            class_id = class_id * 1;
            let data = await collecton.deleteOne({ id: class_id });
            res.send(data);
        }

    });

});




module.exports = Router;