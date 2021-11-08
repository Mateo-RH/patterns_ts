type CommandFunction<State> = (
  state: State
) => [State, (state: State) => State];

function createCommandStack<State>(state: State) {
  const stack: ((state: State) => State)[] = [];
  let _state = state;

  return {
    excecute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },

    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    },
  };
}

const addOne: CommandFunction<number> = (state) => [
  state + 1,
  (state) => state - 1,
];

const createSetValue = (value: number): CommandFunction<number> => {
  return (state) => {
    const _originalState = state;
    return [value, () => _originalState];
  };
};

const cStack = createCommandStack(0);
console.log(cStack.excecute(addOne));
console.log(cStack.undo());

const set42 = createSetValue(42);
console.log(cStack.excecute(set42));
console.log(cStack.undo());
