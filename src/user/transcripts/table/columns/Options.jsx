import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Prompt, Flyout} from '@nti/web-commons';

import UserAwardedCreditView from '../../userawarded/View';

const t = scoped('nti-web-profile.transcripts.table.columns.Options', {
	edit: 'Edit',
	delete: 'Delete'
});

export default class Options extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		store: PropTypes.object
	}

	static cssClassName = 'options-col';

	attachFlyoutRef = x => this.flyout = x

	launchUserAwardedEditor = () => {
		const {store, item} = this.props;

		this.flyout.dismiss();

		UserAwardedCreditView.show(store.getEntity(), item);
	}

	deleteUserAwardedCredit = () => {
		const {store, item} = this.props;

		this.flyout.dismiss();

		Prompt.areYouSure('Do you want to delete this credit?').then(() => {
			store.deleteUserAwardedCredit(item);
		});
	}

	renderTrigger () {
		return <div className="credit-row-option-trigger"><i className="icon-settings"/></div>;
	}

	render () {
		const {item} = this.props;

		if(!item.isAddRow && item.hasLink('edit')) {
			return (
				<Flyout.Triggered
					className="credit-row-options"
					trigger={this.renderTrigger()}
					ref={this.attachFlyoutRef}
					horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
				>
					<div>
						<div className="credit-row-option" onClick={this.launchUserAwardedEditor}>{t('edit')}</div>
						<div className="credit-row-option delete" onClick={this.deleteUserAwardedCredit}>{t('delete')}</div>
					</div>
				</Flyout.Triggered>
			);
		}

		return null;
	}
}
