import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import FormStore from '../../Store.js';

import Styles from './Style.css';
import CommunityStore from './Store';
import About from './About';
import DisplayName from './DisplayName';

const cx = classnames.bind(Styles);

export default
@FormStore.monitor(['register', 'unregister'])
@CommunityStore.connect()
class CommunityEditFormCommunityFields extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			register: props.register,
			unregister: props.unregister,
			community: props.community
		};
	}

	static propTypes = {
		community: PropTypes.object.isRequired,
	}


	render () {
		return (
			<div className={cx('community-fields')}>
				<DisplayName {...this.props} />
				<About {...this.props} />
			</div>
		);
	}
}