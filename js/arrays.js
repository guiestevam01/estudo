var theMark = 0;
markLoop: while (true) {
    console.log("Looping...");
    theMark = theMark + 1;
    if (theMark === 5) {
        break markLoop;
    }
}

let arr = [1, 2, 3, 4, 5];

for(let i        in arr) {
    console.log(i);
}