# promised-state

A state container

## Usage

```js
import { PromisedState } from 'promised-state';

const state = { name: 'bouzuya' };
const promised = new PromisedState(state);
promised.update(({ name }) => {
  return { name: name + '!' };
});
promised.update(({ name }) => {
  return { name: name + '?' };
});
promised
  .value()
  .then(({ name }) => {
    console.log(name); // bouzuya!?
  });
```

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
