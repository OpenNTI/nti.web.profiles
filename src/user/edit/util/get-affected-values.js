const TYPES_TO_AFFECTED = {
	'IOPSRCUserProfile': (entity, change, schema) => {
		if (Object.prototype.hasOwnProperty.call(change,'affiliation') && change['affiliation'] !== entity['affiliation']) {
			return {'district_school': null};
		}
	}
};

export default function getAffectedValues (entity, change, type, schema) {
	const getAffected = TYPES_TO_AFFECTED[type];

	return getAffected ? getAffected(entity, change, schema) : {};
}
