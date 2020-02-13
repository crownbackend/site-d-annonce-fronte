<template>
    <div class="step-item" v-bind:class="[isActive, success, completed]">
        <div class="step-marker">{{number}}</div>
        <div class="step-details">
            <p class="step-title">{{name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: ['name', 'number', 'isActive', 'success', 'completed'],
    }
</script>

<style>

</style>