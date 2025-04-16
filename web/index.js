const wasm = await WebAssembly.instantiateStreaming(fetch("/wasm.wasm"), {
	env: {
		console_log: (ptr, len) => {
			const bytes = new Uint8Array(wasm.instance.exports.memory.buffer, ptr, len);
			const msg = new TextDecoder("utf-8").decode(bytes);
			console.log(msg);
		},
	},
});

wasm.instance.exports.hello();
