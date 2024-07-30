<script setup> 
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
</script>

<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ $t(`locales.${lang}`) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['ja', 'en'] }
  }
}
</script>