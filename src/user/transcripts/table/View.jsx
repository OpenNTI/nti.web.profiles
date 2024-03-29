import './View.scss';

import { Loading, Table } from '@nti/web-commons';
import { useStoreValue } from '@nti/lib-store';

import TitleColumn from './columns/Title';
import DateColumn from './columns/Date';
import TypeColumn from './columns/Type';
import ValueColumn from './columns/Value';
import OptionsColumn from './columns/Options';

const columns = [
	TitleColumn,
	DateColumn,
	TypeColumn,
	ValueColumn,
	OptionsColumn,
];

export default function TranscriptTable() {
	const { loading, items } = useStoreValue();

	return loading ? (
		<Loading.Ellipsis />
	) : (
		<div className="nti-profile-transcripts-table">
			<Table.Table
				items={items}
				columns={columns}
				css={css`
					table&& {
						table-layout: auto !important;
						@media (max-width: 700px) {
							width: auto;
						}
					}
				`}
			/>
		</div>
	);
}
