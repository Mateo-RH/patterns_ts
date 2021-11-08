abstract class Command<State> {
  abstract excecute(state: State): State;
}

class CommandStack<State> {
  private stack: string[] = [];

  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  excecute(command: Command<State>) {
    const stringState = JSON.stringify(command.excecute(this.state));
    this.stack.push(stringState);
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }
}

class AddOne extends Command<number> {
  excecute(state: number) {
    return state + 1;
  }
}

class SubtractOne extends Command<number> {
  excecute(state: number) {
    return state - 1;
  }
}

class SetValue extends Command<number> {
  constructor(private value: number) {
    super();
  }

  excecute(state: number) {
    return this.value;
  }
}

const cs = new CommandStack(0);

console.log(cs.state);
cs.excecute(new AddOne());
console.log(cs.state);
cs.undo();
console.log(cs.state);

cs.excecute(new SubtractOne());
console.log(cs.state);
cs.undo();
console.log(cs.state);

cs.excecute(new SetValue(42));
console.log(cs.state);
cs.undo();
console.log(cs.state);
