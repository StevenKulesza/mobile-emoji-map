import React from 'react'
import './emoji-grid.css';

/**
 * Render the EmojiGrid component
 * @return {ReactElement} - EmojiGrid element
 */
export default ({ thumbnail, username, time, message, grid, clearGrid, copyToClipBoard }) => (
	<div className='emoji-canvas__container'>
		<div className='emoji-user'>
			<img className='emoji-user__thumb' src={thumbnail} alt={username} /> 
			<div className='emoji-user__meta'>
				<span className='emoji-user__name'>{username}</span>{' '}
				<span className='emoji-user__time'>{time}</span>
			</div>
			<span className='emoji-user__message'>{message}</span>
		</div>
		<div className="emoji-grid__container">
			<div className="emoji-grid">
				<ul className="emoji-grid__list">
					{grid}
				</ul>
			</div>
		</div>
		<div className='emoji-actions'>
			<button className='emoji-btn secondary emoji-grid__clear' onClick={() => clearGrid()}>Clear</button>
			<button className='emoji-btn primary emoji-grid__copy' onClick={() => copyToClipBoard()}>Copy To Clipboard</button>
		</div>
	</div>
)