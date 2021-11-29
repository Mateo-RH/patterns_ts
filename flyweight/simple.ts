function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType) {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

type ObservableMessage<T> = {
  target: T;
  prop: string;
};

type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => () => void;
};
