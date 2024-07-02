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
      splitMenuMode: false,
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

  methods: {
    calculateSplitMenu() {
      // splitMenuMode
      var chainInformation = this.chainData[this.pizzaChain]
      var remainingSlices = this.slicesNeeed

      this.splitMenuData = {
        "xlarge": 0,
        "large": 0,
        "medium": 0,
        "small": 0
      }

      if(this.numAdults == 1) {
        this.splitMenuData["small"] = 1
        return
      }

      if(this.numAdults == 2) {
        this.splitMenuData["medium"] = 1
        return
      }

      while(remainingSlices > 6) {
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
        this.splitMenuData["medium"] += 1
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
  <div className="grid grid-cols-1">
    <input type="checkbox" id="splitMenuMode" v-model="splitMenuMode">
          &nbsp;
          <label for="splitMenuMode">Choose the sizes of pizza for me!</label>

          <label>
            How many adults?
            <vue-number-input v-model="numAdults" inline center controls></vue-number-input>
          </label>

          <label>
            How many kids?
            <vue-number-input v-model="numKids" inline center controls></vue-number-input>
          </label>

          <select v-model="pizzaChain">
            <option v-for="option in pizzaChains" :value="option">
              {{ option }}
            </option>
          </select>

          <select v-model="pizzaSize" v-show="!splitMenuMode">
            <option v-for="option in pizzaSizes" :value="option">
              {{ option }}
            </option>
          </select>
        
          <div>

          <input type="checkbox" id="workFunction" v-model="workFunction">
          &nbsp;
          <label for="workFunction">Work / Company Meal?</label>
          &nbsp;&nbsp;
          <input type="checkbox" id="corporateSponsor" v-model="corporateSponsor">
          &nbsp;
          <label for="corporateSponsor">Corporate Sponsor?</label>
        </div>

  </div>

  <div>

    

    <div class="card pizza-result shadow-md" v-show="parseInt(slicesNeeed) > 0">
    
      <span v-show="!splitMenuMode">
        You should buy <strong>{{ numPizzas }}*</strong> {{ pizzaSize }} {{ pizza }} from <strong>{{ pizzaChain }}</strong>.
      </span>

      <span v-show="splitMenuMode">
        Your <strong>{{ pizzaChain }}</strong> order should be:<br>
          <span v-for="(value, key) in splitMenuData" v-show="parseInt(value) > 0">
            <strong>{{ value }}</strong> {{ key }}&nbsp;
          </span>
      </span>
    </div>

    <div class="breakdown text-slate-400 p-5 mt-4 mb-8 text-center" v-show="parseInt(slicesNeeed) > 0">
      <p>
        The attendes are assumed to be:         
          {{ bigEaters }} big eaters, 
          {{ smallEaters }} small eaters,
          {{ remainderAdults }} medium eaters, and
          {{ numKids }} kids.
          <span v-show="!splitMenuMode">
          A {{ pizzaSize }} pizza from {{ pizzaChain }} has {{ slicesPerPizza }} slices.
          </span>
          To feed everyone, there are {{ slicesNeeed }} slices needed. You might have
          {{ leftoverSlices }} slices left over.
        
      </p>
    </div>
  </div>

</template>