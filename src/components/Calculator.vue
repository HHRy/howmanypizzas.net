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
      pizzaChains: ["Dominos", "Pizza Hut", "Papa John's"],
      pizzaChain: "Dominos",
      pizzaSizes: ["xlarge", "large", "medium", "small"], 
      pizzaSize: "medium",
      bigEaters: 0,
      pizza: 'pizza',
      smallEaters: 0,
      remainderAdults: 0,
      slicesPerPerson: 3.5,
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
      }
  },

  methods: {
    calculate() {
      var slices = 0 
      this.slicesPerPizza = this.chainData[this.pizzaChain][this.pizzaSize]

      if(this.numAdults > 4) {
        this.bigEaters = Math.ceil(this.numAdults * this.roughBigEaters)
        this.smallEaters = Math.ceil(this.numAdults * this.roughSmallEaters)
        this.remainderAdults = this.numAdults - this.bigEaters - this.smallEaters
      } else {
        this.bigEaters = 0
        this.smallEaters = 0
        this.remainderAdults = this.numAdults
      }

      slices += (this.bigEaters * this.bigEatersFactor)
      slices += (this.smallEaters * this.smallEatersFactor)

      slices += (this.remainderAdults * this.slicesPerPerson)
      slices *= this.mediumEatersFactor

      if(this.numAdults > 4) {
        // Special case for small and medium pizzas, since the slices can be smaller
        if (this.pizzaSize == "small" || this.pizzaSize == "medium") {
          slices *= 1.2
        }
      }

      // Speical case for Papa John's xlarge pizzas
      if (this.pizzaSize == "xlarge" && this.pizzaChain == "Papa John's") {
        slices *= 0.8
      }

      // People eat more at work functions, so add 20% to the total
      // of slices to be safe.
      if (this.workFunction) {
        slices *= 1.2
      }

      // If someone is paying for it, folks might eat more, so add 10%
      // to the total of slices to be safe.
      if (this.corporateSponsor) {
        slices *= 1.1
      }

      // If there are any kids, handle them here. Kids usually eat less, so
      // we will be adding much less to the total slices.
      if(this.numKids > 0) {
        slices += Math.ceil(((this.numKids * this.slicesPerPerson) * this.kidsFactor))
      }

      this.slicesNeeed = Math.ceil(slices)

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
  },

}
</script>

<template>
  <div className="grid grid-cols-1">
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
          <select v-model="pizzaSize">
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

    

    <div class="card pizza-result shadow-md">
      We've worked it out! 
      <br>
      <span>
        You should buy <strong>{{ numPizzas }}*</strong> {{ pizzaSize }} {{ pizza }} from <strong>{{ pizzaChain }}</strong>.
      </span>
    </div>

    <div class="breakdown text-slate-400 p-5 mt-4 mb-8 text-center">
      <p>
        The attendes are assumed to be:         
          {{ bigEaters }} big eaters, 
          {{ smallEaters }} small eaters,
          {{ remainderAdults }} medium eaters, and
          {{ numKids }} kids.
          A {{ pizzaSize }} pizza from {{ pizzaChain }} has {{ slicesPerPizza }} slices.
          To feed everyone, there are {{ slicesNeeed }} slices needed, you may have
          {{ leftoverSlices }} potential leftover slices
        
      </p>
    </div>
  </div>

</template>