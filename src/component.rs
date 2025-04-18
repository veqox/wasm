unsafe extern "C" {
    // name_ptr, name_len, tag_ptr, tag_len, template_ptr, template_len
    fn component_new(
        name_ptr: *const u8,
        name_len: usize,
        tag_ptr: *const u8,
        tag_len: usize,
        template_ptr: *const u8,
        template_len: usize,
    );

    fn component_attach(
        element_ptr: *const u8,
        element_len: usize,
        tag_ptr: *const u8,
        tag_len: usize,
    );
}

pub fn new(name: &str, tag: &str, template: &str) {
    unsafe {
        component_new(
            name.as_ptr(),
            name.len(),
            tag.as_ptr(),
            tag.len(),
            template.as_ptr(),
            template.len(),
        )
    };
}

pub fn attach(element: &str, tag: &str) {
    unsafe { component_attach(element.as_ptr(), element.len(), tag.as_ptr(), tag.len()) };
}
