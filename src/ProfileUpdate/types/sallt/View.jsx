import React from 'react';
import PropTypes from 'prop-types';

import Registry from '../Registry';

import Community from './CommunityGroup';
import Personality from './PersonalityGroup';

const type = 'ISALLTUserProfile';

const FIELD_TO_GROUP = {
	'church_community': 'community',
	'city_interest': 'community',
	cultures: 'community',
	initiatives: 'community',
	'myers_briggs': 'personality',
	'myers_briggs_response': 'personality',
	'giant_5_voices': 'personality',
	'giant_5_voices_response': 'personality',
	'five_q': 'personality',
	'five_q_response': 'personality'
};

@Registry.register(type)
class ProfileUpdateSalltProfile extends React.Component {
	static propTypes = {
		fields: PropTypes.array,
	}

	render () {
		const {fields, ...otherProps} = this.props;
		const {community, personality} = fields.reduce((acc, field) => {
			const name = field.schema.name;
			const group = FIELD_TO_GROUP[name];

			if (!group || !acc[group]) { return acc; }

			acc[group].push(field);
			return acc;
		}, {community: [], personality: []});

		return (
			<div className="profile-update-sallt-profile">
				{community && community.length > 0 && (<Community fields={community} {...otherProps} />)}
				{personality && personality.length > 0 && (<Personality fields={personality} {...otherProps} />)}
			</div>
		);
	}
}

export default ProfileUpdateSalltProfile;
