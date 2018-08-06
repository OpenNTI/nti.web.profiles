import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Loading} from '@nti/web-commons';

import CertificatePreview from './CertificatePreview';
import Store from './Store';

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

	renderInProgressCourses () {
		const {inProgressCourses} = this.props;

		if(!inProgressCourses || inProgressCourses.length === 0) {
			// empty state;
		}

	}

	render () {
		const {loading, inProgressCourses, completedCourses} = this.props;

		return (
			<div className="nti-profile-certificates">
				<div className="header">
					{t('title')}
				</div>
				<div className="content">
					<div className="certificates-container in-progress">
						<div className="subtitle">
							{t('inProgress')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderCertificates(inProgressCourses, t('noneInProgress'))}
					</div>
					<div className="certificates-container completed">
						<div className="subtitle">
							{t('completed')}
						</div>
						{loading ? <Loading.Ellipsis/> : this.renderCertificates(completedCourses, t('noneCompleted'))}
					</div>
				</div>
			</div>
		);
	}
}
