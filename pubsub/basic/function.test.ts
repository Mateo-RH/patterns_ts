import { createSubscribable } from "./Subscribable-function";

const sub = createSubscribable<string>();
const unsubscribe = sub.subscribe(console.log);

sub.publish("Hello");
sub.publish("whatever");

unsubscribe();
sub.publish("goodbye");
