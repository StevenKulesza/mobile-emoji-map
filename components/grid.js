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
            [['😀'], ['😀'], ['😀'], ['😀']], 
            [['😀'], ['😀'], ['😀'], ['😀']], 
            [['😀'], ['😀'], ['😀'], ['😀']],
        ],
      text: 'hello world',
      message: 'painting',
      action:'brush'
    }
  }

  componentWillMount(){
      this.setState(() => ({
          grid: makeArray(this.state.width, this.state.height, '😀')
      }));
  }

  boardClickHandler(rowIdx, tileIdx) {
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
        <View key={rowIdx} style={{flex: 1, flexDirection: 'row'}}>
            {row.map((tile, tileIdx) => 
                <TouchableWithoutFeedback  
                    onPress={() => this.boardClickHandler(rowIdx, tileIdx)} 
                    style={{
                        borderColor: '1px solid #d5d5d6',
                        borderWidth: 1,
                         display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: (this.state.width >= 20 || this.state.height >= 20) ? '7.5px': '12px'
                    }}
                    key={tileIdx}>
                    <Text>{tile ? tile : null}</Text>
                </TouchableWithoutFeedback>
            )}
        </View>
    );

    return (
      <View style={styles.container}>
        
        {rows}


        <Button     onPress={this.clearGrid}    title={'Clear Grid'}/>
        <Button     onPress={this.copyGrid}     title={'Copy Emojis'}/>


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