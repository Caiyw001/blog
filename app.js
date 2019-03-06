const express=require('express');
const app=express();
app.set('port',process.env.PORT||80);


app.get('/',(req,res)=>{
    res.send('wellcome to caiyangwei`s suit !');
})

app.listen(3000,function(error,result){
    if(error){}
    console.info('Example app listening on port 3000');
})
