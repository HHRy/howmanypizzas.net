<script setup>
  import Calculator from './components/Calculator.vue'
</script>

<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      currentDate: new Date,
    }
  }

}
</script>

<template>
  <div class="w-full">
    <div className="grid grid-cols-1">
      <div class="flex bg-white">
          <div class="flex items-center text-center  px-8 md:px-12 ">
              <div>
                <img src="/how-many-pizzas-logo.svg" alt="How Many Pizzas Logo" class="mx-auto mt-10 block" width="300"  height="300"/>

                  <h1 class="text-3xl font-semibold text-gray-800 md:text-4xl">How many <span class="text-red-600">pizzas?</span></h1>
                  <p class="mt-2 text-sm text-gray-500 md:text-base">
                    Not sure how many pizzas to order for your next gathering? howmanypizzas.net makes it fun and easy to calculate the perfect number of pizzas for any group size. Try our tool now and make your pizza party planning a breeze!
                  </p>
                  <p class="mt-2 text-sm text-gray-500 md:text-base">
                    We use the sizes of pizzas from popular chains, and some broadly available statistics for pizza consumption to calculate just the right number of pizzas.
                  </p>
              </div>
          </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-4">
    <Calculator />
  </div>  
  <footer class="mb-4 mt-8">
    <div class="bg-gray-200 text-red-500 font-size-xs text-center py-4">
      * These are suggestions, follow them at your own risk. We are not responsible for any pizza-related mishaps. 🍕
    </div>
    <div class="bg-white text-gray-600 font-size-xs text-center py-1">
      &copy; 2013 - {{currentDate.getFullYear()}}. Ryan Stenhouse &amp; Contributors.
    </div>
    <div class="bg-white text-gray-300 font-size-xs text-center py-1">
      This site is not affiliated with any pizza chain. It's just a bit of fun. Logos are used for illustrative purposes only.
    </div>
  </footer>
</template>
