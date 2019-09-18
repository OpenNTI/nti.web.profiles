import React from 'react';
import classnames from 'classnames/bind';

import {AutoSubscribe} from '../../inputs';

import Store from './Store';
import Styles from './Style.css';

const cx = classnames.bind(Styles);

export default
@Store.monitor({'autoSubscribeRule': 'value', 'setAutoSubscribeRule': 'onChange', 'autoSubscribeRuleError': 'error'})
class CommunityEditAutoSubscribe extends React.Component {
	render () {
		return (
			<AutoSubscribe className={cx('community-edit-auto-subscribe')} {...this.props} />
		);
	}	
}