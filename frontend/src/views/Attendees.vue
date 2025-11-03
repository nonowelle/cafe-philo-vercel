<template>
    <h1>{{ currentContent.attendees.title }}</h1>
    <div class="attendees-list">

    </div>
</template>

<script>
import { useLanguage } from '@/composables/useLanguage';
const { currentContent } = useLanguage();
</script>
