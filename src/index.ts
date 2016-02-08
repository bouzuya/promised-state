export type PromisedStateUpdater<T> = (state: T) => T | Promise<T>;

class PromisedState<T> {
  private state: Promise<T>;
  private updaterQueue: PromisedStateUpdater<T>[];

  constructor(initial: T) {
    this.updaterQueue = [];
    this.state = Promise.resolve(initial);
  }

  update(updater: PromisedStateUpdater<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const wrapped = (state: T): Promise<T> => {
        return Promise
          .resolve(state)
          .then(updater)
          .then((state: T) => {
            resolve(state);
            return state;
          }, reject);
      };
      this.updaterQueue.push(wrapped);
      setTimeout(() => this.value());
    });
  }

  value(): Promise<T> {
    this.state = this.state
      .then(state => {
        const update = this.updaterQueue.shift();
        return update ? update(state) : state;
      });
    return this.state;
  }
}

export { PromisedState };