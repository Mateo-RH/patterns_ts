type CommandFunction<State> = (state: State) => State;

function createCommandStack<State>(state: State) {
  const stack: string[] = [JSON.stringify(state)];

  return {
    excecute(command: CommandFunction<State>) {
      const currentState = JSON.parse(stack[stack.length - 1]);
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));
      return newState;
    },

    undo() {
      if (stack.length > 1) {
        stack.pop();
      }
      return JSON.parse(stack[stack.length - 1]);
    },
  };
}

const addOne: CommandFunction<number> = (state) => state + 1;
const createSetValue =
  (value: number): CommandFunction<number> =>
  () => {
    return value;
  };

const cStack = createCommandStack(0);
console.log(cStack.excecute(addOne));
console.log(cStack.undo());

const set42 = createSetValue(42);
console.log(cStack.excecute(set42));
console.log(cStack.undo());
