import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tiles from './Components/Tiles.js';
// import ErrorBoundary from './Components/ErrorBoundary.js';
import AudioPlayer from './Components/AudioPlayer';

const endpoint = "https://raw.githubusercontent.com/Sky020/Potter-Player/master/src/data/sermon_data.json";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isPlayer: false
    };
    this.handlePlayer = this.handlePlayer.bind(this);
  }
  // Get JSON from GitHub API
  componentDidMount() {
    const getAPI = async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      this.setState({
        response: data,
        isLoading: false,
      });
    }
    getAPI();
  }

  handlePlayer(audio) {
    this.setState({
      audio: audio,
      isPlayer: !this.state.isPlayer
    })
  }
  render() {
    if (this.state.isLoading) {
      return (<View style={styles.container}><Text style={styles.text}>Data is loading...</Text></View>);
    }
    return (
      <View style={styles.container}>
        {this.state.isPlayer ? (<AudioPlayer audio={this.state.audio} />) : (
          <View style={styles.container}>
            <Text style={styles.text}>Data {this.state.isLoading ? "not Found" : "Found"}</Text>
            <Tiles data={this.state.response} action={this.handlePlayer} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  text: {
    color: '#fff',
  }
});

export default App;