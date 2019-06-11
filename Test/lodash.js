const _ = require('lodash');

//#region assign(obj,obj1,obj2),将obj和obj1，obj2合并，返回合并后的对象
let arr1 = { name: 'cyw', age: 28 };
let arr2 = { age: 27 };
let arrMer1 = _.assign({}, arr1, arr2); //{name:'cyw',age:27}
let arrMer2 = _.merge({}, arr1, arr2);//{name:'cyw',age:28}
//#endregion

Object.prototype.toString = function () {
    return this.age
}

//#region map 
let arrInt = [{ age: 27 }, { age: 28 }, { age: 29 }];
console.log(_.map(arrInt,
    { age: 30 }
));

console.log(_.size(arrInt));

//#endregion

console.log(100);