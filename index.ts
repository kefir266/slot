import * as child from 'child_process';
import * as os from 'os';
import * as fs from "fs";

const NUMBER_OF_GAMES = 10000000;
const slotWorker = './models/tt-game.ts';

const numOfCpus = os.cpus().length;
const params: ReadonlyArray<string> = [`--numbersOfGames=${NUMBER_OF_GAMES}`, `--bet=1`];

const games = {wins: 0, loses: 0};
const startTime = new Date();

fs.writeFile('./output/result.log', `Started ${NUMBER_OF_GAMES} games at ${startTime}\n`, errorHandler);
console.log(`Started ${NUMBER_OF_GAMES} games at ${startTime}`);

if (process.execArgv.toString().indexOf('--inspect-brk') !== -1) {
    const port = Math.round(Math.random() * new Date().getSeconds() / 1000);
    process.execArgv.push(`--inspect-brk=${port}`);
}

for (let ind = 0; ind < numOfCpus; ind++) {
    const inst = child.fork(slotWorker, params)
        .on('exit', res => {
            console.log(`Games ${ind} have been finished at ${new Date()}`);
            fs.appendFile('./output/result.log', `Games ${ind} have been finished at ${new Date()}\n`, errorHandler);
        })
        .on('message', msg => {
            if (msg.loses) {
                games.wins += msg.wins;
                games.loses += msg.loses;
            }
        });
}

process.on("exit", () => {
    fs.appendFileSync('./output/result.log', `Wins/Loses = ${games.wins/games.loses}\n`);
});

function errorHandler(err: Error) {
    if (err) {
        console.log(err);
    }
}
