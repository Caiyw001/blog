const jwt=require('jsonwebtoken');
const config=require('config');

function gettoken(user){
    let token=jwt.sign(user, config.privatekey,{
        expiresIn: 60 * 60
    });
    return token;
}


module.exports={
    gettoken
}