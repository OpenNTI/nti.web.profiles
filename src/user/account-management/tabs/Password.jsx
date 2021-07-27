import { scoped } from '@nti/lib-locale';
import { Button, Errors, Form, Input, useReducerState } from '@nti/web-commons';
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
	margin: 10px 0 10px 20px;
	color: var(--correct);
`;

const ErrorContainer = styled.div`
	margin: 10px 0 10px 20px;
`;

const initialState = { oldPassword: '', newPassword: '', repeatedPassword: '' };

export default function PasswordView() {
	const [{ success, inputs, error }, dispatch] = useReducerState({
		success: null,
		error: null,
		inputs: initialState,
	});

	const handleSubmit = async ({ json }) => {
		const { newPassword, oldPassword, repeatedPassword } = json;

		if (oldPassword === newPassword) {
			dispatch({ error: t('error.different'), success: null });
		} else if (newPassword !== repeatedPassword) {
			dispatch({ error: t('error.notMatching'), success: null });
		} else {
			try {
				const user = await getAppUser();
				await user.changePassword(newPassword, oldPassword);

				dispatch({ success: true, error: null, inputs: initialState });
			} catch (error) {
				dispatch({ error });
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
									dispatch({
										inputs: { ...inputs, [name]: value },
									})
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
