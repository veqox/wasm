#![no_std]
#![no_main]

mod console;
mod panic;

#[unsafe(no_mangle)]
pub extern "C" fn hello() {
    let message = "Hello from rust + wasm";
    console::log(message);
}
