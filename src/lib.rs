#![no_std]
#![no_main]

mod component;
mod console;
mod panic;

#[unsafe(no_mangle)]
pub extern "C" fn init() {
    let message = "Hello from rust + wasm";
    console::log(message);

    component::new("HelloComponent", "hello-component", message);
    component::attach("body", "hello-component");
}
