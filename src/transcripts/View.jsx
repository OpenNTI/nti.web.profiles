import React from 'react';
import PropTypes from 'prop-types';
import {Layouts} from '@nti/web-commons';

import Container from './Container';
const {Responsive} = Layouts;

export default class TranscriptsView extends React.Component {
	static propTypes = {
		entity: PropTypes.object
	}

	state = {}

	renderWithSidePanel = () => {
		return <Container showSidePanel {...this.props}/>;
	}

	renderWithoutSidePanel = () => {
		return <Container {...this.props}/>;
	}

	isLargeView = ({containerWidth}) => {
		return containerWidth >= 1024;
	}

	isSmallView = ({containerWidth}) => {
		return containerWidth < 1024;
	}


	render () {
		return (
			<div className="nti-profile-transcripts-view">
				<Responsive.Container>
					<Responsive.Item query={this.isLargeView} render={this.renderWithSidePanel}/>
					<Responsive.Item query={this.isSmallView} render={this.renderWithoutSidePanel}/>
				</Responsive.Container>
			</div>
		);
	}
}
