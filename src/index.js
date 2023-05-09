const keyBase = "vrs_";

const store = {
    _initialize(defaults) {
        const json = window.localStorage.getItem(keyBase);
        if (json === null) {
            window.localStorage.setItem(keyBase, JSON.stringify(defaults));
        } else {
            const storage = JSON.parse(json);
            this._objectDefaults(defaults, storage);
            window.localStorage.setItem(keyBase, JSON.stringify(storage));
        }
    },
    _objectDefaults(defaults, storage) {
        Object.keys(defaults).reduce((acc, key) => {
            if (typeof storage[key] === "object" && typeof defaults[key] === "object" && storage[key] !== null && defaults[key] !== null) {
                this._objectDefaults(defaults[key], storage[key]);
            } else {
                if (!storage.hasOwnProperty(key) || typeof storage[key] !== typeof defaults[key]) {
                    storage[key] = defaults[key];
                }
            }
            return acc;
        }, []);
    },
    getRaw() {
        const json = window.localStorage.getItem(keyBase);
        return JSON.parse(json);
    },
    setRaw(object) {
        const json = JSON.stringify(object);
        window.localStorage.setItem(keyBase, json);
    },
    set(key, value) {
        if (value === undefined) {
            return this.remove(key);
        }
        // Set value
        window.localStorage.setItem(keyBase + key, this.serialize(value));
        // Store key
        const keys = this.getKeys();
        if (keys.indexOf(key) === -1) {
            keys.push(key);
        }
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    get(key) {
        const value = window.localStorage.getItem(keyBase + key);
        return value === null ? null : this.deserialize(value);
    },
    remove(key) {
        const value = this.get(key);
        // Remove value
        window.localStorage.removeItem(keyBase + key);
        // Remove key
        const keys = this.getKeys();
        const index = keys.indexOf("test");
        if (index !== -1) keys.splice(index, 1);
        window.localStorage.setItem(keyBase, this.serialize(keys));

        return value;
    },
    getAll() {
        const items = [];
        const keys = this.getKeys();
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
        const keys = this.getKeys();
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
        const val = JSON.parse(json);
        return val !== undefined ? val : defaultValue;
    }
};

const ReactiveStorage = {
    store,
    install(Vue, options) {
        store._initialize(options);
        const values = store.getRaw();

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
