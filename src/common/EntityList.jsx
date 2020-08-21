import './EntityList.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Card from './Card';
import EntityCard from './EntityCard';

export default class EntityList extends React.Component {

	static propTypes = {
		className: PropTypes.string,
		entities: PropTypes.array,
		title: PropTypes.string
	}

	render () {
		const {entities, className, ...props} = this.props;

		return (entities || []).length === 0 ? null : (
			<Card className={cx('profiles-entity-list', className)} {...props}>
				<ul className="entity-list-items">
					{entities.map((entity, i) => (
						<li key={i}><EntityCard entity={entity} /></li>
					))}
				</ul>
			</Card>
		);
	}
}
