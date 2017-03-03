#!/usr/bin/env node

// Basic es6 syntax usage

let list = [1,2,3,4,5];
// Array.map() method is non mutating
// It will return a new array and it will not mutate list
let mapList = list.map(num => num * 2);

// Object literal key value shorthand
// ES5 way
let myOldObj = {
  one: 1,
  str: 'One',
  say: () => console.log(this)
}

// ES6 way
const one = 1;
const str = 'One';
const say = (name) => console.log(name + ' says hello!');

let myShorthand = { one, str, say };

// Destructuring Assignments
let dog = { name: 'Lucy', breed: 'Min-Pin', say: say };

// Deconstruct the dog object
// Rename the say function as LucySay
const { name, breed, say: LucySay } = dog;
//LucySay(name);

// Array deconstruction
let x = [1,2,3,4,5];
let [y,z] = x;
// y= 1, z = 2

// Rest operator
let [,, ...theOthers] = x;

// Spread operator
let countries = ['Moldova', 'Ukraine'];
let otherCountries = ['USA', 'Jordan'];

let joinedArrays = [...countries, ...otherCountries];

// Deconstruct an object as a function param
function sayName({name, breed}) {
  console.log(name, breed);
};
// sayName(dog);
