import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Button } from '@material-ui/core';

class DifficultyChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 0,
        }
    }
    render() {
        const { style, setDifficultyLevel, onNext } = this.props;
        return <>
            <Card>
                <CardContent>
                    <div style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h4">
                            Select the Difficulty Level
                        </Typography>
                        <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button onClick={() => { onNext(); setDifficultyLevel(1) }} variant="contained" style={{ backgroundColor: 'black', color: 'white' }} >Hard</Button>
                            <Button onClick={() => { onNext(); setDifficultyLevel(0) }} variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>Easy</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    }
}
DifficultyChoice.propType = {
    style: PropTypes.object,
}
DifficultyChoice.defaultProps = {
    style: {}
}
export default DifficultyChoice;