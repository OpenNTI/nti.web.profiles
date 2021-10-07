import { Info } from '@nti/web-course';

export function ErrorMessage({ error }) {
	error = Info.TranscriptCredit.getError(error);
	return !error ? null : (
		<div
			className="error"
			css={css`
				color: var(--primary-red);
				text-align: center;
				max-width: 600px;
				padding: 25px 25px 0;
			`}
		>
			{error.message || error}
		</div>
	);
}
