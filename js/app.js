(function() {
  const PROCESSING_DELAY_MS = 1500;

  const getFormData = function() {
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const distanceInput = document.getElementById("distance");
    const transportInput = document.querySelector('input[name="transport"]:checked');

    return {
      origin: originInput ? originInput.value.trim() : "",
      destination: destinationInput ? destinationInput.value.trim() : "",
      distance: distanceInput ? parseFloat(distanceInput.value) : NaN,
      transportMode: transportInput ? transportInput.value : ""
    };
  };

  const validateFormData = function(formData) {
    if (!formData.origin) {
      return "Informe a cidade de origem.";
    }

    if (!formData.destination) {
      return "Informe a cidade de destino.";
    }

    if (!Number.isFinite(formData.distance)) {
      return "Informe a distância da viagem.";
    }

    if (formData.distance <= 0) {
      return "A distância deve ser maior que zero.";
    }

    if (!formData.transportMode) {
      return "Selecione um meio de transporte.";
    }

    return "";
  };

  const hidePreviousResults = function(sections) {
    sections.forEach(function(section) {
      UI.hideElement(section);
    });
  };

  const renderCalculation = function(formData, sections, contentElements) {
    if (!contentElements.results || !contentElements.comparison || !contentElements.carbonCredits) {
      throw new Error("Elementos de resultado não encontrados.");
    }

    const emission = Calculator.calculateEmission(formData.distance, formData.transportMode);
    const carEmission = Calculator.calculateEmission(formData.distance, "car");
    const savings = Calculator.calculateSavings(emission, carEmission);
    const modesComparison = Calculator.calculateAllModes(formData.distance);
    const credits = Calculator.calculateCarbonCredits(emission);
    const price = Calculator.estimateCreditPrice(credits);

    const resultsData = {
      origin: formData.origin,
      destination: formData.destination,
      distance: formData.distance,
      emission: emission,
      mode: formData.transportMode,
      savings: savings
    };

    const creditsData = {
      credits: credits,
      price: price
    };

    contentElements.results.innerHTML = UI.renderResults(resultsData);
    contentElements.comparison.innerHTML = UI.renderComparison(
      modesComparison,
      formData.transportMode
    );
    contentElements.carbonCredits.innerHTML = UI.renderCarbonCredits(creditsData);

    sections.filter(Boolean).forEach(function(section) {
      UI.showElement(section);
    });
  };

  const handleSubmit = function(event) {
    event.preventDefault();

    const formData = getFormData();
    const validationError = validateFormData(formData);

    if (validationError) {
      alert(validationError);
      return;
    }

    const button = event.submitter || event.currentTarget.querySelector('button[type="submit"]');
    const sections = [
      document.getElementById("results"),
      document.getElementById("comparison"),
      document.getElementById("carbon-credits")
    ];
    const contentElements = {
      results: document.getElementById("results-content"),
      comparison: document.getElementById("comparison-content"),
      carbonCredits: document.getElementById("carbon-credits-content")
    };

    UI.showLoading(button);
    hidePreviousResults(sections.filter(Boolean));

    setTimeout(function() {
      try {
        renderCalculation(formData, sections, contentElements);
      } catch (error) {
        console.error("Erro ao calcular emissões:", error);
        alert("Não foi possível calcular as emissões. Tente novamente.");
      } finally {
        UI.hideLoading(button);
      }
    }, PROCESSING_DELAY_MS);
  };

  document.addEventListener("DOMContentLoaded", function() {
    CONFIG.populateDatalist();
    CONFIG.setupDistanceAutofill();

    const form = document.getElementById("calculator-form");

    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    console.log("✅ Calculadora inicializada!");
  });
})();
