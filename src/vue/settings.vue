<template lang="html">
<span>
    {{hidden}}
</span>
</template>

<script>
export default {
    props: 'hidden',
    data: _ => {return {
        hidden,
    }}
}
</script>

<style lang="css">
</style>
