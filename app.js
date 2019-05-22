let Express = require('express');
let app = Express();
let config = require('config');
let bodyParse=require('body-parser');

//body参数转化
app.use(bodyParse.urlencoded({limit:'100mb'}));
app.use(bodyParse.json({limit:'100mb'}));

//记录请求响应时间
let restime = require('./middlewares/restime');
app.use(restime);

//user先关路由配置
let userRoutes = require('./routes/user');
app.use('/user', userRoutes);

//404请求处理
app.use(function (req, res, next) {
  return res.status(404).json({ errcode: 404, errmsg: '资源不存在' });
})

//web服务器站点启动
app.listen(config.port, function () {
  console.log(`sever runing ! loclhost:${config.port}`);
})