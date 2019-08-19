import PropTypes from 'prop-types';

//All three of the these components are taking the exact
//same props and just rendering different layouts, so this
//maybe isn't the worst thing in the world...

export default {
	community: PropTypes.object,
	channel: PropTypes.object,
	topicId: PropTypes.string,
	commentId: PropTypes.string,
	sortOn: PropTypes.string,
	setSortOn: PropTypes.func,
	layout: PropTypes.string,
	setLayout: PropTypes.func,
	size: PropTypes.string,

	topicWindowClassName: PropTypes.string
};