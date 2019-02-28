const express = require('express');
const Router = express.Router();


const goodslistRouter = require('./goodslistRouter');  //商品列表页路由
const loginRouter = require('./login'); //登录路由














Router.use('/goodslistRouter', goodslistRouter);    //使用路由
Router.use('/login', loginRouter);











module.exports = Router;