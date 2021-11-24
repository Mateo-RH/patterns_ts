// Testing worktree
abstract class Command<State> {
  abstract excecute(state: State): State;
  abstract undo(state: State): State;
}
//new changes

class CommandStack<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  excecute(command: Command<State>) {
    this._state = command.excecute(this._state);
    this.stack.push(command);
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

class AddOne extends Command<number> {
  excecute(state: number) {
    return state + 1;
  }

  undo(state: number) {
    return state - 1;
  }
}

class SubtractOne extends Command<number> {
  excecute(state: number) {
    return state - 1;
  }

  undo(state: number) {
    return state + 1;
  }
}

class SetValue extends Command<number> {
  private _originalValue?: number;

  constructor(private value: number) {
    super();
  }

  excecute(state: number) {
    this._originalValue = state;
    return this.value;
  }

  undo() {
    return this._originalValue!;
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
