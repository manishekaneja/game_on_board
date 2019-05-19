import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Summary from './Summary';
import board_values from '../board_values';
import values from '../const';
import { Card } from '@material-ui/core';
import { withSnackbar } from 'notistack';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_ended: false,
            boardDetails: board_values(),
            first_player_turn: true,
            turn_count: 2,
            player_1: {
                name: props.player_name1,
                strength: 100,
                image: values.player1,
                weapon_power: 10,
                defence: false
            },
            player_2: {
                name: props.player_name2,
                strength: 100,
                image: values.player2,
                weapon_power: 10,
                defence: false
            }
        }
        this.getUniquePoints = this.getUniquePoints.bind(this);
        this.initalizeRocks = this.initalizeRocks.bind(this);
        this.initalizePowerUps = this.initalizePowerUps.bind(this);
        this.initalizePlayers = this.initalizePlayers.bind(this);
        this.updateWhen = this.updateWhen.bind(this);
        this.checkNeighboursCells = this.checkNeighboursCells.bind(this);
        this.reducePlayerStrength = this.reducePlayerStrength.bind(this);
        this.getUpdatedProfile = this.getUpdatedProfile.bind(this);
        this.turnOnDefence = this.turnOnDefence.bind(this);
    }

    componentDidMount() {
        this.props.enqueueSnackbar("Let's Start", { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'center' } });
        this.setState({ boardDetails: board_values(this.initalizeRocks(), this.initalizePlayers(), this.initalizePowerUps()) })
        window.addEventListener('keydown', _ => {
            let playercell = this.state.boardDetails.filter(cell => this.state.first_player_turn ? cell.hasPlayer1 : cell.hasPlayer2);
            if (playercell.length > 0) {
                playercell = playercell[0]
            }
            switch (_.code) {
                case 'ArrowLeft':
                    this.updateWhen(playercell.row, playercell.column - 1, playercell.row, playercell.column, playercell.render);
                    break;
                case 'ArrowRight':
                    this.updateWhen(playercell.row, playercell.column + 1, playercell.row, playercell.column, playercell.render);
                    break;
                case 'ArrowUp':
                    this.updateWhen(playercell.row - 1, playercell.column, playercell.row, playercell.column, playercell.render);
                    break;
                case 'ArrowDown':
                    this.updateWhen(playercell.row + 1, playercell.column, playercell.row, playercell.column, playercell.render);
                    break;
                default: break;
            }
            return;
        })

    }
    getUniquePoints(count) {
        let points = [];
        for (let x = 0; x < count; ++x) {
            let c = {
                row: parseInt(Math.random() * 8),
                column: parseInt(Math.random() * 8)
            }
            if (points.filter(e => e.row === c.row && e.column === c.column).length === 0) {
                points.push(c);
            }
            else {
                --x;
                continue;
            }
        }
        return points;
    }
    initalizeRocks() {
        return this.getUniquePoints(8);
    }
    initalizePowerUps() {
        return this.getUniquePoints(4);
    }
    initalizePlayers() {
        return this.getUniquePoints(2);
    }
    updateWhen(new_row, new_col, old_row, old_col, render) {
        let next_cell = this.state.boardDetails.filter(cell => cell.row === new_row && cell.column === new_col);
        if ((new_row < 0 ||
            new_row > 7 ||
            new_col < 0 ||
            new_col > 7) ||
            next_cell.length < 0 ||
            (next_cell.length > 0 && (next_cell[0].hasRock || next_cell[0].hasPlayer1 || next_cell[0].hasPlayer2))
        ) {
            return this.props.enqueueSnackbar("Can't Perform that Move", { variant: 'warning', anchorOrigin: { vertical: 'bottom', horizontal: this.state.first_player_turn ? 'left' : 'right' } });;
        }
        if (this.state.turn_count <= 0)
            this.checkNeighboursCells(new_row, new_col);
        this.setState(ps => {
            let turn_count, first_player_turn;
            this.props.enqueueSnackbar("You made a Move", { variant: 'default', anchorOrigin: { vertical: 'bottom', horizontal: ps.first_player_turn ? 'left' : 'right' } });
            if (ps.turn_count > 0) {
                turn_count = ps.turn_count - 1;
                first_player_turn = ps.first_player_turn;
            }
            else {
                turn_count = 2;
                first_player_turn = !ps.first_player_turn;
                this.props.enqueueSnackbar("Now it's your Turn", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: first_player_turn ? 'left' : 'right' } });

            }
            return {
                turn_count,
                first_player_turn,
                boardDetails: ps.boardDetails.map(cell => (cell.row === old_row &&
                    cell.column === old_col ? {
                        ...cell,
                        hasPlayer1: false,
                        hasPlayer2: false,
                        render: false
                    } : (
                        cell.row === new_row &&
                            cell.column === new_col ? {
                                ...cell,
                                ...ps.first_player_turn ? {
                                    hasPlayer1: true,
                                    hasPlayer2: false
                                } : {
                                        hasPlayer1: false,
                                        hasPlayer2: true
                                    },
                                render: render
                            } : cell)))
            }
        })

    }
    checkNeighboursCells(row, col) {
        let neighbouringPlayer = this.state.boardDetails.filter(cell => (((cell.row === row + 1 && cell.column === col + 1) ||
            (cell.row === row && cell.column === col + 1) ||
            (cell.row === row - 1 && cell.column === col + 1) ||
            (cell.row === row + 1 && cell.column === col - 1) ||
            (cell.row === row && cell.column === col - 1) ||
            (cell.row === row - 1 && cell.column === col - 1) ||
            (cell.row === row + 1 && cell.column === col) ||
            (cell.row === row - 1 && cell.column === col)) &&
            (this.state.first_player_turn ? cell.hasPlayer2 : cell.hasPlayer1)));
        if (neighbouringPlayer.length > 0) {
            let choice = window.confirm("Instead of attack want to turn your Defence on??");
            if (choice) {
                this.setState(ps => (ps.first_player_turn ? {
                    player_1: this.turnOnDefence(ps.player_1)
                } : {
                        player_2: this.turnOnDefence(ps.player_2)
                    }))
            }
            else {
                this.reducePlayerStrength();
            }

        }
        return null;
    }
    reducePlayerStrength() {
        return this.setState(ps => (ps.first_player_turn ?
            this.getUpdatedProfile(ps.player_1, ps.player_2, 'player_2') :
            this.getUpdatedProfile(ps.player_2, ps.player_1, 'player_1')));
    }
    getUpdatedProfile(attacker, victim, victim_key) {
        return {
            game_ended: victim.strength - attacker.weapon_power <= 0 ? true : false,
            [victim_key]: {
                ...victim,
                strength: victim.strength - (attacker.weapon_power / (victim.defence ? 2 : 1)),
                defence: false
            }
        }
    }
    turnOnDefence(player) {
        return {
            ...player,
            defence: true
        }

    }
    render() {
        return <>
            <Summary player_1={this.state.player_1} player_2={this.state.player_2} />
            {!this.state.game_ended && <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Board details={this.state.boardDetails} />
            </div>}
        </>
    }
}
export default withSnackbar(Game);
class Board extends Component {
    render() {
        return <Card style={{ padding: 10, display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
            {this.props.details.map((block, index) => <BoardCell key={index} isBlock={block.hasRock} powerUp={block.powerUp} hasPlayer={block.hasPlayer1 || block.hasPlayer2} render={block.render} />)}
        </Card>
    }
}
class BoardCell extends Component {
    render() {
        return <span style={{ display: 'inline-block', width: '8vh', height: '8vh', color: 'black', backgroundColor: this.props.powerUp > 0 ? 'lightgreen' : this.props.isBlock ? 'red' : 'white', border: this.props.isBlock ? '2px solid red' : this.props.powerUp > 0 ? '2px solid green' : '1px solid black' }}>
            {this.props.render || (this.props.powerUp > 0 && this.props.powerUp)}
        </span>
    }
}