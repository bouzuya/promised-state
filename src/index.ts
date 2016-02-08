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
    return this.state
      .then(state => {
        const updaters = this.updaterQueue;
        this.updaterQueue = [];
        return updaters
          .reduce(
            (promised, updater) => promised.then(updater),
            Promise.resolve(state)
          );
      })
      .then(state => {
        this.state = Promise.resolve(state);
        return state;
      });
  }
}

export { PromisedState };