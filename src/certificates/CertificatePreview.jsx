import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {DateTime, Prompt, Iframe} from '@nti/web-commons';

import Progress from './Progress';

const t = scoped('nti-web-profile.certificates.View', {
	earned: 'Earned',
	certificateTitle: 'Certificate of Completion for %(title)s',
});

export default class CertificatePreview extends React.Component {
	static propTypes = {
		course: PropTypes.object.isRequired
	}

	state = {}

	onImgClick = () => {
		this.setState({showCertificate: true});
	}

	hideCertificate = () => {
		this.setState({
			showCertificate: false
		});
	}

	render () {
		const {course} = this.props;
		const {CatalogEntry, CourseProgress} = course;

		const certLink = course.getLink('Certificate');

		return (
			<div key={CatalogEntry.ProviderUniqueID} className="certificate-preview">
				{this.state.showCertificate && (
					<Prompt.Dialog onBeforeDismiss={this.hideCertificate}>
						<Iframe src={certLink} title={t('certificateTitle', {title: CatalogEntry.title})} />
					</Prompt.Dialog>
				)}
				<div className="preview-image" onClick={this.onImgClick}>
				</div>
				<div className="course-title">
					{CatalogEntry.Title}
				</div>
				{CourseProgress.getCompletedDate()
					? <div className="completed-date">{t('earned') + ' ' + DateTime.format(CourseProgress.getCompletedDate(), 'LL')}</div>
					: <Progress pct={Math.floor(CourseProgress.PercentageProgress * 100)}/>}
			</div>
		);
	}
}
