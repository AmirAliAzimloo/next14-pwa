/* __next_internal_action_entry_do_not_use__ {"6d53ce510b2e36499b8f56038817b9bad86cabb4":"$$ACTION_0"} */ import { createActionProxy } from "private-next-rsc-action-proxy";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
import f, { f1, f2 } from 'foo';
const f3 = 1;
var f4;
let f5;
const [f6, [f7, ...f8], { f9 }, { f10, f11: [f12], f13: f14, f15: { f16 }, ...f17 }, ...f18] = [];
if (true) {
    const g191 = 1;
}
function x() {
    const f2 = 1;
    const g201 = 1;
}
export function y(p, [p1, { p2 }], ...p3) {
    const f2 = 1;
    const f11 = 1;
    const f19 = 1;
    if (true) {
        const f8 = 1;
    }
    function action() {}
    return <Button action={createActionProxy("6d53ce510b2e36499b8f56038817b9bad86cabb4", $$ACTION_0).bind(null, encryptActionBoundArgs("6d53ce510b2e36499b8f56038817b9bad86cabb4", [
        f2,
        f11,
        p,
        p1,
        p2,
        p3
    ]))}>Delete</Button>;
}
export async function $$ACTION_0($$ACTION_CLOSURE_BOUND) {
    var [$$ACTION_ARG_0, $$ACTION_ARG_1, $$ACTION_ARG_2, $$ACTION_ARG_3, $$ACTION_ARG_4, $$ACTION_ARG_5] = await decryptActionBoundArgs("6d53ce510b2e36499b8f56038817b9bad86cabb4", $$ACTION_CLOSURE_BOUND);
    const f17 = 1;
    if (true) {
        const f18 = 1;
        const f19 = 1;
    }
    console.log(f, f1, $$ACTION_ARG_0, f3, f4, f5, f6, f7, f8, $$ACTION_ARG_0(f9), f12, $$ACTION_ARG_1, f16.x, f17, f18, $$ACTION_ARG_2, $$ACTION_ARG_3, $$ACTION_ARG_4, $$ACTION_ARG_5, g19, g20, globalThis);
}
