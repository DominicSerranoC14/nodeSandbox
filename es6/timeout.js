// Fun with setTimeout: console logging 1-5 with incrementing delays
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i + 1), (1000 * i))
}
