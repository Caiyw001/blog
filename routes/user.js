let routes = require('express').Router();
const USER = require('../services/user');
const path = require('path');
USER.init();

/**
 * 登录
 */
routes.post('/login', USER.login);

routes.get('/login', function (req, res, next) {
  res.sendFile(path.join(process.cwd(),'/views/user/login.html'));
})

/**
 * 根据用户ID，获取用户信息
 */
routes.get('/:name', function (req, res) {
  let name = req.params['name'];
  let user = USER.get(name);
  res.saveTime(req, res);
  res.send(user);
})

/**
 * 获取全部用户信息
 */
routes.get('/', function (req, res) {
  let users = USER.getusers();
  res.send(users);
})


/**
 * 新增用户
 */
routes.post('/', async function (req, res) {
  let user = req.body;
  let result = await USER.save(user);
  res.saveTime(req, res);
  res.send(result);
})



module.exports = routes;