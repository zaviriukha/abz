<template>
  <section class="pb-[100px] pt-[140px] flex flex-col items-center">
    <h1 class="title-text text-black mb-[50px] text-center px-4 md:px-0">
      Working with POST request
    </h1>

    <div class="relative w-full max-w-[380px] px-4 md:px-0">
      <Form
        class="w-full flex flex-col"
        :class="{ 'pointer-events-none select-none opacity-50': showSuccess }"
        :validation-schema="schema"
        @submit="onSubmit"
        v-slot="{ meta }"
      >
        <Field name="name" v-slot="{ field, errorMessage }">
          <VInput
            :name="field.name"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            placeholder="Your name"
            required
            :error="errorMessage"
            label="Your name"
          />
        </Field>

        <Field name="email" v-slot="{ field, errorMessage }">
          <VInput
            type="email"
            :name="field.name"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            placeholder="Email"
            required
            :error="errorMessage"
            label="Email"
          />
        </Field>

        <Field name="phone" v-slot="{ field, errorMessage }">
          <VInput
            type="tel"
            :name="field.name"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            placeholder="Phone"
            hint="+38 (XXX) XXX - XX - XX"
            required
            :error="errorMessage"
            label="Phone"
          />
        </Field>

        <fieldset class="mb-[47px]">
          <legend class="text-body text-black mb-[11px]">Select your position</legend>
          <Field name="position_id" v-slot="{ field, errorMessage }">
            <div class="flex flex-col">
              <VRadio
                v-for="p in positions"
                :key="p.id"
                :name="field.name"
                :value="p.id"
                :modelValue="field.value"
                @update:modelValue="field.onChange"
              >
                {{ p.name }}
              </VRadio>
            </div>
            <span v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</span>
          </Field>
        </fieldset>

        <Field name="photo" v-slot="{ field, errorMessage }">
          <VUpload
            :name="field.name"
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            accept="image/jpeg,image/jpg"
            placeholder="Upload your photo"
            :error="errorMessage"
          />
        </Field>

        <div class="mt-[50px] flex justify-center">
          <VButton
            type="submit"
            :loading="submitting"
            :disabled="submitting || !meta.valid || !meta.dirty"
          >
            Sign up
          </VButton>
        </div>

        <p v-if="submitError" class="text-red-500 text-center mt-3">{{ submitError }}</p>
      </Form>
    </div>

    <div
      v-if="showSuccess"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px]"
    >
      <div
        class="w-[min(904px,90vw)] max-h-[80vh] overflow-auto rounded-md bg-white shadow-lg px-6 py-[clamp(24px,6vh,48px)] text-center"
      >
        <h1 class="title-text text-black mb-[50px]">User successfully registered</h1>

        <img src="/success-image.svg" alt="Success" class="mx-auto w-full h-auto max-w-[720px]" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Form, Field } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import VInput from '@/components/ui/VInput.vue'
import VRadio from '@/components/ui/VRadio.vue'
import VButton from '@/components/ui/VButton.vue'
import { createUser } from '@/services/api'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { usePositionsStore } from '@/stores/positions'
import { useUsersStore } from '@/stores/users'
import VUpload from '@/components/ui/VUpload.vue'

const positionsStore = usePositionsStore()
const { items: positions } = storeToRefs(positionsStore)
onMounted(() => positionsStore.ensurePositions())

const submitting = ref(false)
const submitError = ref('')
const showSuccess = ref(false)

const schema = toTypedSchema(
  z.object({
    name: z.string().trim().min(2).max(60),
    email: z.string().trim().email(),
    phone: z
      .string()
      .trim()
      .regex(/^\+380\d{9}$/),
    position_id: z
      .union([z.string(), z.number()])
      .transform(Number)
      .refine(Boolean, 'Select a position'),
    photo: z
      .instanceof(File, { message: 'Upload a photo' })
      .refine((f) => /image\/jpe?g$/i.test(f.type), 'Photo must be JPEG/JPG')
      .refine((f) => f.size <= 5 * 1024 * 1024, 'Photo size must be less than 5MB'),
  }),
)

const auth = useAuthStore()
const usersStore = useUsersStore()

async function onSubmit(values, { resetForm }) {
  submitting.value = true
  submitError.value = ''

  try {
    const token = await auth.ensureToken()

    const fd = new FormData()
    fd.append('name', values.name.trim())
    fd.append('email', values.email.trim())
    fd.append('phone', values.phone.trim())
    fd.append('position_id', String(values.position_id))
    fd.append('photo', values.photo)

    await createUser({ token, formData: fd })

    resetForm()

    await usersStore.refreshFirstPage()

    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (e) {
    submitError.value = e?.message || 'Submission failed'
    console.error('POST user failed:', e, e?.payload)
  } finally {
    submitting.value = false
  }
}
</script>
