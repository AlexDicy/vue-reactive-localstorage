const keyBase = "vrs_";

const store = {
    _initialize(defaults) {
        let json = window.localStorage.getItem(keyBase);
        if (json === null) {
            window.localStorage.setItem(keyBase, JSON.stringify(defaults));
        } else {
            let storage = JSON.parse(json);
            this._objectDefaults(defaults, storage);
            window.localStorage.setItem(keyBase, JSON.stringify(storage));
        }
    },
    _objectDefaults(object, storage) {
        Object.keys(object).reduce((acc, key) => {
            let value = object[key];
            if (typeof value === "object") {
                this._objectDefaults(storage[key], value);
            } else {
                if (!storage.hasOwnProperty(key)) {
                    storage[key] = value;
                }
            }
            return acc;
        }, []);
    },
    getRaw() {
        let json = window.localStorage.getItem(keyBase);
        return JSON.parse(json);
    },
    setRaw(object) {
        let json = JSON.stringify(object);
        window.localStorage.setItem(keyBase, json);
    },
    set(key, value) {
        if (value === undefined) {
            return this.remove(key);
        }
        // Set value
        window.localStorage.setItem(keyBase + key, this.serialize(value));
        // Store key
        let keys = this.getKeys();
        if (keys.indexOf(key) === -1) {
            keys.push(key);
        }
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    get(key) {
        let value = window.localStorage.getItem(keyBase + key);
        return value === null ? null : this.deserialize(value);
    },
    remove(key) {
        let value = this.get(key);
        // Remove value
        window.localStorage.removeItem(keyBase + key);
        // Remove key
        let keys = this.getKeys();
        let index = keys.indexOf("test");
        if (index !== -1) keys.splice(index, 1);
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    getAll() {
        let items = [];
        let keys = this.getKeys();
        for (let i = 0; i < keys.length; i++) {
            items[keys[i]] = this.get(keys[i]);
        }
        return items;
    },
    getKeys() {
        return this.deserialize(window.localStorage.getItem(keyBase));
    },
    clear() {
        this.set(keyBase, "[]");
        let keys = this.getKeys();
        for (let i = 0; i < keys.length; i++) {
            this.remove(keyBase + keys[i]);
        }
    },
    serialize: function (object) {
        return JSON.stringify(object);
    },
    deserialize: function (json, defaultValue) {
        if (!json) {
            return defaultValue;
        }
        let val = JSON.parse(json);
        return val !== undefined ? val : defaultValue;
    }
};

const ReactiveStorage = {
    store,
    install(Vue, options) {
        store._initialize(options);
        let values = store.getRaw();

        Vue.mixin({
            data() {
                return {
                    get storage() {
                        return values;
                    }
                };
            },
            watch: {
                storage: {
                    handler() {
                        store.setRaw(this.storage);
                    },
                    deep: true
                }
            }
        });
    }
};

export default ReactiveStorage;
