import { useState } from 'react';

import { scoped } from '@nti/lib-locale';
import { Button, Errors, Form, Input } from '@nti/web-commons';
import { getAppUser } from '@nti/web-client';

const t = scoped('nti.web-profiles.user.account-management.tabs.password', {
	old: 'Old Password',
	new: 'New Password',
	verify: 'Verify Password',
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

const ErrorContainer = styled.div`
	margin: 10px 0;
`;

const Success = styled.div`
	margin: 10px 0;
	color: var(--correct);
`;

const initialState = { old: '', new: '', verify: '' };

export default function PasswordView() {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [inputs, setInputs] = useState(initialState);

	const handleSubmit = async ({ json }) => {
		setError(null);

		const { new: newPassword, old, verify } = json;

		try {
			if (old === newPassword) {
				setError(t('error.different'));
			} else if (newPassword !== verify) {
				setError(t('error.notMatching'));
			} else {
				const user = await getAppUser();
				await user.changePassword(newPassword, old);

				setSuccess(true);
				setInputs(initialState);
			}
		} catch (e) {
			setError(e?.Message);
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<InputsContainer>
				{['old', 'new', 'verify'].map((name, index) => (
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
				))}
			</InputsContainer>

			{error && (
				<ErrorContainer>
					<Errors.Message error={error} />
				</ErrorContainer>
			)}

			{success && <Success>{t('success')}</Success>}

			<ButtonContainer>
				<Button
					as={Form.SubmitButton}
					disabled={!(inputs.new && inputs.old && inputs.verify)}
				>
					{t('save')}
				</Button>
			</ButtonContainer>
		</StyledForm>
	);
}
