import React, { useCallback, useRef } from 'react';

import { scoped } from '@nti/lib-locale';
import {
	Errors,
	Form,
	Input,
	useReducerState,
	useService,
} from '@nti/web-commons';
import { getAppUser } from '@nti/web-client';
import { AsyncAction } from '@nti/web-core';

import { ChangeDisallowed } from './ChangeDisallowed';

const t = scoped('nti.web-profiles.user.account-management.tabs.password', {
	oldPassword: 'Old Password',
	newPassword: 'New Password',
	repeatedPassword: 'Verify Password',
	save: 'Save Password',
	error: {
		required: '%(name) is required.',
		different: 'Old and new passwords must be different.',
		notMatching: 'Passwords do not match.',
		empty: 'All fields are required.',
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

const stop = e => (e.preventDefault(), e.stopPropagation());
const toJSON = form => {
	const json = {};
	for (const element of form.elements) {
		json[element.name] = element.value;
	}
	return json;
};

export function Password() {
	const service = useService();
	const form = useRef();
	const [{ disabled, success, error }, dispatch] = useReducerState({
		disabled: true,
		success: null,
		error: null,
	});

	const handleSubmit = useCallback(async () => {
		const { newPassword, oldPassword, repeatedPassword } = toJSON(
			form.current
		);

		if (oldPassword === newPassword) {
			dispatch({ error: t('error.different'), success: null });
			throw Error(t('error.different'));
		} else if (newPassword !== repeatedPassword) {
			dispatch({ error: t('error.notMatching'), success: null });
			throw Error(t('error.notMatching'));
		} else {
			try {
				const user = await getAppUser();
				await user.changePassword(newPassword, oldPassword);

				dispatch({
					success: true,
					error: null,
				});
			} catch (error) {
				dispatch({ error, success: null });
				throw error;
			}
		}
	}, []);

	const handleChange = () => {
		const { newPassword, oldPassword, repeatedPassword } = toJSON(
			form.current
		);

		dispatch({
			disabled: !(newPassword && oldPassword && repeatedPassword),
			error: null,
		});
	};

	if (!service.capabilities.canChangePassword) {
		return <ChangeDisallowed />;
	}

	return (
		<StyledForm
			onSubmit={stop}
			onChange={handleChange}
			ref={form}
			data-testid="change-password-form"
		>
			<InputsContainer>
				{['oldPassword', 'newPassword', 'repeatedPassword'].map(
					(name, index) => (
						<Clearable
							onClear={input => {
								input.value = '';
								handleChange();
							}}
							key={index}
						>
							<PasswordInput
								required
								name={name}
								placeholder={t(name)}
								data-testid={`input-${name}`}
							/>
						</Clearable>
					)
				)}
			</InputsContainer>

			{success && (
				<Success data-testid="change-password-success">
					{t('success')}
				</Success>
			)}
			<ErrorContainer data-testid="change-password-error">
				<Errors.Message error={error} />
			</ErrorContainer>

			<ButtonContainer>
				<AsyncAction
					type="submit"
					onClick={handleSubmit}
					disabled={disabled}
					data-testid="change-password-submit-btn"
				>
					{t('save')}
				</AsyncAction>
			</ButtonContainer>
		</StyledForm>
	);
}
