import store from "store";

const makeWatchers = (storage) => Object.keys(storage).reduce((acc, key) => {
    const vueKey = `storage.${key}`;
    // allow .bind
    const handler = function handler(value) {
        store.set(key, value);
    };

    return Object.assign({[vueKey]: {handler}}, acc);
}, {});

const ReactiveStorage = {
    install(Vue, options) {
        const local = store.getAll();
        const values = Object.keys(options).reduce((acc, key) => {
            const value = local[key] || options[key];
            return Object.assign({[key]: value}, acc);
        }, {});

        Vue.mixin({
            data() {
                return {
                    storage: values
                };
            },
            watch: makeWatchers(values)
        });
    }
};

export default ReactiveStorage;
