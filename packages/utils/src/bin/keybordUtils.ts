export let isKeyDown = false;
export let keyCode = -1;

if (document) {
	document.addEventListener('keydown', (e: KeyboardEvent) => {
		isKeyDown = true;
		keyCode = e.keyCode;
	});

	document.addEventListener('keyup', () => {
		isKeyDown = false;
		keyCode = -1;
	});
}
