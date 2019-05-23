const fs = require('fs');
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
function get(name){
  let u=users.find(function(item){
    return item.name==name;
  })

  return u;
}


module.exports = {
  save,
  get,
  init
}