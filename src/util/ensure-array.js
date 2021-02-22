export default function ensureArray(x) {
	return x == null ? [] : Array.isArray(x) ? x : [x];
}
