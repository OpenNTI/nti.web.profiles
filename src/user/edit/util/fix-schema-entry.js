export default function fixSchemaEntry(entry) {
	if (entry.type === 'string' && entry.choices) {
		return { ...entry, type: 'Choice' };
	}

	return entry;
}
