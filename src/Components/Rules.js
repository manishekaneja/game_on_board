import React from 'react'
import Typed from 'typed.js';
import { Card, CardContent, CardActions, Button } from '@material-ui/core';
const RulesArray = ['First Rule Here First Rule Here First Rule Here',
    'Second Rule Okay',
    'Rule Third',
    'Rule Fourth']
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
        RulesArray.forEach(rule => rules_conc += `<li> ${rule} </li>`)
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
                            {RulesArray.map((ele, index) => <li key={index}>{ele}</li>)}
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