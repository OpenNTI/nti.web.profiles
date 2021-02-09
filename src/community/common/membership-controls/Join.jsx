import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {Button, Flyout, Text, Loading, Errors} from '@nti/web-commons';

import Store from './Store';
import Styles from './Join.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.commuunity.common.membership-controls.Join', {
	join: 'Join',
	leave: 'Leave Community'
});

class CommunityJoinButton extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			community: props.community,
			onNoAccess: props.onNoAccess
		};
	}

	static propTypes = {
		className: PropTypes.string,
		community: PropTypes.object,
		showLeave: PropTypes.bool,
		onNoAccess: PropTypes.func,

		joined: PropTypes.bool,
		join: PropTypes.func,
		leave: PropTypes.func,
		canJoin: PropTypes.bool,
		canLeave: PropTypes.bool,
		joining: PropTypes.bool,
		leaving: PropTypes.bool,
		error: PropTypes.any
	}

	flyout = React.createRef()

	get canChange () {
		const {joined, canJoin, canLeave} = this.props;

		return (joined && canLeave) || (!joined && canJoin);
	}


	onTriggerClick = (e) => {
		const {joined, join, error} = this.props;

		if (joined || error) { return; }

		e.stopPropagation();
		e.preventDefault();

		if (join) {
			join();
		}
	}

	leave = () => {
		const {leave} = this.props;

		if (this.flyout && this.flyout.current) {
			this.flyout.current.doClose();
		}

		if (leave) {
			leave();
		}
	}


	render () {
		const {joined, showLeave} = this.props;

		if (!this.canChange) { return null; }
		if (joined && !showLeave) { return null; }

		const trigger = this.renderTrigger();

		return (
			<Flyout.Triggered
				ref={this.flyout}
				trigger={trigger}
				verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
				horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
			>
				{this.renderBody()}
			</Flyout.Triggered>
		);
	}


	renderTrigger () {
		const {joined, className, joining, leaving, error} = this.props;
		const changing = joining || leaving;
		const showJoined = !changing && joined && !error;

		const cls = cx('community-join', className, {
			joined: showJoined,
			joining,
			leaving,
			error
		});


		return (
			<Button className={cls} rounded onClick={this.onTriggerClick}>
				<Text.Base>{t('join')}</Text.Base>
				{changing && (<Loading.Spinner className={cx('joining-spinner')} white />)}
				{error && (<i className={cx('icon-alert', 'joining-error-icon')} />)}
				{showJoined && (<span className={cx('joined-ellipsis')}>...</span>)}
			</Button>
		);
	}


	renderBody () {
		const {error, canLeave} = this.props;

		if (error) {
			return (<Errors.Message error={error} className={cx('join-error-message')} />);
		}

		if (canLeave) {
			return (
				<Button className={cx('community-join-leave')} onClick={this.leave}>
					<Text.Base>{t('leave')}</Text.Base>
				</Button>
			);
		}
	}
}

export default decorate(CommunityJoinButton, [
	Store.connect(['joined', 'canJoin', 'canLeave', 'join', 'leave', 'joining', 'leaving', 'error'])
]);
