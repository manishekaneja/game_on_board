import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/ClearOutlined';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import Summary from './Summary';
import board_values from '../board_values';
import values from '../const';
import { Slide, Button, Paper, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Bie, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions, Icon } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import weapon_render from '../weapon_render';
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_ended: false,
            boardDetails: board_values(),
            first_player_turn: true,
            turn_count: 2,
            openDialog: false,
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
            },
            winner: {}
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
        this.defenceAction = this.defenceAction.bind(this);
        this.attackAction = this.attackAction.bind(this);
        this.listenerFunction = this.listenerFunction.bind(this);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.listenerFunction);
    }
    listenerFunction(_) {
        if (this.state.openDialog) {
            switch (_.code) {
                case 'KeyD':
                    this.defenceAction();
                    return this.props.enqueueSnackbar("You Decided to Defend Yourself...Smart Work", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: this.state.first_player_turn ? 'left' : 'right' } });
                case 'KeyA':
                    this.attackAction();
                    return this.props.enqueueSnackbar("You Decided To Attack...Aggresive", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: this.state.first_player_turn ? 'left' : 'right' } });
                default:
                    return this.props.enqueueSnackbar("Confirm the Action First", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: this.state.first_player_turn ? 'left' : 'right' } });
            }
        }
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
    }
    componentDidMount() {
        this.props.enqueueSnackbar("Let's Start", { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'center' } });
        this.setState({ boardDetails: board_values(this.initalizeRocks(), this.initalizePlayers(), this.initalizePowerUps()) })
        this.listenerEvent = window.addEventListener('keydown', this.listenerFunction)

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
        return this.getUniquePoints(this.props.difficult === 1 ? 14 : 8);
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
            let turn_count, first_player_turn, presentLocationPower = next_cell[0].powerUp;
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
                                    hasPlayer2: false,
                                    powerUp: cell.powerUp ? ps.player_1.weapon_power : cell.powerUp
                                } : {
                                        hasPlayer1: false,
                                        hasPlayer2: true,
                                        powerUp: cell.powerUp ? ps.player_2.weapon_power : cell.powerUp
                                    },
                                render: render
                            } : cell))),
                player_1: {
                    ...ps.player_1,
                    ...ps.first_player_turn ? { weapon_power: presentLocationPower ? presentLocationPower : ps.player_1.weapon_power } : {}
                },
                player_2: {
                    ...ps.player_2,
                    ...(!ps.first_player_turn) ? { weapon_power: presentLocationPower ? presentLocationPower : ps.player_2.weapon_power } : {}

                }
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
            this.setState(ps => ({ openDialog: !ps.openDialog }))
        }
        return null;
    }
    reducePlayerStrength() {
        return this.setState(ps => (!ps.first_player_turn ?
            this.getUpdatedProfile(ps.player_1, ps.player_2, 'player_2') :
            this.getUpdatedProfile(ps.player_2, ps.player_1, 'player_1')));
    }
    getUpdatedProfile(attacker, victim, victim_key) {
        return {
            openDialog: false,
            winner: victim.strength - attacker.weapon_power <= 0 ? attacker : {},
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
    defenceAction() {
        this.setState(ps => (!ps.first_player_turn ? { player_1: this.turnOnDefence(ps.player_1), openDialog: false } : { player_2: this.turnOnDefence(ps.player_2), openDialog: false }))
    }
    attackAction() {
        this.reducePlayerStrength()
    }
    render() {
        return <>
            <DefenceOption
                open={this.state.openDialog}
                defenceAction={this.defenceAction}
                attackAction={this.attackAction}
            />
            <Summary player_1={this.state.player_1} player_2={this.state.player_2} />
            {!this.state.game_ended ? <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Board first_player_turn={this.state.first_player_turn} details={this.state.boardDetails} />
            </div> : <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ maxWidth: 400 }}>
                        <CardHeader style={{ textAlign: 'center' }} title={"CONGRATULATIONS..."} />
                        <CardMedia
                            style={{ height: 100, backgroundSize: 'contain' }}
                            image={this.state.winner.image}
                            title="Winner Winner"
                        />
                        <CardContent>
                            <Typography variant="subtitle1" style={{ textAlign: 'center' }} component="p">
                                {this.state.winner.name} has won this Match.
                            </Typography>
                        </CardContent>
                        <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} disableActionSpacing>
                            {/* <Button variant="contained" color="primary" style={{ marginRight: 5 }} onClick={_ => window.close()}>
                                <span style={{ marginRight: 2 }}>
                                    Close
                                </span>
                                <ClearIcon />
                            </Button> */}
                            <Button variant="contained" color="primary" style={{ marginLeft: 5 }} onClick={this.props.reset}>
                                <span style={{ marginRight: 2 }}>
                                    Retry
                                </span>
                                <ThreeSixtyIcon />
                            </Button>
                        </CardActions>
                    </Card>
                </div>}
        </>
    }
}
export default withSnackbar(Game);
class Board extends Component {
    render() {
        return <Paper style={{ padding: 10, display: 'grid', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', backgroundImage: `url(${values.green})` }}>
            {this.props.details.map((block, index) => <BoardCell first_player_turn={this.props.first_player_turn} key={index} isBlock={block.hasRock} powerUp={block.powerUp} hasPlayer1={block.hasPlayer1} hasPlayer2={block.hasPlayer2} render={block.render} />)}
        </Paper>
    }
}
class BoardCell extends Component {

    render() {
        return <span style={{ display: 'inline-block', width: '8vh', height: '8vh', color: 'black', backgroundColor: ((this.props.hasPlayer1 && this.props.first_player_turn) || (this.props.hasPlayer2 && (!this.props.first_player_turn))) ? this.props.powerUp > 0 ? 'lightseagreen' : 'yellow' : this.props.powerUp > 0 ? 'lightgreen' : this.props.isBlock ? 'red' : 'rgba(255,255,255,0.5)', border: this.props.powerUp > 0 ? '2px solid green' : ((this.props.hasPlayer1 && this.props.first_player_turn) || (this.props.hasPlayer2 && (!this.props.first_player_turn))) ? '2px solid black' : this.props.isBlock ? '2px solid red' : '0.1px dashed black' }}>
            {this.props.render || (this.props.powerUp > 0 && weapon_render(this.props.powerUp))}
        </span>
    }
}

const Transition = props => <Slide direction="up" {...props} />
class DefenceOption extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
            >
                <DialogTitle >
                    What Do You Wish For???
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Either You Can Attack Your Opponent With your Full Power</DialogContentText>
                    <DialogContentText style={{ textAlign: 'center' }}>OR</DialogContentText>
                    <DialogContentText>Instead of Attacking You can choose to defend Your Self but Reduce the damage recived to Half.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.defenceAction} color="primary">
                        Defend (Press D)
                    </Button>
                    <Button onClick={this.props.attackAction} color="secondary">
                        Attack (Press A)
              </Button>
                </DialogActions>
            </Dialog>
        );
    }
}