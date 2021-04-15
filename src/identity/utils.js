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

				switch (propertyName) {
					case 'editable':
						return target !== MISSING;

					case 'show':
						return value || kind.toLowerCase();

					case 'presence':
						// recursively call ourselves on 'show' to pick up the fill-in-the-blank logic
						return (
							receiver.show
								// presence calls "chat" state "available"
								.replace('chat', 'available')
								// offline is 'unavailable'
								.replace('offline', 'unavailable')
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
