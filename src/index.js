import './scss/main.scss';
import './img/sprite.svg';
import './img/cancel.png';

console.log('working');

function addNums(a, b) {
  if (!a) {
    console.log('Please give both parameters!!');
  } else {
    console.log(a + b);
  }
}

addNums(3, 3);
