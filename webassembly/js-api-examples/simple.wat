(module
  (global $g (import "imports" "global") (mut i32))
  (func $i (import "imports" "write") (param i32))
  (func (export "write")
    i32.const 42
    call $i)
  (func $add (param $p i32)
    (global.set $g (i32.add (local.get $p) (local.get $p)))
  )
  (export "add" (func $add))
)
