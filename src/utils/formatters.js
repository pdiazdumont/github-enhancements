const toReadableSize = function(size, isKylobyte) {
	if (isKylobyte) {
		size *= 1024
	}

	if (size === 0) {
		return {
			bytes: 0,
			text: 'Bytes'
		}
	}

	let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(size) / Math.log(1024))

	return {
		bytes: parseFloat((size / Math.pow(1024, i)).toFixed(2)),
		text: sizes[i]
	}
}

export { toReadableSize }
