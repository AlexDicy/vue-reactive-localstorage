# Vue Reactive Storage
Reactive layer for interacting with localStorage from Vue 2.

### Quick install

`npm install --save https://github.com/HAlex/vue-reactive-storage`

* This package is not on NPM, use GitHub source only.

### Why do you need it

`window.localStorage` is not reactive if you use it directly with Vue, for example
if you want to use `localStorage` in `data` and you change a property it will not reflect
changes in your component.

```js
new Vue({
    data: {
      storage: window.localStorage
    },
    template: " <div> {{storage.notes}}, {{storage.lang}} ... </div> ",
    created: function() {
        this.storage.lang = "other value";
    }
})
```

### How to use Vue Reactive Storage

```js
import ReactiveStorage from "vue-reactive-storage";
// Set initial values
Vue.use(ReactiveStorage, {
    "notes": "foo",
    "lang": "foo",
    "name": "foo",
    "count": 1,
    "userConfig": {
        age: 10,
        name: "fred"
    }
});
```

Define vars that will be stored and proxied by `Vue` (any other var in `window.localStorage` that is not on this array will not be proxied).

Now you can acess the namespace <code>storage</code> in Vue.

```js
new Vue({
    template: " <div> {{storage.notes}}, {{storage.lang}} ... </div> ",
    created: function() {
        this.storage.lang = "other value"; // will react on the view and on real localStorage.
    }
})
```
