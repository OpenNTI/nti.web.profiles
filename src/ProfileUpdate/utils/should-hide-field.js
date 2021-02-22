const TYPE_TO_SHOULD_HIDE = {
	Choice: schema => !schema.choices || schema.choices.length === 0,
};

export default function shouldHideField(schema) {
	const shouldHide = TYPE_TO_SHOULD_HIDE[schema.type];

	return shouldHide && shouldHide(schema);
}
