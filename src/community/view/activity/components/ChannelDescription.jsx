import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './ChannelDescription.css';
import Card from './Card';

const cx = classnames.bind(Styles);

ChannelDescription.propTypes = {
	channel: PropTypes.shape({
		description: PropTypes.string
	})
};
export default function ChannelDescription ({channel}) {
	const {description} = channel || {};

	if (!description) { return null; }

	return (
		<Card className={cx('channel-description')}>
			<Text.Base>
				{description}
			</Text.Base>
		</Card>
	);
}