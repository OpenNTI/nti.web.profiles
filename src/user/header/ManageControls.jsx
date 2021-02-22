import './ManageControls.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { getService, User as UserResolver } from '@nti/web-client';
import { User, Layouts, Loading, Button } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import MessageButton from './MessageButton';

const { Responsive } = Layouts;

const t = scoped('nti-web-profiles.user.header.ManageControls', {
	message: 'Message',
	follow: 'Follow',
	unfollow: 'Unfollow',
	isOffline: 'is offline',
	user: 'User',
});

export default class ManageControls extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
	};

	state = {
		loading: true,
	};

	componentDidMount() {
		const { entity } = this.props;

		this.setupFor(entity);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.entity.getID() !== this.props.entity.getID()) {
			this.setupFor(this.props.entity);
		}
	}

	async setupFor(entity) {
		const service = await getService();
		const ds = service.getContacts();

		const resolved = await UserResolver.resolve({ entity });

		if (this.unmounting) {
			return;
		}

		this.ds = ds;
		this.ds.addListener('change', this.onDataSourceChanged);
		this.isDesktop = !Responsive.isMobileContext();

		this.setState({
			loading: false,
			displayName: resolved.displayName,
			isContact: ds.contains(entity),
		});
	}

	componentWillUnmount() {
		this.unmounting = true;

		if (this.ds) {
			this.ds.removeListener('change', this.onDataSourceChanged);
		}
	}

	onDataSourceChanged = () => {
		this.setState({
			isContact: this.ds.contains(this.props.entity),
			saving: false,
		});
	};

	follow = async () => {
		if (this.state.saving) {
			return;
		}

		const { entity } = this.props;

		this.setState({ saving: true });

		try {
			await this.ds.addContact(entity);
		} catch (e) {
			this.setState({
				error: e.message || 'Could not add contact',
				saving: false,
			});
		}
	};

	unfollow = async () => {
		if (this.state.saving) {
			return;
		}

		const { entity } = this.props;

		this.setState({ saving: true });

		try {
			await this.ds.removeContact(entity);
		} catch (e) {
			this.setState({
				error: e.message || 'Could not remove contact',
				saving: false,
			});
		}
	};

	renderNonContactButtons() {
		const { saving } = this.state;

		return (
			<div className="non-contact profile-manage-controls">
				<Button
					className="follow"
					onClick={this.follow}
					disabled={saving}
				>
					{saving && (
						<div className="loading-container">
							<Loading.Spinner white />
						</div>
					)}
					<div className="content">
						<i className="icon-addfriend" />
						<span>{t('follow')}</span>
					</div>
				</Button>
			</div>
		);
	}

	renderContactButtons() {
		const { entity } = this.props;
		const { displayName, saving } = this.state;

		return (
			<div className="contact profile-manage-controls">
				{this.isDesktop && !saving && (
					<User.Presence user={entity}>
						<MessageButton
							entity={entity}
							displayName={displayName || t('user')}
						/>
					</User.Presence>
				)}
				<Button
					className="unfollow"
					onClick={this.unfollow}
					disabled={saving}
				>
					{saving && (
						<div className="loading-container">
							<Loading.Spinner white />
						</div>
					)}
					<div className="content">
						<i className="icon-unfollow" />
						<span>{t('unfollow')}</span>
					</div>
				</Button>
			</div>
		);
	}

	render() {
		const { loading, isContact } = this.state;

		if (loading) {
			return null;
		}

		return isContact
			? this.renderContactButtons()
			: this.renderNonContactButtons();
	}
}
