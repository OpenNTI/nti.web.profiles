import Registry from './Registry';
import Default from './default';
import './sallt';

const registry = Registry.getInstance();

export function getCmpForType (type) {
	return registry.getItemFor(type) || Default;
}
