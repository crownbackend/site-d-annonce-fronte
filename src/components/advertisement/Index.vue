<template>
    <div>
        {{this.$route.params.region}}
    </div>
</template>

<script>
    export default {
        name: "Index",
        mounted() {
            document.title = this.$route.params.region
        }
    }
</script>