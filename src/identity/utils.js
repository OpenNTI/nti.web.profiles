import { pop } from '@nti/lib-commons';

const STATE_LABELS = {
	// missing keys use the keys as the string.
	DND: 'Do Not Disturb',
};

export function ensureStates(pref) {
	const MISSING = {};

	// wrap the preference key so we can add properties without mutating the model.
	// This maps show, status, and presence (two of which keys do not exist on the
	// model and re computed by the bucket name "kind")
	const wrap = (v, _, kind) =>
		new Proxy(v || MISSING, {
			get(target, propertyName, receiver) {
				const value = Reflect.get(...arguments);
				const kindType = kind.toLowerCase();

				switch (propertyName) {
					case 'editable':
						return target !== MISSING;

					case 'type':
						return (
							value ??
							(kindType === 'offline' ||
							receiver.presence === 'unavailable'
								? 'unavailable'
								: 'available')
						);

					case 'show':
						return (
							value ??
							(kindType
								.replace('active', '')
								// nothing makes any sense about 'show' property.
								// Available and unavailable both use 'chat'?! as a value.
								.replace('available', 'chat')
								// offline is unavailable, which is denoted as ''??
								.replace('offline', '') ||
								null)
						);

					case 'presence':
						// recursively call ourselves on 'show' to pick up the fill-in-the-blank logic
						return (
							receiver.show
								// presence calls "chat" state "available"
								?.replace('chat', 'available') || 'unavailable'
						);

					case 'status':
						// return the status string or an empty string...if pref hasn't loaded, return null.
						return value || (!pref ? null : '');

					case 'defaultLabel':
						return STATE_LABELS[kind] || kind;
				}

				return value;
			},
		});

	// Build/get preference keys on request.
	return new Proxy(pref || MISSING, {
		// Add a read filter to trap property reads so we can wrap them.
		get: (...args) =>
			wrap(
				// pull the value of the target
				Reflect.get(...args),
				// give the wrapper access to these args
				...args
			),
	});
}

/**
 * Clean the input object of matching key/values pairs, returning the removed entries.
 *
 * @template {string | number | symbol} K
 * @template {*} V
 * @param {Object.<K,V>} props input object to search
 * @param {(key: K, value: V) => boolean} predicate a callback function to decide if the entry should be culled.
 * @param {Object.<K,V>} [collection] A starting collection to add the culled entries to. An empty one will be used if not provided.
 * @returns {Object.<K,V>} The collection of culled entries removed from the input object.
 */
export function collectProps(props, predicate, collection = {}) {
	return Object.keys(props).reduce(
		(out, prop) => (
			predicate(prop, props[prop]) && (out[prop] = pop(props, prop)), out
		),
		collection
	);
}
