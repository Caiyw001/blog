var x=1;
function outer(){
    var x=2;
    function inner() {
        x++;
        console.log(x);
        var x=3;
    }
    inner();
}

outer();

//预测执行过程
var b=1;
var b=2;
var b;//undefined 
b++;//undefined+1=NaN
console.log(b);
b=3;

