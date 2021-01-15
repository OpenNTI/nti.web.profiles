import React from 'react';
import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import EntryContainer from './EntryContainer';

const translation = scoped('nti-profiles.social.Panel', {
	contacts:'Contacts',
});

const Translate = Text.Translator(translation);

const ContactsIcon = styled.div`
	background: url("../assets/contacts.png");
	overflow: hidden;
	top: 1px;
	left: 1px;
	right: auto;
	width: 42px;
	height: 42px;
	position: absolute;
`;

const ContactsText = styled('div')`
	margin-left: 48px;
	position: relative;
	width: 150px;
	height: 42px;
	color: #fff;
	padding: 12px 4px 0 4px;
	overflow: hidden;
	font-size: 14px;
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export default function ContactsButton () {

	return (
		<EntryContainer>
			<ContactsIcon />
			<ContactsText>
				<LinkTo.Path to="contacts">
					<Translate localeKey="contacts" />
				</LinkTo.Path>
			</ContactsText>
		</EntryContainer>
	);
}
