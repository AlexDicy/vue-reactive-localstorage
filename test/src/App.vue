<template>
    <div id="app">
        <h1>Test str and num</h1>
        <input type="text" v-model="storage.str" placeholder="type value for str"><br><br>
        <input type="number" v-model="storage.num" placeholder="type value for num">
        <h1>Test obj and arr</h1>
        <small>open Vue console to test below</small> <br><br>
        <input type="text" v-model="newKeyValueObj.key" placeholder="type new key for obj"> <input type="text" v-model="newKeyValueObj.value" placeholder="new value for obj">
        <button @click="addKeyValueToObj">add</button>
        <br><br>
        <input type="text" v-model="newValueToArr" placeholder="type new value for arr">
        <button @click="addValueToArr">add</button>
        <h2>Change thirdLevel.key3 value</h2>
        <input type="text" v-model="storage.firstLevel.secondLevel.thirdLevel.key3" placeholder="type value for str"><br><br>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            newKeyValueObj: {
                key: "",
                value: ""
            },
            newValueToArr: ""
        }
    },
    methods: {
        addKeyValueToObj() {
            this.storage[this.newKeyValueObj.key] = this.newKeyValueObj.value;
        },
        addValueToArr() {
            this.storage.arr.push(this.newValueToArr);
        }
    }
}
</script>
