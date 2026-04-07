// main.rs
#![no_std]
#![no_main]

use core::panic::PanicInfo;

/// Esta função é chamada em caso de pânico.
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}

#[unsafe(no_mangle)]
pub extern "C" fn _start() -> ! {
    loop {}
}

