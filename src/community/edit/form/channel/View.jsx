import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import ChannelListStore from '../channel-list/Store';

import Styles from './Style.css';
import ChannelStore from './Store';
import DragHandle from './DragHandle';
import Title from './Title';
import Description from './Description';
import Delete from './Delete';

const cx = classnames.bind(Styles);

export default
@ChannelListStore.monitor(['register', 'unregister'])
@ChannelStore.connect(['deleted', 'readOnly'])
class ChannelFields extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			channel: props.channel,
			register: props.register,
			unregister: props.unregister
		};
	}

	static propTypes = {
		channel: PropTypes.object,
		deleted: PropTypes.bool
	}

	render () {
		const {deleted, readOnly} = this.props;

		if (deleted) { return null; }

		return (
			<div className={cx('channel-fields', {'read-only': readOnly})}>
				<DragHandle />
				<div className={cx('no-drag', 'meta')}>
					<div className={cx('contents')}>
						<Title />
						<Description />
					</div>
					<Delete />
				</div>
			</div>
		);	
	}
}