let routes=require('express').Router();
const USER=require('../services/user');
USER.init();
/**
 * 根据用户ID，获取用户信息
 */
routes.get('/:name',function(req,res){
  let name=req.params['name'];
  let user=USER.get(name);
  res.saveTime(req,res);
  res.send(user);
})

/**
 * 新增用户
 */
routes.post('/',async function(req,res){
  let user=req.body;
  let result=await USER.save(user);
  res.saveTime(req,res);
  res.send(result);
})

module.exports=routes;