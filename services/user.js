const fs = require('fs');
const JWT=require('./token');
var users = [];

/**
 * 初始化users
 */
async function init() {
  await new Promise((resolve, reject) => {
    fs.readFile('datas/user.json', function (err, data) {
      if (!err) {
        users = JSON.parse(data);
        resolve();
      } else {
        console.log(JSON.stringify(err));
        reject();
      }
    })
  })
}

/**
 * 保存用户信息
 * @param {*} user 
 */
async function save(user) {
  let u = users.find(function (u) {
    return u.name == user.name
  });
  if (u != null) {
    return 'success';
  } else {
    users.push(user);
    await new Promise(function (resolve, reject) {
      fs.writeFile('datas/user.json', JSON.stringify(users), function (err) {
        if (!err) {
          resolve('success');
        } else {
          reject(err);
        }
      })
    })
  }
}

/**
 * 获取用户信息
 * @param {*} name 
 */
function get(name) {
  let u = users.find(function (item) {
    return item.name == name;
  })
  return u;
}

/**
 * 获取所有用户信息
 */
function getusers() {
  return users;
}


/**
 * 登录接口
 * @param {Object} req 请求
 * @param {Object} res 响应
 * @param {*} next 
 */
function login(req, res, next) {
  let name = req.body.name;
  let pwd = req.body.pwd;

  let user = users.find(u => {
    return u.name == name
  });

  if (!user) {
    return res.status(404).send({ errcode: 404, errmsg: '用户不存在！' });
  }

  if (user.pwd == pwd) {
    let token=JWT.gettoken(user);
    return res.status(200).send(token);
  } else {
    return res.status(502).send({ errcode: 502, errmsg: '账号或密码错误！' });
  }
}

module.exports = {
  save,
  get,
  getusers,
  login,
  init
}