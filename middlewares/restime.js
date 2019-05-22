let restime=function(req,res,next){
  res.startTime=Date();

  res.saveTime=function(req,res){
    let time=Date()-res.startTime;
    console.log(time);
  }
  next();
};

module.exports=restime;