import React from 'react';

import './emoji-picker.css';

export default ({ emoji, onSelect, onClose }) => (
	<div>
		<div className="emoji-picker">
			<ul className="emoji-picker__list">
				{emoji && emoji.map((e,i) => (
					<li key={e.symbol + i}>
						<button className="emoji-picker__control" onClick={() => onSelect(e)}>
							{e.symbol}
						</button>
					</li>
				))}
			</ul>
			<span className="emoji-picker__caret" />
		</div>
		<div className="emoji-picker__shadow" onClick={onClose} />
	</div>
);
