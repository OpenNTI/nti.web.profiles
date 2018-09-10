import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {Loading} from '@nti/web-commons';
import cx from 'classnames';

import {Card, EntityList} from '../../common';

const t = scoped('nti-web-profile.memberships', {
	empty: 'Not currently a member of any groups.',
	community: 'Communities',
	dynamicfriendslist: 'Groups'
});

const slugify = string => string.toLowerCase().replace(/\W/g, '-');
const lastWord = mimeType => mimeType.split('.').slice(-1)[0];
const groupTitle = mimeType => t(lastWord(mimeType));
const cssClass = mimeType => slugify(lastWord(mimeType));

export default class View extends React.Component {

	static propTypes = {
		className: PropTypes.string,
		user: PropTypes.object.isRequired,
	}

	state = {}

	componentDidMount () {
		const {user} = this.props;
		const stream = user && user.getMemberships();

		if (stream) {
			this.setState({stream});
			stream.on('change', this.onStreamChange);
		}
	}

	componentWillUnmount () {
		const {stream} = this.state;

		if (stream) {
			stream.removeListener('change', this.onStreamChange);
		}
	}

	onStreamChange = e => this.forceUpdate();

	render () {
		const {className} = this.props;
		const {stream} = this.state;

		if (!stream) {
			return null;
		}

		const {loading} = stream;
		const memberships = Array.from(stream);

		// group items by MimeType
		// e.g. {'app/vnd.community': [comm1, comm2], 'app/vnd.group': [group1, group2]}
		const buckets = memberships.reduce((result, item) => {
			result[item.MimeType] = [...(result[item.MimeType] || []), item];
			return result;
		}, {});

		return (
			<div className={cx(className, 'nti-profile-memberships')}>
				{ loading ? <Loading.Ellipsis /> : (
					Object.keys(buckets).length === 0 ? (
						<Card className="empty-state" title={t('empty')} />
					) : (
						Object.entries(buckets).map(([mimeType, items]) => (
							<EntityList key={mimeType} className={cssClass(mimeType)} title={groupTitle(mimeType)} entities={items} />
						))
					)
				) }
			</div>
		);
	}
}
