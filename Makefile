WASM_TARGET := wasm32-unknown-unknown
BUILD_MODE := release
OUT_DIR := web

build:
	cargo build --target=$(WASM_TARGET) --$(BUILD_MODE) -Z unstable-options --artifact-dir $(OUT_DIR)

build-stable:
	cargo build --target=$(WASM_TARGET) --$(BUILD_MODE)
	cp target/$(WASM_TARGET)/$(BUILD_MODE)/wasm.wasm $(OUT_DIR)/wasm.wasm

clean:
	rm -f $(OUT_DIR)/wasm.wasm
	cargo clean
