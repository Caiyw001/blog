let routes=require('express').Router();

routes.get('/:id',function(req,res){
  let id=req.params['id'];
  res.saveTime(req,res);
  res.send(id);
})

routes.post('/',function(req,res){
  let user=req.body;
  res.saveTime(req,res);
  res.send(user);
})

module.exports=routes;