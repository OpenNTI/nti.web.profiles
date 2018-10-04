import {scoped} from '@nti/lib-locale';

import {ensureArray as arr} from '../../../../util';

const t = scoped('nti-profile-edit.server-error-messages', {
	EmailAddressInvalid: 'The email address you have entered is not valid.',
	unknown: 'An error occurred processing your request.'
});


function getMessage ({Message, message = Message, code} = {}) {
	return message || (code && !t.isMissing(code) && t(code)) || t('unknown');
}

export default function getMessages (errors) {
	return arr(errors).map(getMessage);
}
