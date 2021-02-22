import Registry from './Registry';
import Default from './default';

import './osde';
import './sallt';

const registry = Registry.getInstance();

export function getCmpForType(type, baseType) {
	return (
		registry.getItemFor(type) || registry.getItemFor(baseType) || Default
	);
}
