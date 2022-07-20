import { randNum } from "./utility/random";

// test randNum 10 times
for(let i = 0; i < 10; i++) {
    console.log(randNum(1, 3));
}

// test randNum 10 times
for (let i = 0; i < 10; i++) {
    console.log(randNum(1, 3, true));
}

