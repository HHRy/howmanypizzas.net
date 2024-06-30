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

<!-- component -->
<div class="w-full">
    <div class="flex bg-white">
        <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2 pb-8">
            <div>
              <img src="/how-many-pizzas-logo.svg" alt="How Many Pizzas Logo" class="mx-auto mt-10" width="300"  height="300"/>

                <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">How many <span class="text-red-600">pizzas?</span></h2>
                <p class="mt-2 text-sm text-gray-500 md:text-base">
                    Calculate <strong>how many pizzas you need to order</strong>* for your next event. Maybe it's for a hackathon, a birthday party, or a team meeting. We've got you covered. Just fill in the form below and we'll do the rest.
                </p>
            </div>
        </div>
        <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
            <div class="h-full object-cover" style="background-image: url('/nik-owens-40OJLYVWeeM-unsplash.webp'); background-size: cover;">
                <div class="h-full bg-black opacity-25">
                </div>
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
      &copy; 2013 - {{currentDate.getFullYear()}}. Ryan Stenhouse, Nekotachi Ltd &amp; Contributors.
    </div>
  </footer>
</template>
