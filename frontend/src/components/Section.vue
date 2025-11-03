<script setup lang="ts">


import Form from '@/components/Form.vue';
interface TextContentProps {
    section: {
        sectionId: string;
        title: string;
        subtitle: string;
        description: string;
        descriptionDeux?: string;
        hasForm?: boolean;
    }
}

const props = defineProps<TextContentProps>();

// Use provided sectionId so nav anchors like #1, #2 match
</script>

<template>
    <section class="text-section" :id="section.sectionId">
        <h2>{{ section.title }} <br>{{ section.subtitle }}</h2>
        <p>{{ section.description }}</p>
        <p v-if="section.descriptionDeux" v-html="section?.descriptionDeux"></p>
        <Form v-if="section.hasForm" />
    </section>
</template>

<style lang="scss" scoped>
.text-section {
    height: auto;
    width: 100%;
    padding: 100px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    scroll-snap-align: center;

    @media screen and (max-width: 1024px) {
        padding: 50px 24px;

    }

    h2 {
        max-width: 80%;

        @media screen and (max-width: 1024px) {
            max-width: none;

        }
    }

    p {
        max-width: 800px;
    }

}
</style>