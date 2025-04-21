<template>
  <teleport to="body">
    <div v-if="show" class="modal">
      <div
        @click="close"
        :class="[
          'modal__backdrop',
          isOpen ? 'modal__backdrop_open' : 'modal__backdrop_close'
        ]"
      />

      <div
        :class="[
          'modal__content',
          isOpen ? 'modal__content_open' : 'modal__content_close',
          maxWidthClass
        ]"
      >
        <div class="flex items-center justify-between p-4">
          <div class="text-2xl font-semibold">{{ title }}</div>
          <button @click="close" class="h-5 w-5">
            <svg
              class="h-full w-full text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path
                d="M5 6.13324L1.36945 9.76379C1.21196 9.92126 1.02309 10 0.802827 10C0.582568 10 0.393696 9.92126 0.23621 9.76379C0.0787367 9.60631 0 9.41743 0 9.19717C0 8.97691 0.0787367 8.78804 0.23621 8.63056L3.86677 5L0.23621 1.36945C0.0787367 1.21196 0 1.02309 0 0.802828C0 0.582568 0.0787367 0.393696 0.23621 0.23621C0.393696 0.078737 0.582568 0 0.802827 0C1.02309 0 1.21196 0.078737 1.36945 0.23621L5 3.86677L8.63056 0.23621C8.78804 0.078737 8.97691 0 9.19717 0C9.41743 0 9.60631 0.078737 9.76379 0.23621C9.92126 0.393696 10 0.582568 10 0.802828C10 1.02309 9.92126 1.21196 9.76379 1.36945L6.13324 5L9.76379 8.63056C9.92126 8.78804 10 8.97691 10 9.19717C10 9.41743 9.92126 9.60631 9.76379 9.76379C9.60631 9.92126 9.41743 10 9.19717 10C8.97691 10 8.78804 9.92126 8.63056 9.76379L5 6.13324Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex-auto overflow-y-auto overflow-x-hidden">
          <slot v-if="show" />
        </div>

        <div class="p-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '2xl'
  },
  closeable: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const isOpen = ref(props.show)

watch(
  () => props.show,
  (newVal) => {
    if (props.show) {
      document.documentElement.classList.add('lock')
    } else {
      document.documentElement.classList.remove('lock')
    }

    isOpen.value = newVal
  }
)

const close = () => {
  if (props.closeable) {
    isOpen.value = false
    setTimeout(() => {
      emit('close')
    }, 400)
  }
}

const closeOnEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = null
})

const maxWidthClass = computed(() => {
  return {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl'
  }[props.maxWidth]
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;

  padding: 24px 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  @media (min-width: 744.98px) and (min-height: 475.98px) {
    padding: 40px;
    align-items: center;
  }
}

.modal__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  overflow: hidden;

  &_open {
    animation-duration: 400ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-name: overlayOpenAnimatin;
  }

  &_close {
    animation-duration: 400ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-name: overlayCloseAnimatin;
  }
}

.modal__content {
  position: relative;
  z-index: calc(1050 + 11);
  background-color: #fff;

  width: 100vw;
  height: 100%;
  max-width: 100vw;
  max-height: 100%;

  display: flex;
  flex-direction: column;

  border-top-right-radius: 15px;
  border-top-left-radius: 15px;

  @media (min-width: 744.98px) {
    height: auto;
    width: 100%;
    max-width: 750px;
    border-radius: 25px;
  }

  &_open {
    animation-duration: 400ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-name: contentOpenAnimatin;
  }

  &_close {
    animation-duration: 400ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-name: contentCloseAnimatin;
  }
}

@keyframes overlayOpenAnimatin {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }

  100% {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

@keyframes overlayCloseAnimatin {
  0% {
    background-color: rgba(0, 0, 0, 0.6);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes contentOpenAnimatin {
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes contentCloseAnimatin {
  0% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translate(0, 100%);
  }
}
</style>
