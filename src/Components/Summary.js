import React, { Component } from 'react'
import PropTypes from 'prop-types'
import values from '../const';
import { Card, CardContent, Typography, LinearProgress } from '@material-ui/core';
class Summary extends Component {
    render() {
        return <>
            <div style={{
                width: '100%',
                height: 200,
                top: 0,
                border: '0px solid green',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <PlayerInfo player={this.props.player_1} />
                <PlayerInfo player={this.props.player_2} />
            </div>
        </>
    }
}
export default Summary;
class PlayerInfo extends Component {
    render() {
        console.log(this.props.player)
        return <>
            <Card style={{
                flex: 1,
                margin: 10,
                backgroundColor: 'rgba(32,32,32,0.8)',
                color: 'white',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <img style={{ height: '100%', width: '25%', backgroundColor: 'white' }} src={this.props.player.image} alt="player_image" />
                <div style={{ padding: 10, height: '100%', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <div style={{ flexGrow: 1, height: 200, width: '100%' }}>
                        <LinearProgress variant="determinate" color="secondary" value={this.props.player.strength} />
                    </div>
                    {/* <ProgressBar value={this.props.player.strength} /> */}
                    <div style={{ flex: 1, width: '100%' }}>
                        <table style={{ width: '100%', tableLayout: 'fixed' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography variant="h6" inline style={{ color: 'white' }}>
                                            Player Name :
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="h4" inline style={{ color: 'white' }}>
                                            {this.props.player.name}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography variant="h6" inline style={{ color: 'white' }}>
                                            Health :
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="h4" inline style={{ color: 'white' }}>
                                            {this.props.player.strength}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography variant="h6" inline style={{ color: 'white' }}>
                                            Power :
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="h4" inline style={{ color: 'white' }}>
                                            {this.props.player.weapon_power}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography variant="h6" inline style={{ color: 'white' }}>
                                            Defence System :
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="h4" inline style={{ color: 'white' }}>
                                            {this.props.player.defence ? 'ON' : 'OFF'}
                                        </Typography>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </>
    }
}
class ProgressBar extends Component {
    render() {
        const { value } = this.props
        return <>
            <div style={{ width: '100%', height: 30, position: 'relative', backgroundColor: 'red' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${value}%`, backgroundColor: 'white' }}>
                </div>
            </div>
        </>
    }
}