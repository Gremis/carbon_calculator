// Global calculator service for CO2 emissions, comparisons, savings, and carbon credits.
var Calculator = {
  roundTo: function(value, decimalPlaces) {
    return Number(value.toFixed(decimalPlaces));
  },

  normalizeDistance: function(distanceKm) {
    const distance = Number(distanceKm);

    if (!Number.isFinite(distance) || distance < 0) {
      return 0;
    }

    return distance;
  },

  calculateEmission: function(distanceKm, transportMode) {
    const distance = this.normalizeDistance(distanceKm);
    const factor = CONFIG.EMISSION_FACTORS[transportMode];

    if (typeof factor !== "number") {
      return 0;
    }

    return this.roundTo(distance * factor, 2);
  },

  calculateAllModes: function(distanceKm) {
    const carEmission = this.calculateEmission(distanceKm, "car");

    return Object.keys(CONFIG.EMISSION_FACTORS)
      .map((mode) => {
        const emission = this.calculateEmission(distanceKm, mode);
        const percentageVsCar = carEmission > 0
          ? this.roundTo((emission / carEmission) * 100, 2)
          : 0;

        return {
          mode: mode,
          emission: emission,
          percentageVsCar: percentageVsCar
        };
      })
      .sort((resultA, resultB) => resultA.emission - resultB.emission);
  },

  calculateSavings: function(emission, baselineEmission) {
    const currentEmission = Number(emission);
    const baseline = Number(baselineEmission);

    if (!Number.isFinite(currentEmission) || !Number.isFinite(baseline) || baseline <= 0) {
      return {
        savedKg: 0,
        percentage: 0
      };
    }

    const savedKg = baseline - currentEmission;
    const percentage = (savedKg / baseline) * 100;

    return {
      savedKg: this.roundTo(savedKg, 2),
      percentage: this.roundTo(percentage, 2)
    };
  },

  calculateCarbonCredits: function(emissionKg) {
    const emission = Number(emissionKg);

    if (!Number.isFinite(emission) || emission < 0) {
      return 0;
    }

    return this.roundTo(emission / CONFIG.CARBON_CREDIT.KG_PER_CREDIT, 4);
  },

  estimateCreditPrice: function(credits) {
    const creditAmount = Number(credits);

    if (!Number.isFinite(creditAmount) || creditAmount < 0) {
      return {
        min: 0,
        max: 0,
        average: 0
      };
    }

    const min = creditAmount * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
    const max = creditAmount * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;

    return {
      min: this.roundTo(min, 2),
      max: this.roundTo(max, 2),
      average: this.roundTo((min + max) / 2, 2)
    };
  }
};
