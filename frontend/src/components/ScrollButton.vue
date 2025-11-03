<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isVisible = ref(true);

function getSections() {
    const nodeList = document.querySelectorAll('section');
    return Array.from(nodeList);
}

function evaluateVisibility() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const sections = getSections();
    if (!sections.length) {
        isVisible.value = false;
        return;
    }

    const next = sections
        .map((el) => ({ el, top: el instanceof HTMLElement ? el.offsetTop : 0 }))
        .filter((item) => item.top > scrollTop + 5)
        .sort((a, b) => a.top - b.top)[0];

    // Show only if there is a section below current viewport
    isVisible.value = Boolean(next);
}

function handleClick() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const sections = getSections();
    const next = sections
        .map((el) => ({ el, top: el instanceof HTMLElement ? el.offsetTop : 0 }))
        .filter((item) => item.top > scrollTop + 200)
        .sort((a, b) => a.top - b.top)[0];

    if (next && next.el) {
        next.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.setTimeout(evaluateVisibility, 50);
}

onMounted(() => {
    evaluateVisibility();
    window.addEventListener('scroll', evaluateVisibility, { passive: true });
    window.addEventListener('resize', evaluateVisibility, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', evaluateVisibility);
    window.removeEventListener('resize', evaluateVisibility);
});
</script>

<template>
    <div class="button-container" v-show="isVisible">
        <button class="button" @click="handleClick">
            <font-awesome-icon class="animate-bounce" icon="angle-down" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.button {
    &-container {
        width: 100%;
        justify-content: center;
        display: flex;
        position: fixed;
        top: 90vh;
    }


    margin-top: 0.5rem;
    padding: 0.7rem 1.25rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: var(--color-links);
    color: var(--c-white);
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease,
    opacity 0.2s ease,
    background 0.2s ease;
    scroll-snap-align: center;
    position:fixed;
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-width: 1024px) {
        display: none;
    }

    .animate-bounce {
        display: inline-block;
        animation: yoyo 0.9s ease-in-out infinite alternate;
        will-change: transform;
        font-size: 0.9s;
    }
}

@keyframes yoyo {
    from {
        transform: translateY(-1px);
    }

    to {
        transform: translateY(3px);
    }
}
</style>