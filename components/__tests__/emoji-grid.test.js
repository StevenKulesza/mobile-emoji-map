import React from 'react';
import { shallow, mount } from 'enzyme';
import EmojiGrid from './emoji-grid';

describe('EmojiGrid', () => {

	it('renders without throwing', () => {
		shallow(
			<EmojiGrid 
				thumbnail='foo.jpg'
				username='foobar'
				time='0:00'
				message='foo bar'
				grid={[[null]]}
				clearGrid={()=> jest.fn()}
				copyToClipBoard={()=> jest.fn()} 
			/>
		);
	});

	it('triggers "clearGrid" when shadow is clicked', () => {
		const clearGrid = jest.fn();
		const emojiGrid = shallow(<EmojiGrid clearGrid={clearGrid} />);
		emojiGrid.find('.emoji-grid__clear').simulate('click');
		expect(clearGrid).toBeCalled();
	});

	it('triggers "copyToClipBoard" when shadow is clicked', () => {
		const copyToClipBoard = jest.fn();
		const emojiGrid = shallow(<EmojiGrid copyToClipBoard={copyToClipBoard} />);
		emojiGrid.find('.emoji-grid__copy').simulate('click');
		expect(copyToClipBoard).toBeCalled();
	});

});
