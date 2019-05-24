import React from 'react'
import Typed from 'typed.js';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
const RulesArray = ['It is a two player game.',
    'This game is all about defending Yourself and Attacking your Opponent.',
    'Each player is allowed to make only 3 step at a time.',
    'Each Player gets its Turn only after the turn of other player has been completed.',
    'A Player must be 1 step away from it\'s opponent to get a choice of Attack or Defend himself',
    'Each time a player attcked by opponent its health get decreased  y the weapon power of its opponent.',
    'The first one to decrease the health of its enemy to 0 Won the Game',
    'The player\'s turn will be higligted by the yellow colour',
    'To make the game more intresting, 4 types of weapons (Highlighted in Green) with different power are placed at random location in the game \n \n ( BOXING GLOVES: 10 , AXE: 20 , BOW-ARROW:30 , GUN: 40)',
    'Also to some paths are blocked for the players by some obstacle (indicated by Red Skulls)',
]
export default class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationCompleted: false,
            skip: false
        }
        this.rules = React.createRef();
    }
    componentDidMount() {
        let rules_conc = ``;
        RulesArray.forEach(rule => rules_conc += `<li> ${rule} </li><br/>`)
        this.typed = new Typed(this.rules.current, {
            strings: [`<ol>${rules_conc}</ol>`],
            typeSpeed: 80,
            onComplete: self => self.destroy(),
            onDestroy: _ => this.setState({ animationCompleted: true, skip: true }),
            showCursor: false
        })
    }
    componentWillUnmount() {
        this.typed.destroy();
    }
    render() {
        return <>
            <Card style={{ width: 600 }}>
                <CardContent>
                    <h2 style={{ textAlign: "center" }}>
                        ~~ Rules ~~
                    </h2>
                    {this.state.skip ? <div>
                        <ol>
                            {RulesArray.map((ele, index) => <> <li key={index}>{ele}</li><br /></>)}
                        </ol>
                    </div> : <div ref={this.rules} />}
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" disabled={this.state.skip} onClick={_ => {
                        this.typed.destroy();
                        this.setState({ skip: true, animationCompleted: true })
                    }}>Skip</Button>
                    <Button size="small" color="primary" disabled={!this.state.animationCompleted} onClick={this.props.onNext}>Start Game</Button>
                </CardActions>
            </Card>
        </>
    }
}