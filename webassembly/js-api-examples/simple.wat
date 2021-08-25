(module
  (func $i (import "imports" "write") (param i32))
  (func (export "write")
    i32.const 42
    call $i))
