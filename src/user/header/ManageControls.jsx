import React from 'react';
import PropTypes from 'prop-types';
import {getService, User as UserResolver} from '@nti/web-client';
import {User, Layouts} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import MessageButton from './MessageButton';

const {Responsive} = Layouts;

const t = scoped('nti-web-profiles.user.header.ManageControls', {
	message: 'Message',
	follow: 'Follow',
	unfollow: 'Unfollow',
	isOffline: 'is offline',
	user: 'User'
});

export default class ManageControls extends React.Component {

	static propTypes = {
		entity: PropTypes.object.isRequired
	}

	state = {
		loading: true
	}

	componentDidMount () {
		const {entity} = this.props;

		this.setupFor(entity);
	}

	componentDidUpdate (prevProps) {
		if(prevProps.entity.getID() !== this.props.entity.getID()) {
			this.setupFor(this.props.entity);
		}
	}

	async setupFor (entity) {
		const service = await getService();
		const ds = service.getContacts();

		const resolved = await UserResolver.resolve({entity});

		if(this.unmounting) {
			return;
		}

		this.ds = ds;
		this.ds.addListener('change', this.onDataSourceChanged);
		this.isDesktop = !Responsive.isMobileContext();

		this.setState({loading: false, displayName: resolved.displayName, isContact: ds.contains(entity)});
	}

	componentWillUnmount () {
		this.unmounting = true;

		if(this.ds) {
			this.ds.removeListener('change', this.onDataSourceChanged);
		}
	}

	onDataSourceChanged = () => {
		this.setState({isContact: this.ds.contains(this.props.entity)});
	}

	follow = async () => {
		const {entity} = this.props;

		try {
			await this.ds.addContact(entity);
		}
		catch (e) {
			this.setState({error: e.message || 'Could not add contact'});
		}
	}

	unfollow = async () => {
		const {entity} = this.props;

		try {
			await this.ds.removeContact(entity);
		}
		catch (e) {
			this.setState({error: e.message || 'Could not remove contact'});
		}
	}

	renderNonContactButtons () {
		return (
			<div className="non-contact profile-manage-controls">
				<div className="nti-button follow" onClick={this.follow}><i className="icon-addfriend"/>{t('follow')}</div>
			</div>
		);
	}

	renderContactButtons () {
		const {entity} = this.props;
		const {displayName} = this.state;

		return (
			<div className="contact profile-manage-controls">
				{this.isDesktop && (
					<User.Presence user={entity}>
						<MessageButton entity={entity} displayName={displayName || t('user')}/>
					</User.Presence>
				)}
				<div className="nti-button unfollow" onClick={this.unfollow}><i className="icon-unfollow"/>{t('unfollow')}</div>
			</div>
		);
	}

	render () {
		const {loading, isContact} = this.state;

		if(loading) {
			return null;
		}

		return isContact ? this.renderContactButtons() : this.renderNonContactButtons();
	}
}
