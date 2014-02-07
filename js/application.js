
// Multipliers based on how hungry you think people are
//
var big_eaters_multiplier     = 2;
var medium_eaters_multiplier  = 1.5;
var small_eaters_multiplier   = 0.7;

// The base number of slices a normal person will be eating
//
var slices_per_person         = 2.5;

// Multiplier for this being a work lunch (on the company)
//
var work_lunch_multiplier     = 1.5;

// Multiplier for there being sides present
//
var sides_present_multiplier = 0.6;


var pizza_chain_data  = {
  "Dominos" : {
    "large"   : 10,
    "medium"  : 8,
    "small"   : 6
  },

  "Pizza Hut" : {
    "large"   : 10,
    "medium"  : 8,
    "small"   : 6

  },

  "Pappa John's" : {
    "large"   : 10,
    "medium"  : 8,
    "small"   : 6
  }
};

var calculate_slices_needed = function(big_eaters_count, medium_eaters_count, small_eaters_count, sides_value){
  var big_eaters_slices = big_eaters_count * big_eaters_multiplier;
  var medium_eaters_slices = medium_eaters_count * medium_eaters_multiplier;
  var small_eaters_slices = small_eaters_count * small_eaters_multiplier;
  var subtotal_slices = big_eaters_slices + medium_eaters_slices + small_eaters_slices;

  if(sides_value == 0) {
    return subtotal_slices;
  }else{
    return subtotal_slices - (sides_value * sides_present_multiplier);
  }
};

var calculate_pizzas_needed = function(slices, ordering_from, size){
  var slices_per_pizza = pizza_chain_data[ordering_from][size];
  Math.ceil(slices / slices_per_pizza); 
}

