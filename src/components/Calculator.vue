<script setup> 
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import calculator from '../lib/calculator.js'
import pizzaChainData from '../lib/chains.json'
</script>

<script>
export default {
  data() {
    return {
      numAdults: 1,
      pizzaResults: {},
      numKids: 0,
      slicesPerPizza: 0,
      leftoverSlices: 0,
      workFunction: false,
      corporateSponsor: false,
      pizzaChain: "dominos",
      pizzaSize: "medium",
      splitMenuMode: true,
    }
  },
  
  watch: {
      numAdults: function (val) {
        this.calculate()
      },
      numKids: function (val) {
        this.calculate()
      },
      pizzaChain: function (val) {
        this.calculate()
      }, 
      pizzaSize: function (val) {
        this.calculate()
      },
      workFunction: function (val) {
        this.calculate()
      },
      corporateSponsor: function (val) {
        this.calculate()
      },
      splitMenuMode: function (val) {
        this.calculate()
      }
  },

  mounted() {
    this.calculate();
  },

  methods: {
    selectedPizza: function(key) {
      return key == this.pizzaChain ? 'active' : 'inactive';
    },
    currentPizzaChain() {
      return this.selectPizza(this.pizzaChain)
    },
    selectPizza(key) {
      let chain = pizzaChainData.filter((chain) => {
        return chain.key == key
      })
      return chain[0]
    },
    calculate() {
      this.pizzaResults = calculator(this.numAdults, this.numKids, this.currentPizzaChain().slices, this.workFunction, this.corporateSponsor, this.splitMenuMode, this.pizzaSize)
    }
  }
}
</script>

<template>
  <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl mt-4 mb-4">{{ $t('questions.whichPizzaChain') }}</h2>
  <div class="grid grid-cols-2 gap-4">
    <button class="pizza-selection-button" v-bind:class="selectedPizza(chainDataItem.key)"  @click="pizzaChain = chainDataItem.key"   v-for="chainDataItem in pizzaChainData" :value="chainDataItem.key" :title="$t(`chains.${chainDataItem.key}`)" :aria-label="$t(`chains.${chainDataItem.key}`)">
      <img :src="chainDataItem.logo" width="100" height="100" :title="$t(`chains.${chainDataItem.key}`)" :alt="$t(`chains.${chainDataItem.key}`)">
    </button>
  </div>
  <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl mt-4">{{ $t('questions.howManyPeople') }}</h2>
  <div class="grid grid-cols-2 gap-4 mt-2">
    <h3>{{ $t('questions.howManyAdults') }}</h3>
    <h3>{{ $t('questions.howManyKids') }}</h3>
    <div>
      <vue-number-input v-model="numAdults" inline center controls></vue-number-input>
    </div>
    <div>
      <vue-number-input v-model="numKids" inline center controls></vue-number-input>
    </div>
  </div>
  <p class="mt-4">
    <SwitchGroup>
      <div class="flex items-center">
        <SwitchLabel class="mr-4">{{ $t('questions.yesSuggest') }}</SwitchLabel>
        <Switch
          v-model="splitMenuMode"
          :class='splitMenuMode ? "bg-pizza-red" : "bg-gray-200"'
          class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          <span
            :class='splitMenuMode ? "translate-x-6" : "translate-x-1"'
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          />
        </Switch>
      </div>
    </SwitchGroup>
  </p>
  <div class="grid grid-cols-1 gap-4 mt-2">
    <div v-show="!splitMenuMode">
      <h3 class="text-xl font-semibold text-gray-800 md:text-2xl mt-4 mb-4">{{ $t('questions.pizzaSize') }}</h3>
      <select v-model="pizzaSize" v-show="!splitMenuMode">
        <option v-for="option in currentPizzaChain().sizes" :value="option">
          {{ $t(`sizes.${option}`) }}
        </option>
      </select>
    </div>
  </div>
  <h2 class="text-xl font-semibold text-gray-800 md:text-2xl mt-4">{{ $t('questions.otherDetails') }}</h2>
  <div class="grid grid-cols-1 gap-4 mt-2">
    <div>
      <SwitchGroup>
        <div class="flex items-center">
          <SwitchLabel class="mr-4">{{ $t('questions.workEvent') }}</SwitchLabel>
          <Switch
            v-model="workFunction"
            :class='workFunction ? "bg-pizza-red" : "bg-gray-200"'
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            <span
              :class='workFunction ? "translate-x-6" : "translate-x-1"'
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </Switch>
        </div>
      </SwitchGroup>
    </div>
    <div>
      <SwitchGroup>
        <div class="flex items-center">
          <SwitchLabel class="mr-4">{{ $t('questions.corporateSponsor') }}</SwitchLabel>
          <Switch
            v-model="corporateSponsor"
            :class='corporateSponsor ? "bg-pizza-red" : "bg-gray-200"'
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            <span
              :class='corporateSponsor ? "translate-x-6" : "translate-x-1"'
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </Switch>
        </div>
      </SwitchGroup>
    </div>
  </div>
  <div>
    <div class="card pizza-result shadow-md" v-show="parseInt(pizzaResults.slices) > 0">
        {{ $t('suggestion.multiplePizzas', { chain: $t(`chains.${pizzaChain}`) }) }}<br>
          <span v-for="(item) in pizzaResults.pizzaBreakdown" v-show="parseInt(item.count) > 0">
            <strong>{{ item.count }}</strong> {{ $t(`sizes.${item.size}`) }}&nbsp;
          </span>
    </div>
    <div class="breakdown text-slate-400 p-5 mt-4 mb-8 text-center" v-show="pizzaResults.slices > 0">
      <p>
        {{ $t('explaination.attendeeBreakdown', { bigEaters: pizzaResults.bigEaters, smallEaters: pizzaResults.smallEaters, mediumEaters: pizzaResults.mediumEaters, kids: numKids  }) }}
        {{ $t('explaination.totalSlices', { sliceCount: pizzaResults.slices  }) }}
        <span v-show="pizzaResults.leftoverSlices > 0">
          {{ $t('explaination.possibleLeftovers', { leftoverCount: pizzaResults.leftoverSlices  }) }}
        </span>
      </p>
    </div>
  </div>
</template>