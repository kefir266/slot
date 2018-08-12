# Slot

#### This is implementation base logic for a simple slot game by using TypeScript

Sample output:
- No win
```javascript
const result = Game.play({bet: 1});
result === {
stopPositions: [0, 1, 2, 3, 4],
view: [
[5,	1,	5,	2,	1],
[3,	2,	4,	4,	4],
[1,	2,	2,	1,	1]],
rewards: [],
bet: 1,
win: 0
}
```
- Win
```javascript
const result = Game.play({bet: 2});
result === {
stopPositions: [2, 1, 6, 5, 4],
view: [
[1,	1,	1,	1,	1],
[4,	2,	3,	5,	4],
[5,	2,	3,	4,	1]],
rewards: [{
lineId: 1,
symbol: 1,
payout: 10
}],
bet: 2,
win: 10
}
```