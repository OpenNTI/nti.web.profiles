import { useState } from 'react';

import { scoped } from '@nti/lib-locale';
import { Button, Errors, Form, Input } from '@nti/web-commons';
import { getAppUser } from '@nti/web-client';

const t = scoped('nti.web-profiles.user.account-management.tabs.password', {
	oldPassword: 'Old Password',
	newPassword: 'New Password',
	repeatedPassword: 'Verify Password',
	save: 'Save Password',
	error: {
		required: '%(name) is required.',
		different: 'Old and new passwords must be different.',
		notMatching: 'Passwords do not match.',
	},
	success: 'Password changed successfully.',
});

const StyledForm = styled(Form)`
	width: 100%;
`;

const ButtonContainer = styled.div`
	border-top: 1px solid var(--border-grey) !important;
	overflow: hidden;
	display: flex;
	justify-content: flex-end;
`;

const InputsContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	padding: 20px;
`;

const Clearable = styled(Input.Clearable)`
	border: 1px solid var(--secondary-grey);
	background: #fff;
	margin-bottom: 10px;
	position: relative;
	display: block;
`;

const PasswordInput = styled(Input.Text).attrs({ type: 'password' })`
	color: var(--secondary-grey);
	border: 0;
	border-left: 10px solid var(--secondary-grey);
	background: #fff;
	width: 100%;
	border-radius: 0;

	.error {
		color: var(--incorrect);
		border-left: 10px solid var(--incorrect);
	}
`;

const Success = styled.div`
	margin-top: 10px;
	margin-left: 20px;
	color: var(--correct);
`;

const ErrorContainer = styled.div`
	margin-top: 10px;
	margin-left: 20px;
`;

const initialState = { oldPassword: '', newPassword: '', repeatedPassword: '' };

export default function PasswordView() {
	const [success, setSuccess] = useState(null);
	const [inputs, setInputs] = useState(initialState);
	const [error, setError] = useState(null);

	const handleSubmit = async ({ json }) => {
		const { newPassword, oldPassword, repeatedPassword } = json;

		if (oldPassword === newPassword) {
			setError(t('error.different'));
		} else if (newPassword !== repeatedPassword) {
			setError(t('error.notMatching'));
		} else {
			try {
				const user = await getAppUser();
				await user.changePassword(newPassword, oldPassword);

				setSuccess(true);
				setInputs(initialState);
			} catch (e) {
				setError(e);
			}
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<InputsContainer>
				{['oldPassword', 'newPassword', 'repeatedPassword'].map(
					(name, index) => (
						<Clearable key={index}>
							<PasswordInput
								value={inputs[name]}
								onChange={value =>
									setInputs({ ...inputs, [name]: value })
								}
								required
								name={name}
								placeholder={t(name)}
								data-testid={`input-${name}`}
							/>
						</Clearable>
					)
				)}
			</InputsContainer>

			{success && <Success data-testid="success">{t('success')}</Success>}
			{error && (
				<ErrorContainer data-testid="error">
					<Errors.Message error={error} />
				</ErrorContainer>
			)}

			<ButtonContainer>
				<Button
					as={Form.SubmitButton}
					disabled={
						!(
							inputs.newPassword &&
							inputs.oldPassword &&
							inputs.repeatedPassword
						)
					}
					data-testid="submit-btn"
				>
					{t('save')}
				</Button>
			</ButtonContainer>
		</StyledForm>
	);
}
