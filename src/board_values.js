import React from 'react'
import values from './const';
const board_values = (rocks = [], players = [], powerUps = []) => {
    let bordDetails = [], count = powerUps.length;
    let powerUpValues = []
    while (--count >= 0) {
        powerUpValues.push((count + 1) * 10);
    }
    for (let x = 0; x < 8; ++x) {
        for (let y = 0; y < 8; ++y) {
            let hasPowerUp = powerUps.filter(r => r.row === x && r.column === y);
            hasPowerUp = hasPowerUp.length > 0 ? hasPowerUp[0] : false;
            let value = hasPowerUp ? powerUpValues.splice(parseInt(Math.random() * powerUpValues.length), 1)[0] : 0;
            if ('0' in players && players[0].row === x && players[0].column === y) {
                bordDetails.push({
                    row: x,
                    column: y,
                    hasRock: false,
                    hasPlayer1: true,
                    hasPlayer2: false,
                    powerUp: value,
                    render: <img style={{ height: '100%', width: '100%' }} src={values.player1} alt="player1" />

                })
            }
            else if ('1' in players && players[1].row === x && players[1].column === y) {
                bordDetails.push({
                    row: x,
                    column: y,
                    hasRock: false,
                    hasPlayer1: false,
                    hasPlayer2: true,
                    powerUp: value,
                    render: <img style={{ height: '100%', width: '100%' }} src={values.player2} alt="player2" />
                })
            }
            else {
                let hasRock = rocks.filter(r => r.row === x && r.column === y).length > 0;
                bordDetails.push({
                    row: x,
                    column: y,
                    hasRock: ((!hasPowerUp) && hasRock),
                    hasPlayer1: false,
                    hasPlayer2: false,
                    powerUp: value,
                    render: ((!hasPowerUp) && hasRock) ? <img style={{ opacity: ((!hasPowerUp) && hasRock) ? 0.5 : 1, height: '100%', width: '100%' }
                    } src={values.rock} alt="rock" /> : null
                })
            }
        }
    }
    return bordDetails;
}
export default board_values;