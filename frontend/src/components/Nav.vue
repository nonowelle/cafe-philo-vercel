<script setup>
import { ref, nextTick, useTemplateRef } from 'vue';
import { useLanguage } from '@/composables/useLanguage';


const { currentContent, toggleLanguage, currentLanguage } = useLanguage();

const header = useTemplateRef('header')

let isOpen = ref(false);

const closeMobileNav = () => {
    isOpen.value = false;
}

const handleClick = (hash) => {
    closeMobileNav();

    setTimeout(() => {
        const target = document.getElementById(hash);
        const navHeight = header.value.offsetHeight;

        if (target) {

            const targetPosition = target.querySelector('h2').getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: targetPosition - navHeight - 100,
                behavior: 'smooth'
            });
        }
    }, 600);
};

const openMobileNav = () => {
    isOpen.value = true;
}
</script>

<template>
    <nav :class="{ open: isOpen }" ref="header">

        <div class="first-section">
            <div class="company">
                <img class="logo" src="../assets/logo.png" alt="logo cafe philo">
                <p class="company">caféphilo</p>

            </div>
            <span class="separator">|</span>
            <p class="slogan">filosofía, but the fun one</p>

            <div class="close-button" @click="closeMobileNav">X</div>
            <div class="menu-icon" @click="openMobileNav" ref="menuIcon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div ref="secondSection" :class="[{ visible: isOpen }, 'second-section']">
            <li @click="handleClick('1')">
                <a href="#1" v-smooth-scroll>{{
                    currentContent.navigation.what }}</a>
            </li>
            <li @click="handleClick('2')">
                <a href="#2" v-smooth-scroll>{{
                    currentContent.navigation.how }}</a>
            </li>
            <li @click="handleClick('3')"><a href="#3" v-smooth-scroll>{{
                currentContent.navigation.imIn }}</a></li>
            <li @click="handleClick('4')"> <a href="#4" v-smooth-scroll>{{
                currentContent.navigation.contact }}</a></li>

            <div class="lang-switcher">
                <div class="lang">
                    {{ currentLanguage }}
                    <font-awesome-icon icon="angle-down" />
                    <div class="lang-options" @click="toggleLanguage">{{ currentLanguage === 'en' ? 'es' : 'en' }}
                    </div>
                </div>
            </div>
        </div>

    </nav>
</template>

<style lang="scss" scoped>
nav {
    width: 100%;
    max-height: 136px;
    height: 100vh;


    font-size: 18px;
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 3rem;

    justify-content: flex-start;
    background-color: var(--color-background);
    z-index: 100;

    border-radius: 8px;

    color: var(--color-links);
    font-weight: 500;
    align-items: center;


    border-radius: 0;
    border-bottom: 1px solid #f2d680;
    padding-bottom: 1rem;
    transition: max-height 0.4s linear;
    position: sticky;
    top: 0;
    left: 0;
    padding: 36px;


    &-wrapper {
        position: absolute;
        left: -100%;
    }

    li {
        text-decoration: none;
        list-style: none;

    }

    &.open {
        max-height: 100vh;
        z-index: 1000;
        height: 100vh;

        .close-button {
            display: flex;
            cursor: pointer;
        }

        .menu-icon {
            display: none;
        }

        .second-section {
            display: flex;
        }
    }

    .close-button {
        display: none;
    }

    .menu-icon {
        display: flex;

        flex-direction: column;
        cursor: pointer;


        span {
            display: block;
            border-radius: 15px;
            width: 25px;
            height: 2px;
            background-color: var(--color-links);
            margin: 3px;
            transition: all 0.4s ease;
        }

    }
}

.first-section {
    display: flex;
    font-size: 32px;
    gap: 24px;
    align-items: flex-start;

    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
}

.company {
    display: flex;
    gap: 32px;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    font-size: 1.4rem;
    padding: 3px;
}

.separator {
    display: none;
}

.slogan {
    font-size: 1rem;
    margin-bottom: 0;
    width: 100%;
    order: 3;
    text-align: left;
}

@media screen and (max-width: 1023px) {
    .first-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
    }

    .company {
        order: 1;
        width: auto;
    }

    .menu-icon,
    .close-button {
        order: 2;
        position: absolute;
        top: 48px;
        right: 36px;
    }

    .slogan {
        order: 3;
    }
}

.second-section {
    display: none;
    justify-content: space-between;
    font-size: 32px;
    font-style: italic;
    gap: 1.5rem;
    flex-direction: column;
    align-self: center;

    align-self: flex-start;
    width: 100%;

}


.lang-switcher {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;

    font-size: 1.3rem;
    cursor: pointer;
    padding: 10px;
    transition: none;
    position: relative;

    svg {
        font-size: 1rem;
    }

    p {
        margin: 0;
    }

    a {
        display: flex;
    }

    &:hover {
        .lang-options {
            display: block;
            z-index: 100;

            padding: 8px 16px;
            border-radius: 8px;
            position: absolute;
            top: 50px;

            background-color: var(--c-purple-light);
            color: white;
            font-size: 1rem;
            cursor: pointer;

            a {
                color: white;
                transform: none;
                font-size: 1rem;
                ;
            }
        }
    }

}

.lang-options {
    display: none;
}

.logo {
    max-width: 35px;
}

@media screen and (min-width: 1024px) {
    nav {
        flex-direction: row;
        height: auto;
        justify-content: space-between;
        gap: 1.5rem;
        padding: 16px;

        border-bottom: 1px solid #f2d680;

        .close-button {
            display: none;
        }

        .menu-icon {
            display: none;
        }

    }

    .separator {
        font-size: 1.2rem;
        display: block;
    }

    .first-section {
        width: auto;
        align-self: auto;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
    }

    .slogan {
        width: auto;
        order: initial;
        text-align: initial;
    }

    .second-section {
        flex-direction: row;

        display: flex;
        align-self: auto;
        width: auto;
    }

    .logo {
        max-width: 70px;
    }

}
</style>