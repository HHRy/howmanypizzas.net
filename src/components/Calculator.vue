<script setup> 
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
</script>

<script>
export default {
  data() {
    return {
      numAdults: 0,
      numKids: 0,
      slicesPerPizza: 0,
      leftoverSlices: 0,
      slicesNeeed: 0,
      roughBigEaters: 0.043,
      roughSmallEaters: 0.08,
      bigEatersFactor: 1.7,
      mediumEatersFactor: 1.1,
      smallEatersFactor: 0.7,
      kidsFactor: 0.7,
      workFunction: false,
      corporateSponsor: false,
      numPizzas: 0,
      pizzaChains: ["Dominos", "Pizza Hut", "Papa John's", "Pizza La"],
      pizzaChain: "Dominos",
      pizzaSizes: ["xlarge", "large", "medium", "small"], 
      pizzaSize: "medium",
      bigEaters: 0,
      pizza: 'pizza',
      smallEaters: 0,
      remainderAdults: 0,
      baseSlicesPerPerson: 4,
      slicesPerPerson: 4,
      splitMenuMode: true,
      splitMenuData: {},
      chainData: {
        "Dominos" : {
          "xlarge"   : 10,
          "large"   : 10,
          "medium"  : 8,
          "small"   : 6
        },
        "Pizza Hut" : {
          "xlarge"   : 10,
          "large"   : 10,
          "medium"  : 8,
          "small"   : 6

        },
        "Papa John's" : {
          "xlarge"  : 16,
          "large"   : 10,
          "medium"  : 8,
          "small"   : 6
        },
        "Pizza La" : {
          "xlarge"   : 8,
          "large"   : 8,
          "medium"  : 6,
          "small"   : 4
        }
      }
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

  computed: {
    dominos: function() {
        return this.pizzaChain == 'Dominos' ? 'active' : 'inactive';
    },
    pizzahut: function() {
        return this.pizzaChain == 'Pizza Hut' ? 'active' : 'inactive';
    },
    papajohns: function() {
        return this.pizzaChain == 'Papa John\'s' ? 'active' : 'inactive';
    },
    pizzala: function() {
        return this.pizzaChain == 'Pizza La' ? 'active' : 'inactive';
    }
  },

  methods: {
    calculateSplitMenu() {
      var chainInformation = this.chainData[this.pizzaChain]
      var remainingSlices = this.slicesNeeed

      this.splitMenuData = {
        "xlarge": 0,
        "large": 0,
        "medium": 0,
        "small": 0
      }


      while(remainingSlices >= chainInformation['small']) {
        this.pizzaSizes.forEach((size) => {
          // Ignore xlarge as an option for now.
          if(size != "xlarge") {
            var pizzasOfThisSize = Math.floor(remainingSlices / chainInformation[size])
            var slicesToDiscount = pizzasOfThisSize * chainInformation[size]
            remainingSlices -= slicesToDiscount
            this.splitMenuData[size] += pizzasOfThisSize
          }
        })
      }

      if(remainingSlices > 0) {
        this.splitMenuData["small"] += 1
      }

      var slicesOrdered = 0

      this.pizzaSizes.forEach((size) => {
        if(size != "xlarge") {
          slicesOrdered += (this.splitMenuData[size] * chainInformation[size])
        }
      })

      this.leftoverSlices = slicesOrdered - this.slicesNeeed
    },
    calculate() {
      this.slicesPerPizza = this.chainData[this.pizzaChain][this.pizzaSize]
      this.bigEaters = 0
      this.smallEaters = 0
      this.remainderAdults = this.numAdults

      // Small pizzas have teeny wee slices, so folks will eat more of them.
      if (this.pizzaSize == "small") {
        this.slicesPerPerson = Math.ceil(this.baseSlicesPerPerson * 1.2)
      
      // Pappa John's X-Large pizzas are huge, so adjust down the slices count
      } else if (this.pizzaSize == "xlarge" && this.pizzaChain == "Papa John's") {
        this.slicesPerPerson = Math.ceil(this.baseSlicesPerPerson * 0.8)

      // Large pizzas have big slices, so folks will eat less of them.
      } else if (this.pizzaSize == "large" || this.pizzaSize == "xlarge") {
        this.slicesPerPerson = Math.ceil(this.baseSlicesPerPerson * 0.9)

      // Otherwise use the default.
      } else {
        this.slicesPerPerson = this.baseSlicesPerPerson
      }

      var slices = this.numAdults * this.slicesPerPerson

      if(this.numAdults > 4) {
        this.bigEaters = Math.ceil(this.numAdults * this.roughBigEaters)
        this.smallEaters = Math.ceil(this.numAdults * this.roughSmallEaters)
        this.remainderAdults = this.numAdults - this.bigEaters - this.smallEaters
      }

      // If there are more than 4 adults, we need to calculate the slices based on 
      // the assumed distribution of big eaters, small eaters, and medium eaters.
      if(this.numAdults > 4) {
        slices = Math.ceil(((this.bigEaters * this.slicesPerPerson) * this.bigEatersFactor))
        slices += Math.ceil(((this.smallEaters * this.slicesPerPerson) * this.smallEatersFactor))
        slices += Math.ceil(((this.remainderAdults * this.slicesPerPerson) * this.mediumEatersFactor))
      }

      // People eat more at work functions, so add 20% to the total
      // of slices to be safe.
      if (this.workFunction) {
        slices *= 1.1
      }

      // If someone is paying for it, folks might eat more, so add 10%
      // to the total of slices to be safe.
      if (this.corporateSponsor) {
        slices *= 1.05
      }

      // If there are any kids, handle them here. Kids usually eat less, so
      // we will be adding much less to the total slices.
      if(this.numKids > 0) {
        slices += Math.ceil(((this.numKids * this.slicesPerPerson) * this.kidsFactor))
      }

      this.slicesNeeed = Math.ceil(slices)
      
      if(this.splitMenuMode) {
        this.calculateSplitMenu()
      } else {
        var pizzaCount = Math.ceil(slices / this.slicesPerPizza)

        // Make sure we always order at least one pizza
        if (pizzaCount < 1) {
          pizzaCount = 1
        }

        if(pizzaCount == 1) {
          this.pizza = 'pizza';
        } else {
          this.pizza = 'pizzas';
        }

        this.leftoverSlices = Math.ceil((pizzaCount * this.slicesPerPizza) - this.slicesNeeed)
        this.numPizzas = pizzaCount 
      }
      
    }
  },

}
</script>

<template>
  <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl mt-4 mb-4">{{ $t('questions.whichPizzaChain') }}</h2>
  <div class="grid grid-cols-2 gap-4">
    <button class="pizza-selection-button" v-bind:class="dominos" @click="pizzaChain = 'Dominos'">
      <img src="/Dominos_pizza_logo.svg" alt="{{ $t('message.hello') }}" width="100" height="100"/>
    </button>
    <button class="pizza-selection-button" v-bind:class="pizzahut" @click="pizzaChain = 'Pizza Hut'">
      <img src="/Pizza_Hut_logo.svg" alt="How Many Pizzas Logo" width="100" height="100"/>
    </button>
    <button class="pizza-selection-button" v-bind:class="papajohns" @click="pizzaChain = 'Papa John\'s'">
      <img src="/Papa_John_Logo_2019.svg" alt="How Many Pizzas Logo" width="100" height="100"/>
    </button>
    <button class="pizza-selection-button" v-bind:class="pizzala" @click="pizzaChain = 'Pizza La'">
      <img src="/pizza-la-logo.png" alt="How Many Pizzas Logo" width="100" height="100"/>
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
  <h2 class="text-2xl font-semibold text-gray-800 md:text-3xl mt-4">{{ $t('questions.suggestPizzas') }}</h2>
  <div class="grid grid-cols-1 gap-4 mt-2">
    <div>
      <label>
        <input type="checkbox" id="splitMenuMode" v-model="splitMenuMode">
        {{ $t('questions.yesSuggest') }}
      </label>
    </div>
    <div v-show="!splitMenuMode">
      <h3 class="text-xl font-semibold text-gray-800 md:text-2xl mt-4 mb-4">{{ $t('questions.pizzaSize') }}</h3>
      <select v-model="pizzaSize" v-show="!splitMenuMode">
        <option v-for="option in pizzaSizes" :value="option">
          {{ $t(`sizes.${option}`) }}
        </option>
      </select>
    </div>
  </div>
  <h2 class="text-xl font-semibold text-gray-800 md:text-2xl mt-4">{{ $t('questions.otherDetails') }}</h2>
  <div class="grid grid-cols-1 gap-4 mt-2">
    <div>
      <label>
        <input type="checkbox" id="workFunction" v-model="workFunction">
        {{ $t('questions.workEvent') }}
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" id="corporateSponsor" v-model="corporateSponsor">
        {{ $t('questions.corporateSponsor') }}
      </label>
    </div>
  </div>
  <div>
    <div class="card pizza-result shadow-md" v-show="parseInt(slicesNeeed) > 0">
      <span v-show="!splitMenuMode">
        {{ $t('suggestion.buySinglePizzaSize', { numPizzas: numPizzas, chain: pizzaChain, size: pizzaSize  }) }}
      </span>
      <span v-show="splitMenuMode">
        {{ $t('suggestion.multiplePizzas', { chain: pizzaChain }) }}<br>
          <span v-for="(value, key) in splitMenuData" v-show="parseInt(value) > 0">
            <strong>{{ value }}</strong> {{ $t(`sizes.${key}`) }}&nbsp;
          </span>
      </span>
    </div>
    <div class="breakdown text-slate-400 p-5 mt-4 mb-8 text-center" v-show="parseInt(slicesNeeed) > 0">
      <p>
        {{ $t('explaination.attendeeBreakdown', { bigEaters: bigEaters, smallEaters: smallEaters, mediumEaters: remainderAdults, kids: numKids  }) }}
        <span v-show="!splitMenuMode">
          {{ $t('explaination.pizzaSizeDetails', { size: pizzaSize, chain: pizzaChain, sliceCount: slicesPerPizza  }) }}
        </span>
        {{ $t('explaination.totalSlices', { sliceCount: slicesNeeed  }) }}
        <span v-show="leftoverSlices > 0">
          {{ $t('explaination.possibleLeftovers', { leftoverCount: leftoverSlices  }) }}
        </span>
      </p>
    </div>
  </div>
</template>