import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Loading} from '@nti/web-commons';

import {Card} from '../../common';

import getWidget from './widgets';
import {default as Store, LOADING, MEMBERSHIPS} from './Store';

const t = scoped('nti-web-profile.memberships', {
	empty: 'Not currently a member of any groups.'
});

export default
@Store.connect({
	[LOADING]: 'loading',
	[MEMBERSHIPS]: 'memberships'
})
class View extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
		store: PropTypes.object,
		loading: PropTypes.bool,
		memberships: PropTypes.array
	}

	static deriveBindingFromProps = ({user}) => user

	componentDidMount () {
		const {store, user} = this.props;
		store.load(user);
	}

	render () {
		const {loading, memberships = []} = this.props;

		const buckets = memberships.reduce((result, item) => {
			result[item.MimeType] = [...(result[item.MimeType] || []), item];
			return result;
		}, {});

		return (
			<div className="nti-profile-memberships">
				<div className="content">
					{ loading ? <Loading.Ellipsis /> : (
						Object.keys(buckets).length === 0 ? (
							<div className="empty-state">{t('empty')}</div>
						) : (
							Object.entries(buckets).map(([mimeType, items]) => {
								const C = getWidget(mimeType);
								return !C ? null : (
									<Card key={mimeType} title={C.title} >
										<C items={items} />
									</Card>
								);
							})
						)
					) }
				</div>
			</div>
		);
	}
}
