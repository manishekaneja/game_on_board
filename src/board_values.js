import React from 'react'
import values from './const';
const board_values = (rocks = [], players = [], powerUps = []) => {
    let bordDetails = [];
    for (let x = 0; x < 8; ++x) {
        for (let y = 0; y < 8; ++y) {
            if ('0' in players && players[0].row === x && players[0].column === y) {
                bordDetails.push({
                    row: x,
                    column: y,
                    hasRock: false,
                    hasPlayer1: true,
                    hasPlayer2: false,
                    powerUp: 0,
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
                    powerUp: 0,
                    render: <img style={{ height: '100%', width: '100%' }} src={values.player2} alt="player2" />
                })
            }
            else {
                console.log(powerUps);
                let hasPowerUp = powerUps.filter(r => r.row === x && r.column === y);
                hasPowerUp = hasPowerUp.length > 0 ? hasPowerUp[0] : false;
                let hasRock = rocks.filter(r => r.row === x && r.column === y).length > 0;
                bordDetails.push({
                    row: x,
                    column: y,
                    hasRock: ((!hasPowerUp) && hasRock),
                    hasPlayer1: false,
                    hasPlayer2: false,
                    powerUp: hasPowerUp ? (parseInt(Math.random() * 4) * 10) : 0,
                    render: ((!hasPowerUp) && hasRock) ? <img style={{ opacity: ((!hasPowerUp) && hasRock) ? 0.5 : 1, height: '100%', width: '100%' }
                    } src={values.rock} alt="rock" /> : null
                })
            }
        }
    }
    return bordDetails;
}
export default board_values;