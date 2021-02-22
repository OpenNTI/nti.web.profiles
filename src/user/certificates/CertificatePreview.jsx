import React from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { DateTime, Prompt, Iframe } from '@nti/web-commons';

import Progress from './Progress';

const t = scoped('nti-web-profile.certificates.View', {
	earned: 'Earned',
	certificateTitle: 'Certificate of Completion for %(title)s',
});

export default class CertificatePreview extends React.Component {
	static propTypes = {
		course: PropTypes.object.isRequired,
		showPreviewFrame: PropTypes.bool,
	};

	state = {};

	onImgClick = () => {
		this.setState({ showCertificate: true });
	};

	hideCertificate = () => {
		this.setState({
			showCertificate: false,
		});
	};

	renderPreviewImage() {
		const { course, showPreviewFrame } = this.props;

		const certLink = course.getLink('Certificate');

		if (showPreviewFrame) {
			return <div className="preview-image" onClick={this.onImgClick} />;
		}

		return (
			<a href={certLink} target="_blank" rel="noopener noreferrer">
				<div className="preview-image"></div>
			</a>
		);
	}

	render() {
		const { course } = this.props;
		const { CatalogEntry, CourseProgress } = course;

		const certLink = course.getLink('Certificate');

		return (
			<div
				key={CatalogEntry.ProviderUniqueID}
				className="certificate-preview"
			>
				{this.state.showCertificate && (
					<Prompt.Dialog onBeforeDismiss={this.hideCertificate}>
						<Iframe
							downloadable
							src={certLink}
							title={t('certificateTitle', {
								title: CatalogEntry.title,
							})}
						/>
					</Prompt.Dialog>
				)}
				{this.renderPreviewImage()}
				<div className="course-title">{CatalogEntry.Title}</div>
				{CourseProgress.getCompletedDate() ? (
					<div className="completed-date">
						{t('earned') +
							' ' +
							DateTime.format(CourseProgress.getCompletedDate())}
					</div>
				) : (
					<Progress
						pct={Math.floor(
							CourseProgress.PercentageProgress * 100
						)}
					/>
				)}
			</div>
		);
	}
}
