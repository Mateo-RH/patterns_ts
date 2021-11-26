abstract class Command<State> {
  abstract excecute(state: State): State;
  abstract undo(state: State): State;
}

class CommandStackConflict<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  // Conflict commit

  excecute(command: Command<State>) {
    const a = 1 + 2;
    this.stack.push(command);
    this._state = command.excecute(this._state);
    return a;
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
