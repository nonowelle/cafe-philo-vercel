<template>
    <section class="box-item">
        <h2>{{ box.title }}</h2>
        <p v-if="box.description">{{ box.description }}</p>
        <Form />
    </section>
</template>

<script setup lang="ts">
import Form from './Form.vue'

interface BoxItemProps {
    box: {
        title: string;
        description: string;
    };
}

const props = defineProps<BoxItemProps>();

</script>

<style lang="scss" scoped>
.box-item {
    padding: 1.5rem;
    border-radius: 8px;

    min-width: 250px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100vh;

}

.cta-button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: var(--color-links);

    transition: color ease 0.4s;

    &:hover {
        color: var(--color-cta);
    }
}
</style>