import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEye as reEye } from '@fortawesome/free-regular-svg-icons';

class Tile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isClicked: false,
            isError: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.setState = {
            isClicked: false
        };

    }
    async handleClick() {
        this.setState({
            isClicked: !this.state.isClicked
        });
        this.props.action(this.props.data.audio);
        // const source = { uri: 'https://potterswheelsd.org/wp-content/uploads/2020/03/2020-03-01-Thriving-Through-Hope-In-The-Glory-of-Christ-Are-we-Owners-or-Are-we-Managers-Pastor-Kevin-Ward.mp3' }//, headers: { [string]: string}}
        // try {
        //     const { sound: soundObject, status } = new Audio.Sound.createAsync(source, { shouldPlay: true }, false);
        //     console.log(soundObject)
        // } catch (e) {
        //     this.setState({
        //         isError: true
        //     })
        // }
    }
    render() {
        return (
            <View style={styles.div1}>
                <View style={styles.div2} onPress={this.handleClick}>
                    <TouchableOpacity onPress={() => this.props.onSelect(this.props.id)}>
                        <Text style={[styles.text, styles.title]}>{this.props.data.title}</Text>
                        <Text style={[styles.text, styles.date]}>{this.props.data.date}</Text>

                        <Text style={[styles.text, styles.speaker]}>{this.props.data.speaker}</Text>
                        <Text style={[styles.text, styles.category]}>{this.props.data.category}</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.div3}>
                    <FontAwesomeIcon size={28} style={[styles.icon, styles.text]} icon={this.props.selected ? faEye : reEye} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    div1: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#444',
        width: '100%',
        height: 100,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 10
    },
    div2: {
        flex: 1,
        flexGrow: 15,
        backgroundColor: '#444'
    },
    div3: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
    },
    title: {
        alignSelf: 'center',
        fontSize: 15,
        paddingBottom: 10
    },
    date: {
        fontWeight: 'bold',
        width: '80%',
        alignSelf: 'flex-start',
        paddingBottom: 3
    },
    speaker: {
        fontStyle: 'italic',
        paddingBottom: 10
    },
    category: {
        fontSize: 12,
        alignSelf: 'center',
    },
    icon: {
        alignSelf: 'flex-end'
    },
    backgroundAudio: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default Tile;