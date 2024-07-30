import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import VueNumberInput from '@chenfengyuan/vue-number-input';

import './index.css';
import App from './App.vue';

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en: {
      chains: {
        dominos: 'Dominos',
        pizzaHut: 'Pizza Hut',
        papaJohns: 'Pappa Johns',
        pizzaLa: 'Pizza La'
      },
      pizza: 'pizza | pizzas',
      sizes: {  
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
        xlarge: 'Extra Large'
      },
      suggestion: {
        buySinglePizzaSize: 'You should buy {numPizzas} {size} from {chain}.',
        multiplePizzas: ' Your {chain} order should be:'
      },
      explaination: {
        attendeeBreakdown: 'The attendes are assumed to be: {bigEaters} big eaters, {smallEaters} small eaters, {mediumEaters} medium eaters, and {kids} kids.',
        pizzaSizeDetails: 'A {size} pizza from {chain} has {sliceCount} slices.',
        totalSlices: 'To feed everyone, there are {sliceCount} slices needed.',
        possibleLeftovers: 'You might have {leftoverCount} slices left over.'
      }
    },  
    ja: {
      chains: {
        dominos: 'ドミノ',
        pizzaHut: 'ピザ・ハット',
        papaJohns: 'パッパ・ジョンズ',
        pizzaLa: 'ピザ・ラ'
      },
      pizza: 'ピザ | ピザ',
      sizes: {
        small: 'S',
        medium: 'M',
        large: 'L',
        xlarge: 'LL'
      },
      suggestion: {
        buySinglePizzaSize: '{chain}の{size}サイズのピザを{numPizzas}枚買うべきだ。',
        multiplePizzas: '{chain}を注文する際は、以下のようにすることをお勧めする：'
      },
      explaination: {
        attendeeBreakdown: '出席者はこう仮定する： 腹ペコ{bigEaters}人、少食{smallEaters}人、普通{mediumEaters}人、子供{kids}人。',
        pizzaSizeDetails: '{chain}の{size}サイズのピザは{sliceCount}切れ。',
        totalSlices: '全員に食べさせるには、{sliceCount}枚のピザ切が必要だ。',
        possibleLeftovers: '{leftoverCount}切れ余るかもしれない。'
      }
  }
}});

const app = createApp(App);

app.use(i18n);
app.component(VueNumberInput.name, VueNumberInput);
app.mount('#app');

