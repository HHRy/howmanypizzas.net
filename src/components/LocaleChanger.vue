<script setup> 
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
</script>

<template>


<Listbox v-model="$i18n.locale" class="w-64">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full locale-selector cursor-pointer rounded-lg  py-2 pl-3 pr-10 text-left sm:text-sm transition-colors focus:outline-none pizza-red-border"
        >
          <span class="block truncate">{{ $t(`locales.${$i18n.locale}`) }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-red-600"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="lang in langs"
              :key="lang"
              :value="lang"
              as="template"
            >
              <li
                :class="[
                  active ? 'active-locale' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4 locale-selector-item',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ $t(`locales.${lang}`) }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>