var a=1;
function numberAdd(n){
    n++;
}
numberAdd(a);
console.log(a);

var obj={name:'init'}
function updateName(n){
    n.name='update';
}
updateName(obj);
console.log(obj);