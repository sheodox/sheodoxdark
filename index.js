const fs = require('fs/promises'),
	colorsFilePath = './sheodoxdark.json',
	outputFilePath = './pinto-sheodoxdark.json',
	colors = [
		['identifier', 'ff8f40'],
		['parameter', '399ee6'],
		['keyword', 'e6c446'],
		['string', 'aad94c'],
		['comment', '636a72'],
		['normal', 'e5e1cf'],
		['number', '39bae6'],
		['regexp', '94e6cb'],
		['error', 'f07178'],
		['todo', '6c5980'],
		['tag', '39bae6'],
		['symbol', 'd2a6ff'],
		['variable', '5ccfe6'],
		['static', '979748'],
		['normalBackground', '0e1419'],
		['menuBackground', '3b404a'],
		['menuSelectionBackground', '626875'],
		['colorColumn', '444b55'],
		['cursorLine', '131721'],
		['selection', '1b3a5b'],
	],
	colorMapping = {};

// turn each color identifier into a more unique string surrounded in <<>>
colors.forEach(([colorKey, color]) => {
	colorMapping[`<<${colorKey}>>`] = `#${color}`;
});


async function build() {
	const colorsWithKeywords = JSON.parse(await fs.readFile(colorsFilePath));
	

	for (const keywordName of Object.keys(colorsWithKeywords.theme.keywords)) {
		const keyword = colorsWithKeywords.theme.keywords[keywordName],
			bg = keyword.backgroundColor,
			fg = keyword.foregroundColor;

		if (colorMapping[bg]) {
			keyword.backgroundColor = colorMapping[bg];
		}
		if (colorMapping[fg]) {
			keyword.foregroundColor = colorMapping[fg];
		}
	}

	await fs.writeFile(outputFilePath, JSON.stringify(colorsWithKeywords));
}

build().catch(e => console.error(e));
