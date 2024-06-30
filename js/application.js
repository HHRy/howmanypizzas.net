
// Multipliers based on how hungry you think people are
//
var big_eaters_multiplier         = 1.5;
var medium_eaters_multiplier      = 1.2;
var small_eaters_multiplier       = 0.7;

// The base number of slices a normal person will be eating
//
var slices_per_person             = 4.0;

// Multiplier for this being a work lunch (on the company)
//
var work_lunch_multiplier         = 1.35;

// Multiplier for there being a corporate sponsor
//
var corporate_sponsor_multiplier  = 1.2;


// Multiplier for there being sides present
//
var sides_present_multiplier      = 0.8;


var pizza_chain_data  = {
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
};

var calculate_slices_needed = function(big_eaters_count, medium_eaters_count, small_eaters_count, sides_value, boss_paying, corporate_sponsor){
  var big_eaters_slices = (big_eaters_count * slices_per_person) * big_eaters_multiplier;
  var medium_eaters_slices = (medium_eaters_count * slices_per_person) * medium_eaters_multiplier;
  var small_eaters_slices = (small_eaters_count * slices_per_person) * small_eaters_multiplier;
  var subtotal_slices = big_eaters_slices + medium_eaters_slices + small_eaters_slices;

  if(boss_paying == true) {
    subtotal_slices = subtotal_slices * work_lunch_multiplier;
  }

  if(corporate_sponsor == true) {
    subtotal_slices = subtotal_slices * corporate_sponsor_multiplier;
  }

  if(sides_value == 0) {
    return subtotal_slices;
  }else{
    return subtotal_slices - (sides_value * sides_present_multiplier);
  }
};

var calculate_pizzas_needed = function(slices, ordering_from, size){
  var slices_per_pizza = pizza_chain_data[ordering_from][size];
  var pizzas = Math.ceil((slices / slices_per_pizza));
  return pizzas;
}


$( document ).ready(function() {
  $('form#how_many_pizzas').submit(function( event ) {
    
    var big_eaters = parseInt($('#number_big_eaters').val(), 10);
    var small_eaters = parseInt($('#number_small_eaters').val(), 10);
    var medium_eaters = parseInt($('#number_medium_eaters').val(), 10);
   
    var sides = parseInt($('#number_of_sides option:selected').val(), 10);

    var chain = $('#pizza_chains option:selected').val();
    var size = $('#pizza_size option:selected').val();
   
    var boss_paying = parseInt($('#who_is_paying option:selected').val(), 10);

    if(isNaN(boss_paying) || boss_paying != 2){
      boss_paying = false;
    } else {
      boss_paying = true;
    } 

    var corporate_sponsor = parseInt($('#who_is_paying option:selected').val(), 10);

    if(isNaN(corporate_sponsor) || corporate_sponsor != 1){
      corporate_sponsor = false;
    } else {
      corporate_sponsor = true;
    } 
    
    if(isNaN(big_eaters)){
      big_eaters = 0;
    }
    if(isNaN(small_eaters)){
      small_eaters = 0;
    }
    if(isNaN(medium_eaters)){
      medium_eaters = 0;
    }
    if(isNaN(sides)){
      sides = 0;
    }

    if(!chain){
      chain = 'Pizza Hut';
    }
    
    if(!size){
      size = 'medium';
    }
    
    var slices_needed = calculate_slices_needed(big_eaters, medium_eaters, small_eaters, sides, boss_paying, corporate_sponsor);
    var pizzas_needed = calculate_pizzas_needed(slices_needed, chain, size);

    if(pizzas_needed == 0) {
      alert('Fill in the form properly and try again');
    }else{
      alert('You need to buy ' + pizzas_needed + ' pizzas  to feed everyone.');
    }
    console.log(pizzas_needed)

    event.preventDefault();
  });
});

