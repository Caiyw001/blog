const Moment=require('moment');

/**
 * 记录响应时间中间件
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * @param {Function} next 继续执行的防范
 */
let restime=function(req,res,next){
  res.startTime=Moment().format();

  res.saveTime=function(req,res){
    let now=Moment().format();
    let fifftime=Moment().diff(res.startTime,now);
    console.log(fifftime);
  }
  next();
};

module.exports=restime;