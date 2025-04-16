use crate::console;
use core::panic::PanicInfo;

#[panic_handler]
fn panic(info: &PanicInfo) -> ! {
    loop {
        if let Some(message) = info.message().as_str() {
            console::log(message);
        }
    }
}
