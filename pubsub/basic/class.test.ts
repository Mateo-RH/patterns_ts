import { Subscribable } from "./Subscribable-class";

const sub = new Subscribable<string>();
const unsubscribe = sub.subscribe(console.log);

sub.publish("Hello");
sub.publish("whatever");

unsubscribe();
sub.publish("goodbye");

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsubscribe = dc.subscribe((v: number) => console.log(`DC: ${v}`));
const dcUnsubscribe2 = dc.subscribe((v: number) => console.log(`DC2: ${v}`));
dc.setValue(42);
dcUnsubscribe();
dcUnsubscribe2();
