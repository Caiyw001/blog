/**
 * 记录响应时间中间件
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 继续执行的防范
 */
let restime=function(req,res,next){
  res.startTime=new Date().getTime();

  res.saveTime=function(req,res){
    let time=new Date().getTime()-res.startTime;
    console.log(time);
  }
  next();
};

module.exports=restime;