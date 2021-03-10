import React from 'react';
import PropTypes from 'prop-types';

import { LinkTo } from '@nti/web-routing';
import { Flyout } from '@nti/web-commons';

export default class MoreItemsMenu extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		getLabel: PropTypes.func.isRequired,
	};

	attachFlyoutRef = x => (this.flyout = x);

	dismissFlyout = () => {
		if (this.flyout) {
			this.flyout.dismiss();
		}
	};

	render() {
		const { items = [], getLabel } = this.props;

		return !items || items.length === 0 ? null : (
			<Flyout.Triggered
				trigger={
					<a href="#" className="profile-nav-more-trigger">
						&middot;&middot;&middot;
					</a>
				}
				ref={this.attachFlyoutRef}
				className="profile-more-items-menu"
				verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
				horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
				arrow
				dark
			>
				<ul
					className="profile-nav-sub-items"
					onClick={this.dismissFlyout}
				>
					{items.map((item, index) => {
						const { path, name } = item;
						const label = getLabel(item);
						return (
							<li key={index} className="profile-nav-item">
								<LinkTo.Name
									key={path}
									name={name}
									data-title={label}
									activeClassName="active"
								>
									{label}
								</LinkTo.Name>
							</li>
						);
					})}
				</ul>
			</Flyout.Triggered>
		);
	}
}
