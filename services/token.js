const jwt=require('jsonwebtoken');
const config=require('config');

function gettoken(user){
    let token=jwt.sign(user,config.privatekey,config.algorithm,function(err,token){
        console.log(token);
    });
    return token;
}

function validatatoken(token){
    let user=jwt.verify(token,config.privatekey);
}

module.exports={
    gettoken,
    validatatoken
}