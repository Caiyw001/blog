const Moment=require('moment');

//#region 计算时间差
let t1=Moment().format();
console.log(t1);
setTimeout(function(){
    let t2=Moment().format();
    let diff=Moment().diff(t1,t2,false);
    console.log(diff);
},500)
//#endregion

let t3=Moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
console.log(`t3=${t3}`);