const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder("utf-8");

const fromRawParts = (ptr, len) => {
	const bytes = new Uint8Array(wasm.instance.exports.memory.buffer, ptr, len);
	return decoder.decode(bytes);
};

const createComponent = (name, tag, template) => {
	if (customElements.get(tag)) return;

	const component = new Function(`
		return class ${name} extends HTMLElement {
			constructor() {
				super();
    			const shadow = this.attachShadow({ mode: 'open' });
       			shadow.innerHTML = \`${template}\`;
			}
		}`)();

	customElements.define(tag, component);
};

const wasm = await WebAssembly.instantiateStreaming(fetch("/wasm.wasm"), {
	env: {
		console_log: (ptr, len) => {
			console.log(fromRawParts(ptr, len));
		},
		component_new: (name_ptr, name_len, tag_ptr, tag_len, template_ptr, template_len) => {
			const name = fromRawParts(name_ptr, name_len);
			const tag = fromRawParts(tag_ptr, tag_len);
			const template = fromRawParts(template_ptr, template_len);

			createComponent(name, tag, template);
		},
		component_attach: (element_ptr, element_len, tag_ptr, tag_len) => {
			const id = fromRawParts(element_ptr, element_len);
			const element = document.getElementById(id);

			const tag = fromRawParts(tag_ptr, tag_len);
			element.innerHTML = `<${tag}></${tag}>`;
		},
	},
});

wasm.instance.exports.init();
