import PropTypes from 'prop-types';

const styles = css`
	.header {
		border-bottom: 1px solid var(--primary-grey);
		padding: 5px 10px;
		position: relative;
	}

	.title {
		color: #fff;
		font-size: 14px;
		font-weight: 200;
	}

	.close {
		position: absolute !important;
		right: 20px;
		top: 10px;
		cursor: pointer;
	}
`;

PanelHeader.propTypes = {
	onCollapseClick: PropTypes.func.isRequired,
};

export default PanelHeader = ({ onCollapseClick }) => {
	return (
		<div className={styles.header}>
			<Text className={styles.title}>Messenger</Text>
			<div className={styles.close} onClick={onCollapseClick}><i className="icon-light-x" /></div>
		</div>
	);
}
