import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Loading} from '@nti/web-commons';

import Group from '../achievements/Group';

import CertificatePreview from './CertificatePreview';
import Store from './Store';

const empty = x => !x || !x.length;

const t = scoped('nti-web-profile.certificates.View', {
	title: 'Certificates',
	inProgress: 'In Progress',
	completed: 'Completed',
	noneInProgress: 'No courses in progress',
	noneCompleted: 'No completed courses'
});

export default
@Store.connect({
	loading: 'loading',
	inProgressCourses: 'inProgressCourses',
	completedCourses: 'completedCourses'
})
class ProfileCertificatesView extends React.Component {
	static propTypes = {
		entity: PropTypes.object.isRequired,
		store: PropTypes.object,
		loading: PropTypes.bool,
		inProgressCourses: PropTypes.arrayOf(PropTypes.object),
		completedCourses: PropTypes.arrayOf(PropTypes.object),
		showPreviewFrame: PropTypes.bool
	}

	static defaultProps = {
		showPreviewFrame: true
	}

	componentDidMount () {
		const {store, entity} = this.props;

		store.loadCertificates(entity);
	}

	renderCertificatePreview = (course) => {
		return <CertificatePreview key={course.CatalogEntry.ProviderUniqueID} course={course} showPreviewFrame={this.props.showPreviewFrame}/>;
	}

	renderCertificates (courses, emptyMessage) {
		if(!courses || courses.length === 0) {
			// empty state;
			return <div className="empty-state">{emptyMessage}</div>;
		}

		return (
			<div className="certificate-list">
				{courses.map(this.renderCertificatePreview)}
			</div>
		);
	}

	render () {
		const {loading, entity, inProgressCourses, completedCourses} = this.props;

		const userContext = (entity || {}).isAppUser ? 'me' : 'them';
		const isEmpty = !loading && userContext === 'them' && empty(inProgressCourses) && empty(completedCourses);

		return isEmpty ? null : (
			<Group className="nti-profile-certificates" title={t('title')}>
				<div className="content">
					<div className="items-container in-progress">
						<div className="subtitle">
							{t('inProgress')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderCertificates(inProgressCourses, t('noneInProgress'))}
					</div>
					<div className="items-container completed">
						<div className="subtitle">
							{t('completed')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderCertificates(completedCourses, t('noneCompleted'))}
					</div>
				</div>
			</Group>
		);
	}
}
