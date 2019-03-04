const express = require('express');
const Router = express.Router();


const loginRouter = require('./login'); //登录路由
const goodslistRouter = require('./goodslistRouter');  //商品列表页路由
const pageRouter = require('./page'); //分页路由
const uploadRouter = require('./upload'); //图片上传
const insertGoods = require('./insertGoods'); //添加商品
const editGoods = require('./edit'); //编辑商品
const deleteGoods = require('./deleteGoods'); //删除商品
const classificationAdd = require('./classificationAdd'); //增加分类
const orderList = require('./orderList'); //订单列表








Router.use('/goodslistRouter', goodslistRouter);    //使用路由
Router.use('/login', loginRouter);
Router.use('/list', pageRouter);
Router.use('/upload', uploadRouter);
Router.use('/editGoods', editGoods);
Router.use('/insertGoods', insertGoods);
Router.use('/delete', deleteGoods);
Router.use('/classificationAdd', classificationAdd);
Router.use('/orderList', orderList);








module.exports = Router;