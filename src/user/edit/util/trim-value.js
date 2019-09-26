export default function trimValue (value) {
	if(!value) {
		return value;
	}

	if (typeof value === 'string') { return value.trim() || null; }

	if (Array.isArray(value)) {
		return value.map(trimValue);
	}

	if (value instanceof Date) {
		return value.toISOString();
	}

	if (typeof value === 'object') {
		return Object.entries(value)
			.reduce((out, [key, inner]) => ({...out, [key]: trimValue(inner)}), {});
	}

	return value;
}
