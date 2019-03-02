const path = require('path');
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');//urlencoded,json
const multer = require('multer');
const Router = express.Router();


//引入数据库
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//格式
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './assets/images/goods/';

createFolder(uploadFolder);

let imgsrc = '';

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        let ext = path.extname(file.originalname)
        imgsrc = Date.now() + '_' + file.originalname;
        cb(null, file.originalname);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 单图上传
Router.post('/', upload.single('goods'),  function (req, res, next) {
    var file = req.file;


    res.send({ ret_code: '0',imgsrc });
});







module.exports = Router;