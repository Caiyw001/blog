if (true) {
    console.log(true);
}

// var x='abc';
// switch(x){
//     case 'xxx':{
//         console.log('this is xxx');
//     };
//     case 'abc':{
//         console.log('this is abc');
//         break;
//     };
// }

var x = '10';
if (x == 10) {
    console.log('this is 10');
}

if (x === '10') {
    console.log('this is "10"');
}


var o = {
    name: 'a',
    sex: 'man'
}

var o1 = o;

if (o == o1) {
    console.log('o==o1');
}

var num1 = 5;
var num2 = 3;
switch (1 + 1) {
    case num2 - num1:
        {
            console.log('this is 2+0');
            break;
        }
    default: {
        console.log('this is default !');
    }
}


while (false) {
    console.log('this is while');
}
do {
    console.log('this is do while');
} while (false);

// top: 
// console.log(10);

// for (var i = 0; i < 10; i++) {
//     if (i % 3 == 0) break top;
// }

top:
  for (var i = 0; i < 2; i++){
    for (var j = 0; j < 5; j++){
      if (i === 1 && j === 1) continue;
      console.log('i=' + i + ', j=' + j);
    }
  }