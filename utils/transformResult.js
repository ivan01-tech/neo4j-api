
function transformResult(result) {
	return result.records.map((record) => {
		return record._fields.map((r) => ({ ...r.properties, id: r.elementId }));
	});
}

export default transformResult