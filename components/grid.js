import React, { Component } from 'react'
import {
    TouchableWithoutFeedback,
    View,
    TouchableOpacity,
    Clipboard,
    Text,
    TextInput
} from 'react-native'

import { makeArray } from './utils';
import styles from './styles/grid';
import inputStyles from './styles/input'
import buttonStyles from './styles/button'


const DEFAULT_HEIGHT = '8';
const DEFAULT_WIDTH = '10';

export default class Grid extends Component {
    constructor() {
        super()
        this.state = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            grid: [],
            text: 'hello world',
            message: 'painting',
            action: 'brush'
        }
    }

    componentWillMount() {
        this.setState(() => ({
            grid: makeArray(this.state.width, this.state.height, '😀')
        }));
    }

    boardClickHandler(rowIdx, tileIdx) {
        this.setState(() => {
            let update = [...this.state.grid];
            let message = '';

            if (this.state.action === 'brush') {
                update[rowIdx][tileIdx] = this.props.activeEmoji;
                message = 'painting'
            } else {
                update[rowIdx][tileIdx] = null
                message = 'erasing'
            }

            return {
                grid: update,
                message: message
            }
        })
    }

    /**
     * Clear the emoji grid
    */
    clearGrid() {
        let newGrid = makeArray(this.state.width, this.state.height, null);
        this.setState(() => ({
            grid: newGrid,
            message: 'grid cleared'
        }));
    }

    /**
	 * Copy emoji grid data to clipboard
	 */
    copyGrid = async () => {
        let text = ''
        this.state.grid.map(arr => {
            arr.map(obj => {
                if (obj === null) return text += ':blank:';
                else return text += obj;
            })
            return text += '\r\n';
        });
        await Clipboard.setString(text);
        alert(text);
    }

    render() {

        const rows = this.state.grid.map((row, rowIdx) =>
            <View key={rowIdx} style={{ flex: 1, flexDirection: 'row' }}>
                {row.map((tile, tileIdx) =>
                    <View
                        key={tileIdx}
                        style={{
                            borderColor: '#d5d5d6',
                            borderWidth: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '1',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: (this.state.width >= 20 || this.state.height >= 20) ? '7.5px' : '12px'
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.boardClickHandler(rowIdx, tileIdx)}
                        >
                            <Text>{tile ? tile : null}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        );

        return (
            <View style={styles.container}>

                {rows}
                <View style={{
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity style={buttonStyles.button}  onPress={this.clearGrid}>
                    <Text>Clear Grid</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttonStyles.button}  onPress={this.copyGrid}>
                    <Text>Copy To Clipboard</Text>
                </TouchableOpacity>
                </View>

                <View style={inputStyles.dimension}>
                    <Text >Height: </Text>
                    <TextInput
                        style={inputStyles.input}
                        keyboardType="number-pad"
                        onChangeText={(height) => this.setState({ height })}
                        value={this.state.height}
                    />
                </View>
                <View style={inputStyles.dimension}>
                    <Text >Width: </Text>
                    <TextInput
                        style={inputStyles.input}
                        keyboardType="number-pad"
                        onChangeText={(width) => this.setState({ width })}
                        value={this.state.width}
                    />
                </View>

            </View>
        )
    }
}