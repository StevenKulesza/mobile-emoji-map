import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Button,
  Clipboard,
  Text,
  TextInput
} from 'react-native'

import { makeArray } from './utils';
import styles from './styles/grid';

const DEFAULT_HEIGHT = '8';
const DEFAULT_WIDTH = '10';

export default class Grid extends Component {
  constructor() {
    super()
    this.state= {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        grid: [
            [[], [], [], []], 
            [[], [], [], []], 
            [[], [], [], []],
        ],
      text: 'hello world',
      message: 'painting'
    }
  }

  boardClickHandler(rowIdx, tileIdx) {
      rowIdx = 1; 
      tileIdx = 1;

      this.setState(() => {
          let update = [...this.state.grid];
          let message = '';

          if (this.state.action === 'brush') {
              update[rowIdx][tileIdx] = this.state.activeEmoji;
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
			arr.map(emoji => {
				if (emoji === null) return text += ':blank:';
				else return text += emoji.shortcode;
			})
			return text += '\r\n';
		});

        await Clipboard.setString(text);
        alert('Copied to Clipboard!');
	}

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View
              style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
          </View>
        </TouchableWithoutFeedback>


        <Button onPress={this.clearGrid} title={'Clear Grid'}/>
        <Button onPress={this.copyGrid} title={'Copy Emojis'}/>


        <Text>Height: </Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            keyboardType="number-pad"
            onChangeText={(height) => this.setState({ height })}
            value={this.state.height}
        />
        <Text>Width: </Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            keyboardType="number-pad"
            onChangeText={(width) => this.setState({width})}
            value={this.state.width}
        />
      </View>
    )
  }
}