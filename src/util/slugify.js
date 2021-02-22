// format for css class name or element id: '-fooBar_Baz! boom?' => 'foo-bar-baz-boom'
const slugify = x =>
	x &&
	x.replace &&
	x
		.replace(/^[\W_]*(.*?)[\W_]*$/, '$1') // trim leading/trailing non-word chars
		.replace(/([a-z])([A-Z])/g, '$1-$2') // hyphenate camel case
		.replace(/[\W_]/g, '-') // replace non-word chars with hyphens
		.toLowerCase();

export default slugify;
