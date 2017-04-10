<template lang="html">
    <div style="display: inline-block">
        <span @click="value = !value" v-if="type=='checkbox'">
            {{type}} {{value}}
        </span>
        <span v-if="type=='file'">
            <input type="file" :name="label" :value="value">
        </span>
        <span v-if="type=='text'" contentEditable="true">
            sdaasd
        </span>
        <div v-if="type=='longtext'" contentEditable="true">
            asdasd
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
        value: {
            type: String|Number|Boolean
        },
        label: {
            type: String
        },
        dataChecker: {
            type: Function,
        }
    },
    data () {
        return {
            type,
            value,
        }
    }
}
</script>

<style lang="css">
</style>
