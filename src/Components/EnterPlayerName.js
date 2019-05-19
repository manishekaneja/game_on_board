import React from 'react'
import { Typography, Card, CardContent, TextField, CardActions, Button } from '@material-ui/core';
export default class EnterPlayerName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    render() {
        const { state_key, update } = this.props;
        return <>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="title">
                        Enter Name of {state_key}
                    </Typography>
                    <TextField placeholder={`Name Here`} value={this.state.name} style={{ width: '100%' }} onChange={value => this.setState({ name: value.target.value })} />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={_ => update(this.state.name)}>
                        Next
                    </Button>
                </CardActions>
            </Card>

        </>

    }
}