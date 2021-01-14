import EntryContainer from './EntryContainer';

const ContactsIcon = styled.div`
		background: url('./assets/contacts.png');
`;

export default function ContactsButton () {

	return (
		<EntryContainer>
			<ContactsIcon />
		</EntryContainer>
	);
}
