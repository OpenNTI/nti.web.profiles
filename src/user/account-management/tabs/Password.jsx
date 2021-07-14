import { scoped } from '@nti/lib-locale';
import { Button, Error, Form, Input } from '@nti/web-commons';

import Store from '../Store';

const t = scoped('nti.web-profiles.user.account-management.tabs.password', {
	old: 'Old Password',
	new: 'New Password',
	verify: 'Verify Password',
	save: 'Save Password',
});

const StyledForm = styled(Form)`
	padding: 20px 10px;
	width: 100%;
`;

const ErrorContainer = styled.div`
	margin: 10px 0;
`;

const ButtonContainer = styled.div`
	margin-top: 40px;
	border-top: 1px solid var(--border-grey) !important;
	overflow: hidden;
	display: flex;
	justify-content: flex-end;
`;

const InputsContainer = styled.div`
	margin: 0 auto;
	width: 100%;
`;

const Clearable = styled(Input.Clearable)`
	border: 1px solid var(--secondary-grey);
	padding-right: 30px;
	background: #fff;
	margin: 0 34px 0 0;
	position: relative;
	display: block;
`;

const PasswordInput = styled(Input.Text).attrs({ type: 'password' })`
	color: var(--secondary-grey);
	font: normal 500 14px/25px 'Open Sans', sans-serif;
	border: 0;
	border-left: 10px solid var(--secondary-grey);
	background: #fff;
	padding: 6px 10px;
	margin: 0;
	min-height: 39px;
	width: calc(100% - 8px);
	position: relative;
	outline: none;
	display: block;
	border-radius: 0;
`;

export default function PasswordView() {
	const { handlePassword, error } = Store.useValue();

	return (
		<StyledForm onSubmit={handlePassword}>
			<InputsContainer>
				{['old', 'new', 'verify'].map((name, index) => (
					<Clearable key={index}>
						<PasswordInput
							required
							name={name}
							placeholder={t(name)}
						/>
					</Clearable>
				))}
			</InputsContainer>

			{error && (
				<ErrorContainer>
					<Error error={error} />
				</ErrorContainer>
			)}

			<ButtonContainer>
				<Button as={Form.SubmitButton}>{t('save')}</Button>
			</ButtonContainer>
		</StyledForm>
	);
}
