
import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import ContactsIcon from './ContactsIcon';
import ContactsText from './ContactsText';
import EntryContainer from './EntryContainer';

const translation = scoped('nti-profiles.social.Panel', {
	contacts: 'Contacts',
});

const Translate = Text.Translator(translation);

export default function ContactsButton() {
	return (
		<LinkTo.Path to="contacts">
			<EntryContainer>
				<ContactsIcon />
				<ContactsText>
					<Translate localeKey="contacts" />
				</ContactsText>
			</EntryContainer>
		</LinkTo.Path>
	);
}
