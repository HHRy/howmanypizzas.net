const roughBigEaters = 0.043
const roughSmallEaters = 0.08
const bigEatersFactor = 1.7
const mediumEatersFactor = 1
const smallEatersFactor = 0.7
const kidsFactor = 0.8
const baseSlicesPerPerson = 4
const workFunctionMultiplier = 1.2
const corporateFunctionMultiplier = 1.1

const calculateSlices = (numAdults, numKids, workFunction, corporateSponsor) => {
  let bigEaters = 0
  let smallEaters = 0
  let slicesPerPerson = baseSlicesPerPerson
  let slices = 0

  if(numAdults > 4) {
    bigEaters = Math.ceil(numAdults * roughBigEaters)
    smallEaters = Math.ceil(numAdults * roughSmallEaters)
  }

  let mediumEaters = numAdults - bigEaters - smallEaters

  if(numAdults > 4) {
    slices += Math.ceil(((bigEaters * slicesPerPerson) * bigEatersFactor))
    slices += Math.ceil(((smallEaters * slicesPerPerson) * smallEatersFactor))
  }

  slices += Math.ceil(((mediumEaters * slicesPerPerson) * mediumEatersFactor))

  if (workFunction) {
    slices *= workFunctionMultiplier
  }

  if (corporateSponsor) {
    slices *= corporateFunctionMultiplier
  }

  if(numKids > 0) {
    slices += Math.ceil(((numKids * slicesPerPerson) * kidsFactor))
  }

  return Math.ceil(slices)
}

const calculateOnePizzaSize = (slices, size, slicesPerPizza) => {
  let count = Math.ceil(slices / slicesPerPizza)
  if (count < 1) {
    count = 1
  }
  return {
    "size": size,
    "count": count
  }
}

const calculatePizza = (numAdults, numKids, slicesData, workFunction, corporateSponsor, suggestMode, size) => {
  const slices = calculateSlices(numAdults, numKids, workFunction, corporateSponsor)
  let result = {
    slices: slices,
    leftovers: 0,
    pizzaBreakdown: []
  }

  if(suggestMode){
    let remainingSlices = slices
    let suggestionBreakdown = {
      small: 0,
      medium: 0,
      large: 0
    }

    while(remainingSlices >= slicesData['small']) {
      ['large', 'medium', 'small'].forEach((size) => {
        var pizzasOfThisSize = Math.floor(remainingSlices / slicesData[size])
        var slicesToDiscount = pizzasOfThisSize * slicesData[size]
        remainingSlices -= slicesToDiscount
        suggestionBreakdown[size] += pizzasOfThisSize
      })
    }

    if(remainingSlices > 0) {
      suggestionBreakdown['small'] += 1
    }

    ['small', 'medium', 'large'].forEach((size) => {
      if(suggestionBreakdown[size] > 0) {
        result.pizzaBreakdown.push(
          {
            "size": size,
            "count": suggestionBreakdown[size]
          }
        )
      }
    })

  } else {
    result.pizzaBreakdown.push(
      calculateOnePizzaSize(slices, size, slicesData[size])
    )
  }

  return result
}

export default calculatePizza