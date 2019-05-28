let Express = require('express');
let app = Express();
let config = require('config');
let bodyParse = require('body-parser');
const path = require('path');

let multer = require('multer');
var upload = multer({ dest: 'uploads/' });

//body参数转化
app.use(bodyParse());
app.use(upload.none());

//隐藏服务器信息
app.disable('x-powered-by');

app.use('/static', Express.static('public'))

//记录请求响应时间
let restime = require('./middlewares/restime');
app.use(restime);

//user先关路由配置
let userRoutes = require('./routes/user');
//app.all
app.use('/user', userRoutes);

//404请求处理
app.use(function (req, res, next) {
  return res.status(404).json({ errcode: 404, errmsg: '资源不存在' });
})

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(502).send({ errcode: 502, errmsg: '程序有异常！' })
})

//web服务器站点启动
app.listen(config.port, function () {
  console.log(`sever runing ! loclhost:${config.port}`);
})

