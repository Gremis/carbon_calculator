// Global route database used by the calculator UI.
// Each route stores city names with state abbreviations and the distance in km.
var RoutesDB = {
  routes: [
    { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
    { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
    { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
    { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
    { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
    { origin: "Belo Horizonte, MG", destination: "Brasília, DF", distanceKm: 716 },
    { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
    { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
    { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },
    { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
    { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1110 },
    { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
    { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 806 },
    { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
    { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
    { origin: "Natal, RN", destination: "João Pessoa, PB", distanceKm: 185 },
    { origin: "João Pessoa, PB", destination: "Recife, PE", distanceKm: 120 },
    { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },
    { origin: "Aracaju, SE", destination: "Maceió, AL", distanceKm: 277 },
    { origin: "Maceió, AL", destination: "Recife, PE", distanceKm: 257 },
    { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
    { origin: "Goiânia, GO", destination: "Cuiabá, MT", distanceKm: 934 },
    { origin: "Cuiabá, MT", destination: "Campo Grande, MS", distanceKm: 694 },
    { origin: "Campo Grande, MS", destination: "São Paulo, SP", distanceKm: 1014 },
    { origin: "Brasília, DF", destination: "Palmas, TO", distanceKm: 973 },
    { origin: "Palmas, TO", destination: "Belém, PA", distanceKm: 1283 },
    { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 },
    { origin: "São Luís, MA", destination: "Teresina, PI", distanceKm: 446 },
    { origin: "Teresina, PI", destination: "Fortaleza, CE", distanceKm: 634 },
    { origin: "Belém, PA", destination: "Manaus, AM", distanceKm: 5298 },
    { origin: "Manaus, AM", destination: "Boa Vista, RR", distanceKm: 785 },
    { origin: "Manaus, AM", destination: "Porto Velho, RO", distanceKm: 901 },
    { origin: "Porto Velho, RO", destination: "Rio Branco, AC", distanceKm: 544 },
    { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
    { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
    { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
    { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
    { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 }
  ],

  getAllCities: function() {
    const cities = this.routes.flatMap(function(route) {
      return [route.origin, route.destination];
    });

    return Array.from(new Set(cities)).sort(function(cityA, cityB) {
      return cityA.localeCompare(cityB, "pt-BR");
    });
  },

  findDistance: function(origin, destination) {
    const normalizedOrigin = this.normalizeCity(origin);
    const normalizedDestination = this.normalizeCity(destination);

    const route = this.routes.find(function(routeItem) {
      const routeOrigin = RoutesDB.normalizeCity(routeItem.origin);
      const routeDestination = RoutesDB.normalizeCity(routeItem.destination);

      return (
        routeOrigin === normalizedOrigin &&
        routeDestination === normalizedDestination
      ) || (
        routeOrigin === normalizedDestination &&
        routeDestination === normalizedOrigin
      );
    });

    return route ? route.distanceKm : null;
  },

  normalizeCity: function(city) {
    return String(city)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
};
