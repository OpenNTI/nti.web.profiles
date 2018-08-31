import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import {MaybeEmpty} from '../../common';
import Badges from '../badges';
import Certificates from '../certificates';

const t = scoped('nti-web-profile.achievements', {
	empty: 'This user doesn’t have any visible badges or certificates.'
});


export default class View extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render () {
		const {user} = this.props;

		return !user ? null : (
			<MaybeEmpty message={t('empty')}>
				<div className="nti-profiles-achievements">
					<Badges entity={user} />
					<Certificates entity={user} />
				</div>
			</MaybeEmpty>
		);
	}
}
