import React from 'react';
import { shallow, mount } from 'enzyme';
import EmojiPaint from './emoji-paint';

describe('EmojiPaint', () => {

	it('renders without throwing', () => {
		shallow(<EmojiPaint emoji={['foo']} />);
	});

});
