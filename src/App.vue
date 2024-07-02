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
  <div class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 shadow-md">
    <div class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ee3624] to-[#fef3ad] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"></div>
    </div>
    <div class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ee3624] to-[#fef3ad] opacity-30" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)"></div>
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm leading-6 text-gray-900">
        <strong class="font-semibold text-red-600">Having a pizza party?</strong><svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg> Use this free tool to work out how many pizzas you need to order.
      </p>
    </div>
    <div class="flex flex-1 justify-end"></div>
  </div>


<!-- component -->
<div class="w-full">
    <div class="flex bg-white">
        <div class="flex items-center text-center  px-8 md:px-12 ">
            <div>
              <img src="/how-many-pizzas-logo.svg" alt="How Many Pizzas Logo" class="mx-auto mt-10 block" width="300"  height="300"/>

                <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">How many <span class="text-red-600">pizzas?</span></h2>
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



  <div class="container mx-auto px-4">
    <Calculator />
  </div>


  
  <footer>
    <div class="bg-gray-200 text-red-500 font-size-xs text-center py-4">
      * These are suggestions, follow them at your own risk. We are not responsible for any pizza-related mishaps. 🍕
    </div>
    <div class="bg-white text-gray-600 font-size-xs text-center py-1">
      &copy; 2013 - {{currentDate.getFullYear()}}. Ryan Stenhouse &amp; Contributors.
    </div>
  </footer>
</template>
