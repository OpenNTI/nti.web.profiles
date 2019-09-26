export default function mergeGroupFields (...groups) {
	let mergedGroups = [];
	let seenFields = {};

	for (let group of groups.reverse()) {
		let mergedGroup = [];

		for (let field of group) {
			const {name} = field.schema;

			if (!seenFields[name]) {
				mergedGroup.push(field);
			}

			seenFields[name] = true;
		}

		if (mergedGroup.length) {
			mergedGroups.push(mergedGroup);
		}
	}

	return mergedGroups;
}
