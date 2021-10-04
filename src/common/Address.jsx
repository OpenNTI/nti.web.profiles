import React from 'react';

export const FullName = styled.div`
	display: block;
`;

export const Street1 = styled.div`
	display: block;
`;

export const Street2 = styled.div`
	display: block;
`;

export const City = styled.div`
	display: block;
`;

export const State = styled.div`
	display: block;
`;

export const Zip = styled.div`
	display: block;
`;

export const Country = styled.div`
	display: block;
`;

const AddressContainer = styled.div`
	border: none;
	padding: 0;

	display: grid;
	grid-template: auto / auto auto auto;
	column-gap: 0.25rem;

	&.input {
		grid-template: auto / 1fr 25% 25%;
		gap: 0.25rem;

		${City}::after {
			content: '';
		}
	}

	${FullName} {
		grid-row: 1 / 2;
		grid-column: 1 / -1;
	}

	${Street1} {
		grid-row: 2 / 3;
		grid-column: 1 / -1;
	}

	${Street2} {
		grid-row: 3 / 4;
		grid-column: 1 / -1;
	}

	${City} {
		grid-row: 4 / 5;

		&::after {
			content: ',';
		}
	}

	${State} {
		grid-row: 4 / 5;
	}

	${Zip} {
		grid-row: 4 / 5;
	}

	${Country} {
		grid-row: 5 / 6;
		grid-column: 1 / -1;
	}
`;

export function Address({ address, children, ...otherProps }) {
	if (React.Children.count(children) > 0) {
		return <AddressContainer {...otherProps}>{children}</AddressContainer>;
	}

	return (
		<AddressContainer {...otherProps}>
			<FullName>{address['full_name']}</FullName>
			<Street1>{address['street_address_1']}</Street1>
			<Street2>{address['street_address_2']}</Street2>
			<City>{address['city']}</City>
			<State>{address['state']}</State>
			<Zip>{address['postal_code']}</Zip>
			<Country>{address['country']}</Country>
		</AddressContainer>
	);
}
