import React from 'react'
import { Slide } from '@material-ui/core';
import DifficultyChoice from './DifficultyChoice';
import EnterPlayerName from './EnterPlayerName';
export default class SelectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 0
        }
        this.onNext = this.onNext.bind(this);
    }
    onNext() {
        this.setState(ps => ({ show: ps.show + 1 }))
    }
    render() {
        const { setDifficultyLevel, updateName1, updateName2 } = this.props;
        return <>
            {this.state.show === 0 && <Slide direction="right" timeout={500} mountOnEnter unmountOnExit in={this.state.show === 0}>
                <DifficultyChoice setDifficultyLevel={setDifficultyLevel} onNext={this.onNext} />
            </Slide>}
            {this.state.show === 1 && <Slide direction="right" timeout={500} mountOnEnter unmountOnExit in={this.state.show === 1}>
                <EnterPlayerName update={_ => { updateName1(_); this.onNext(); }} state_key="Player 1" />
            </Slide>}
            {this.state.show === 2 && <Slide direction="right" timeout={500} mountOnEnter unmountOnExit in={this.state.show === 2}>
                <EnterPlayerName update={_ => { updateName2(_) }} state_key="Player 2" />
            </Slide>}


        </>

    }
}