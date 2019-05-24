import React, { Component } from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import Game from './Components/Game';
import Welcome from './Components/Welcome';
import Rules from './Components/Rules';
import SelectionScreen from './Components/SelectionScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: 0,
      selected: 0,
      player_name1: 'Player 1',
      player_name2: 'Player 2',
      winner: {}
    }
  }
  render() {
    const { selected } = this.state;
    return <SnackbarProvider maxSnack={10} >
      <CssBaseline />
      <div style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
      }}>
        {selected === 0 && <Welcome onNext={_ => this.setState(ps => ({ selected: ps.selected + 1 }))} />}
        {selected === 1 && <SelectionScreen setDifficultyLevel={value => this.setState({ diff: value })}
          updateName1={name => this.setState({ player_name1: name })} updateName2={name => this.setState(ps => ({ player_name2: name, selected: ps.selected + 1 }))} />}
        {selected === 2 && <Rules onNext={_ => this.setState(ps => ({ selected: ps.selected + 1 }))} />}
        {selected === 3 &&
          <div style={{ flex: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Game difficult={this.state.diff}
              player_name1={this.state.player_name1}
              player_name2={this.state.player_name2}
              reset={_ => this.setState({ selected: 1 })}
            />
          </div>}
      </div>
    </SnackbarProvider>
  }
}

export default App;
