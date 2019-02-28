const express=require('express');

const app=express();

const Router=require('./api/routers');

//静态服务器
    app.use(express.static('./../src'));

    //路由接口
    app.use('/api',Router);

//监听端口
    app.listen(1811,()=>{
        console.log('服务器启动成功');
    });