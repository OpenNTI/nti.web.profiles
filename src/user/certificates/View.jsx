import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Loading } from '@nti/web-commons';

import Group from '../achievements/Group';

import CertificatePreview from './CertificatePreview';
import Store from './Store';

const empty = x => !x || !x.length;

const t = scoped('nti-web-profile.certificates.View', {
	title: 'Certificates',
	inProgress: 'In Progress',
	completed: 'Completed',
	noneInProgress: 'No courses in progress',
	noneCompleted: 'No completed courses',
});

class ProfileCertificatesView extends React.Component {
	static hasData(user) {
		return user.hasLink('Certificate');
	}

	static propTypes = {
		entity: PropTypes.object.isRequired,
		store: PropTypes.object,
		loading: PropTypes.bool,
		inProgressCourses: PropTypes.arrayOf(PropTypes.object),
		completedCourses: PropTypes.arrayOf(PropTypes.object),
		inlineCertificatePreview: PropTypes.bool,
	};

	static defaultProps = {
		inlineCertificatePreview: true,
	};

	componentDidMount() {
		const { store, entity } = this.props;

		store.loadCertificates(entity);
	}

	renderCertificatePreview = course => {
		return (
			<CertificatePreview
				key={course.CatalogEntry.ProviderUniqueID}
				course={course}
				inlineCertificatePreview={this.props.inlineCertificatePreview}
			/>
		);
	};

	renderCertificates(courses, emptyMessage) {
		if (!courses || courses.length === 0) {
			// empty state;
			return <div className="empty-state">{emptyMessage}</div>;
		}

		return (
			<div className="certificate-list">
				{courses.map(this.renderCertificatePreview)}
			</div>
		);
	}

	render() {
		const { loading, entity, inProgressCourses, completedCourses } =
			this.props;

		const userContext = (entity || {}).isAppUser ? 'me' : 'them';
		const isEmpty =
			!loading &&
			userContext === 'them' &&
			empty(inProgressCourses) &&
			empty(completedCourses);

		return isEmpty ? null : (
			<Group className="nti-profile-certificates" title={t('title')}>
				<div className="content">
					<div className="items-container in-progress">
						<div className="subtitle">{t('inProgress')}</div>
						{loading ? (
							<Loading.Ellipsis />
						) : (
							this.renderCertificates(
								inProgressCourses,
								t('noneInProgress')
							)
						)}
					</div>
					<div className="items-container completed">
						<div className="subtitle">{t('completed')}</div>
						{loading ? (
							<Loading.Ellipsis />
						) : (
							this.renderCertificates(
								completedCourses,
								t('noneCompleted')
							)
						)}
					</div>
				</div>
			</Group>
		);
	}
}

export default decorate(ProfileCertificatesView, [
	Store.connect({
		loading: 'loading',
		inProgressCourses: 'inProgressCourses',
		completedCourses: 'completedCourses',
	}),
]);
