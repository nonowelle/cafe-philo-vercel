<template>
    <form ref="form" @submit.prevent="handleSubmit">
        <div class="form-input">
            <label>{{ currentContent.form.name }}</label>
            <input type="text" v-model.trim="formData.firstName" @blur="validateField('firstName')" />
            <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
        </div>

        <div class="form-input">
            <label>{{ currentContent.form.lastName }}</label>
            <input type="text" v-model.trim="formData.lastName" @blur="validateField('lastName')" />
            <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
        </div>

        <div class="form-input">
            <label>{{ currentContent.form.email }}</label>
            <input type="text" v-model.trim="formData.email" @blur="validateField('email')" />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <fieldset class="form-input">
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="info" value="info" v-model="formData.razon" />
                    <label for="info">{{ currentContent.form.info }}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="estar" value="estar" v-model="formData.razon" />
                    <label for="estar">{{ currentContent.form.estar }}</label>
                </div>
            </div>
            <span class="error" v-if="errors.razon">{{ errors.razon }}</span>
        </fieldset>

        <div class="form-input">
            <label for="algo">{{ currentContent.form.algo }}</label>
            <textarea id="algo" name="algo" rows="5" cols="33" v-model.trim="formData.text"
                @blur="validateField('text')"></textarea>
            <span class="error" v-if="errors.text">{{ errors.text }}</span>
        </div>

        <button type="submit" :disabled="!isFormValid || submitting">
            {{ submitting ? 'Sending…' : 'Go' }}
        </button>

        <p v-if="submitOk" style="margin: 0.5rem 0; color: var(--color-links);">
            {{ currentContent.form.errors.success }}
        </p>
        <p v-if="submitError" class="error"> {{ currentContent.form.errors.form }}</p>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { watch } from 'vue'



const { currentContent } = useLanguage()

interface FormData {
    firstName: string
    lastName: string
    email: string
    razon: string
    text: string
}

const formData = reactive<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    razon: '',
    text: ''
})
watch(() => formData.text, () => validateField('text'))
const errors = reactive<Record<keyof FormData, string>>({
    firstName: '',
    lastName: '',
    email: '',
    razon: '',
    text: ''
})

const validators = {
    firstName: (val: string) => {
        if (!val) return currentContent.value.form.errors.firstName[1]
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(val))
            return currentContent.value.form.errors.firstName[0]
        return ''
    },
    lastName: (val: string) => {
        if (!val) return currentContent.value.form.errors.lastName[1]
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(val))
            return currentContent.value.form.errors.firstName[0]
        return ''
    },
    email: (val: string) => {
        if (!val) return currentContent.value.form.errors.email[1]
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
            return currentContent.value.form.errors.firstName[0]
        return ''
    },
    razon: (val: string) => {
        if (!val) return currentContent.value.form.errors.razon;
        return ''
    },
    text: (val: string) => {
        // Block potential XSS or HTML/script content
        if (!val.trim()) return ''
        const forbiddenPattern = /<|>|<\/?script|on\w+=|javascript:/i
        if (forbiddenPattern.test(val)) return currentContent.value.form.errors.text;

        return ''
    }
}

// --- Validation helpers ---
const validateField = (field: keyof FormData) => {
    const newError = validators[field](formData[field])
    errors[field] = newError;
    return !newError;
}

const validateForm = () => {
    let allValid = true;
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
        if (key === 'text' && !formData.text.trim()) {
            errors.text = '';
            return;
        }
        const valid = validateField(key);
        if (!valid) allValid = false;
    })
    return allValid;
}


// --- Computed ---
const isFormValid = computed(() => {
    // All errors must be empty AND all required fields non-empty
    const noErrors = Object.values(errors).every((e) => e === '')
    const filledRequired = !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.razon
    return noErrors && filledRequired
});

// --- Submission handling ---
const submitting = ref(false)
const submitOk = ref(false)
const submitError = ref(false)

const handleSubmit = async () => {
    if (!validateForm() || submitting.value) return

    submitting.value = true
    submitOk.value = false
    submitError.value = false

    try {

        const res = await fetch(`/api/form`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (!res.ok) throw new Error('Request failed')

        submitOk.value = true
        Object.assign(formData, {
            firstName: '',
            lastName: '',
            email: '',
            razon: '',
            text: ''
        })
    } catch (e) {
        submitError.value = true
    } finally {
        submitting.value = false
    }
}
</script>

<style scoped lang="scss">
form {
    width: min(700px, 100%);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1.5rem 1.5rem 1.5rem;

}

.form-input {
    display: flex;
    flex-direction: column;

}

label {
    font-size: 1rem;
    color: var(--color-heading);
    font-weight: 500;
    text-align: left;
}

input,
textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 6px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.9);
    color: #282829;
    outline: none;
    transition: box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;

    &:focus {
        border-color: var(--color-links);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-links) 20%, transparent);
        background: #fff;
    }
}

fieldset {
    border: none;
}

.radio {
    display: flex;

    input {
        width: auto;
        margin-right: 1rem;
        margin-bottom: 0;
    }
}

.radio-button {
    width: auto;
    margin-right: 16px;
}

.error {
    color: #b00020;
    font-size: 0.9rem;
    text-align: left;
}

button[type="submit"] {
    align-self: flex-start;
    margin-top: 0.5rem;
    padding: 0.7rem 1.25rem;
    border-radius: 999px;
    border: 1px solid transparent;
    background: var(--color-links);
    color: var(--c-white);
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s ease, opacity 0.2s ease, background 0.2s ease;
    scroll-snap-align: center;

    &:hover {
        opacity: 0.95;
    }

    &:active {
        transform: translateY(1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>