import { useState } from 'react';

import { scoped } from '@nti/lib-locale';
import { Button, Form, Input } from '@nti/web-commons';
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
	padding: 20px 10px;
	width: 100%;
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
	background: #fff;
	margin-bottom: 10px;
	position: relative;
	display: block;
`;

const PasswordInput = styled(Form.Input.Text).attrs({ type: 'password' })`
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
	margin: 10px 0;
	color: var(--correct);
`;

const initialState = { oldPassword: '', newPassword: '', repeatedPassword: '' };

export default function PasswordView() {
	const [success, setSuccess] = useState(null);
	const [inputs, setInputs] = useState(initialState);

	const handleSubmit = async ({ json }) => {
		const { newPassword, oldPassword, repeatedPassword } = json;

		if (oldPassword === newPassword) {
			const e = new Error(t('error.different'));
			e.field = 'newPassword';
			throw e;
		} else if (newPassword !== repeatedPassword) {
			const e = new Error(t('error.notMatching'));
			e.field = 'repeatedPassword';
			throw e;
		} else {
			const user = await getAppUser();
			await user.changePassword(newPassword, oldPassword);

			setSuccess(true);
			setInputs(initialState);
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
							/>
						</Clearable>
					)
				)}
			</InputsContainer>

			{success && <Success>{t('success')}</Success>}

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
				>
					{t('save')}
				</Button>
			</ButtonContainer>
		</StyledForm>
	);
}
