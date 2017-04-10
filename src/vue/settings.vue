<template lang="html">
<div class="settings" style="background-color:'black'; width: 100%; height: 100%">
    <ul>
        <li v-for="param in settingsList">
            <in :type="param.type" :value="param.value" :label="param.description"></in>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    components: {
        in: require ("./Components/In.vue"),
    },
    data () {
        return {
            settingsList : [
                {
                    description: "Show the sub header",
                    type: "checkbox",
                    value: true,
                },
                {
                    description: "Current file",
                    type: "file",
                },
                {
                    description: "Current file",
                    type: "text",
                },
                {
                    description: "Current file",
                    type: "longtext",
                },
            ]
        }
    },
}
</script>

<style lang="css">
</style>
