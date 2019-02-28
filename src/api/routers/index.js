const express = require('express');
const Router = express.Router();


const loginRouter = require('./login'); //登录路由
const goodslistRouter = require('./goodslistRouter');  //商品列表页路由
const pageRouter = require('./page'); //分页路由















Router.use('/goodslistRouter', goodslistRouter);    //使用路由
Router.use('/login', loginRouter);
Router.use('/list', pageRouter);











module.exports = Router;