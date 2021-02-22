import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@nti/web-commons';

import Container from './Container';
const { Responsive } = Layouts;

export default class TranscriptsView extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
	};

	state = {};

	renderWithSidePanel = () => {
		return <Container showSidePanel {...this.props} />;
	};

	renderWithoutSidePanel = () => {
		return <Container {...this.props} />;
	};

	renderFilterAsModal = () => {
		return <Container showFiltersAsModal {...this.props} />;
	};

	isLargeView = ({ containerWidth }) => {
		return containerWidth >= 1024;
	};

	isMediumView = ({ containerWidth }) => {
		return containerWidth < 1024 && containerWidth >= 400;
	};

	isSmallView = ({ containerWidth }) => {
		return containerWidth < 400;
	};

	render() {
		return (
			<div className="nti-profile-transcripts-view">
				<Responsive.Container>
					<Responsive.Item
						query={this.isLargeView}
						render={this.renderWithSidePanel}
					/>
					<Responsive.Item
						query={this.isMediumView}
						render={this.renderWithoutSidePanel}
					/>
					<Responsive.Item
						query={this.isSmallView}
						render={this.renderFilterAsModal}
					/>
				</Responsive.Container>
			</div>
		);
	}
}
