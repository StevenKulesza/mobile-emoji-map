import React, { Component } from 'react';
import EmojiPicker from './emoji-picker';
import EmojiGrid from './emoji-grid';
import { makeArray, copyAnyToClipboard, resizeArray } from './utils'

import './emoji-paint.css';

const DEFAULT_HEIGHT = 8;
const DEFAULT_WIDTH = 10;

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeEmoji: props.emoji[0],
			height: DEFAULT_HEIGHT,
			width: DEFAULT_WIDTH,
			isEmojiPickerShowing: false,
			action: 'brush',
			message: 'brush selected',
			grid: [],
			username: 'Jane Doe',
			thumbnail: 'slackbot_32.png',
			time: new Date().toLocaleTimeString(navigator.language, {
				hour: '2-digit',
				minute: '2-digit'
			})
		};

		this.toggleBrush 		= this.toggleBrush.bind(this);
		this.toggleEraser 		= this.toggleEraser.bind(this);
		this.toggleEmojiPicker 	= this.toggleEmojiPicker.bind(this);
		this.updateActiveEmoji 	= this.updateActiveEmoji.bind(this);
		this.handleClick 		= this.handleClick.bind(this);
		this.handleMouseOver 	= this.handleMouseOver.bind(this);
		this.clearGrid 			= this.clearGrid.bind(this);
		this.copyToClipBoard 	= this.copyToClipBoard.bind(this);
	}

	componentWillMount() {
		this.updateMinuteClock = setInterval(() => this.setState({
			time: new Date().toLocaleTimeString(navigator.language, {
				hour: '2-digit',
				minute: '2-digit'
			})
		}), 10000);

		this.setState(() => ({
			grid: makeArray(this.state.width, this.state.height, null)
		}));
	}

	componentWillUnmount() {
		clearInterval(this.updateMinuteClock);
	}

	/**
	 * Toggle the visibility of the emoji picker
	 */
	toggleEmojiPicker() {
		this.setState(({ isEmojiPickerShowing }) => ({
			isEmojiPickerShowing: !isEmojiPickerShowing
		}));
	}

	/**
	 * Toggle the brush tool
	 */
	toggleBrush() {
		this.setState(() => ({
			action: 'brush',
			message: 'brush selected'
		}));
	}

	/**
	 * Toggle the eraser tool
	 */
	toggleEraser() {
		this.setState(() => ({
			action: 'erase',
			message: 'eraser selected'
		}));
	}

	/**
	 * Set the currently active emoji symbol
	 * @param {String} emoji - the next active emoji
	 */
	updateActiveEmoji(emoji) {
		this.setState(() => ({
			activeEmoji: emoji,
			isEmojiPickerShowing: false,
			action:'brush',
			message: 'brush selected'
		}));
	}

	/**
	 * Update the canvas dimensions based on new height and/or width
	 * @param {Object} dimensions - new dimensions
	 * @param {Number} dimensions.height - next height value
	 * @param {Number} dimensions.width - next width value
	 */
	onSizeChange({ height, width }) {
		const numberRX = /^[0-9\b]+$/;
		const maxMessage = 'max height 20 tiles & max width 25 tiles';
		let newGrid;
	
		if ((numberRX.test(height) || height === "") && (numberRX.test(width) || width === "")) {
			if (height <= 20 && width <= 25) {
				newGrid = resizeArray(this.state.grid, height, width, null);
				this.setState({
					height,
					width,
					grid: newGrid,
					message: (height === "20" || width === "25") ? 
						maxMessage : 'grid updated'
				})
			} else {
				this.setState({
					message: maxMessage
				})
			}
		} else {
			this.setState({
				message: 'must be valid interger'
			})
		}
	}

	/**
	 * Update a tile with new value when clicked
	 * @param {Number} rowIdx - row index to update
	 * @param {Number} tileIdx - tile index to update
	 */
	handleClick(rowIdx, tileIdx) {
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
	 * Update a tile with new value when moused over and clicked
	 * @param {Object} evt - hover event listener
	 * @param {Number} rowIdx - row index to update
	 * @param {Number} tileIdx - tile index to update
	 */
	handleMouseOver(evt, rowIdx, tileIdx) {
		if (evt.buttons === 1 || evt.buttons === 3) this.handleClick(rowIdx, tileIdx) 
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
	copyToClipBoard() {
		let text = ''
		this.state.grid.map(arr => {
			arr.map(emoji => {
				if (emoji === null) return text += ':blank:';
				else return text += emoji.shortcode;
			})
			return text += '\r\n';
		});

		copyAnyToClipboard(text);

		this.setState(() => ({
			message: 'emoji art copied'
		}));
	}


	/**
	 * Render the EmojiPaint component
	 * @return {ReactElement} - EmojiPaint element
	 */
	render() {
		const { activeEmoji, isEmojiPickerShowing, grid, height, width, thumbnail, username, time, message, action } = this.state;
		const rows = grid.map((row, rowIdx) =>
			<li key={rowIdx} className="emoji-grid__row">
				<ul>
					{row.map((tile, tileIdx) => 
					 <li  
						className="emoji-grid__tile" 
						onMouseOver={(evt)=> this.handleMouseOver(evt, rowIdx, tileIdx)}
						onClick={() => this.handleClick(rowIdx, tileIdx)} 
						style={{
							height: ((250 / height)) + 'px',
							width: ((400 / width)) + 'px',
							fontSize: (width >= 20 || height >= 20) ? '7.5px': '12px'
						}}
						key={tileIdx}>
						{tile ? tile.symbol : null}
					</li>
					)}
				</ul>
			</li>
		);
		return (
			<div className="emoji-paint">
				<div className="emoji-paint__toolbar">
					<div className="emoji-paint__controls">
						<button className="emoji-paint__control emoji-paint__picker" onClick={this.toggleEmojiPicker}>
							{activeEmoji.symbol}
						</button>
						<button 
							className = {(action === "brush" ? 'emoji-paint__control_active' : '') + " emoji-paint__control emoji-paint__brush"}
							onClick={this.toggleBrush}
						>
							<img className="emoji-paint__control_icon" src="brush.png" alt="brush" />
						</button>
						<button 
							className={(action === "erase" ? 'emoji-paint__control_active' : '') + " emoji-paint__control emoji-paint__eraser"} 
							onClick={this.toggleEraser}
						>
							<img className="emoji-paint__control_icon" src="eraser.png" alt="eraser" />
						</button>
						{isEmojiPickerShowing && (
							<EmojiPicker
								emoji={this.props.emoji}
								onSelect={(symbol) => this.updateActiveEmoji(symbol)}
								onClose={() => this.toggleEmojiPicker()}
							/>
						)}
					</div>
					<div>
						<label className="emoji-paint__dimension">
							Width
							<input
								type="number"
								step="1"
								max="25"
								className="emoji-paint__dimension_input"
								onChange={(e) => this.onSizeChange({ width: e.target.value, height: height })}
								value={width}
							/>
						</label>
						<label className="emoji-paint__dimension">
							Height
							<input
								type="number"
								step="1"
								max="20"
								className="emoji-paint__dimension_input"
								onChange={(e) => this.onSizeChange({ height: e.target.value, width: width })}
								value={height}
							/>
						</label>
					</div>
				</div>
				<EmojiGrid 
					thumbnail={thumbnail}
					username={username}
					time={time}
					message={message}
					grid={rows}
					clearGrid={this.clearGrid}
					copyToClipBoard={this.copyToClipBoard}
				/>
			</div>
		);
	}

}