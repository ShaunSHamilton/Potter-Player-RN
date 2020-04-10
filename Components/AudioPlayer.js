import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEye as reEye } from '@fortawesome/free-regular-svg-icons';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            playbackInstance: null,
            currentIndex: 0,
            isBuffering: false
        }
    }

    async componentDidMount() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })

            this.loadAudio()
        } catch (e) {
            console.log(e)
        }
    }

    async loadAudio() {

        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: this.props.audio
            }

            const status = {
                shouldPlay: this.state.isPlaying
            }

            playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)
            this.setState({ playbackInstance: playbackInstance })
        } catch (e) {
            console.log(e)
        }
    }

    onPlaybackStatusUpdate = status => {
        this.setState({
            isBuffering: status.isBuffering
        })
    }

    handlePlayPause = async () => {
        this.state.isPlaying ? await this.state.playbackInstance.pauseAsync() : await this.state.playbackInstance.playAsync()

        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    // handlePreviousTrack = async () => {
    //     let { playbackInstance, currentIndex } = this.state
    //     if (playbackInstance) {
    //         await playbackInstance.unloadAsync()
    //         currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
    //         this.setState({
    //             currentIndex
    //         })
    //         this.loadAudio()
    //     }
    // }

    // handleNextTrack = async () => {
    //     let { playbackInstance, currentIndex } = this.state
    //     if (playbackInstance) {
    //         await playbackInstance.unloadAsync()
    //         currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
    //         this.setState({
    //             currentIndex
    //         })
    //         this.loadAudio()
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.albumCover}
                    source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
                />
                <View style={styles.controls}>
                    {/* <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
                        <FontAwesomeIcon icon={faEye} size={48} color='#444' />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
                        {this.state.isPlaying ? (
                            <FontAwesomeIcon icon={faEye} size={48} color='#444' />
                        ) : (
                                <FontAwesomeIcon icon={reEye} size={48} color='#444' />
                            )}
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
                        <FontAwesomeIcon icon={faEye} size={48} color='#444' />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    albumCover: {
        width: 250,
        height: 250
    },
    controls: {
        flexDirection: 'row'
    },
    control: {
        margin: 20
    }
})

export default AudioPlayer;