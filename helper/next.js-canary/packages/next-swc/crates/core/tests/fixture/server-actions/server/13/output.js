/* __next_internal_action_entry_do_not_use__ {"ac840dcaf5e8197cb02b7f3a43c119b7a770b272":"bar","c18c215a6b7cdc64bf709f3a714ffdef1bf9651d":"default"} */ import { createActionProxy } from "private-next-rsc-action-proxy";
import { encryptActionBoundArgs, decryptActionBoundArgs } from "private-next-rsc-action-encryption";
const foo = async function() {};
export default foo;
const bar = async function() {};
export { bar };
import { ensureServerEntryExports } from "private-next-rsc-action-validate";
ensureServerEntryExports([
    foo,
    bar
]);
createActionProxy("c18c215a6b7cdc64bf709f3a714ffdef1bf9651d", foo);
createActionProxy("ac840dcaf5e8197cb02b7f3a43c119b7a770b272", bar);
