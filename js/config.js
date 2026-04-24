// Global configuration shared by the route UI and emission calculator.
var CONFIG = {
  EMISSION_FACTORS: {
    bicycle: 0,
    car: 0.12,
    bus: 0.089,
    truck: 0.96
  },

  TRANSPORT_MODES: {
    bicycle: {
      label: "Bicicleta",
      icon: "🚲",
      color: "#10b981"
    },
    car: {
      label: "Carro",
      icon: "🚗",
      color: "#ef4444"
    },
    bus: {
      label: "Ônibus",
      icon: "🚌",
      color: "#3b82f6"
    },
    truck: {
      label: "Caminhão",
      icon: "🚚",
      color: "#f59e0b"
    }
  },

  CARBON_CREDIT: {
    KG_PER_CREDIT: 1000,
    PRICE_MIN_BRL: 50,
    PRICE_MAX_BRL: 150
  },

  // Populates the city autocomplete list from RoutesDB.
  populateDatalist: function() {
    const datalist = document.getElementById("cities-list");

    if (!datalist || typeof RoutesDB === "undefined") {
      return;
    }

    datalist.innerHTML = "";

    RoutesDB.getAllCities().forEach(function(city) {
      const option = document.createElement("option");
      option.value = city;
      datalist.appendChild(option);
    });
  },

  // Keeps the distance input synchronized with the selected route unless manual mode is enabled.
  setupDistanceAutofill: function() {
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const distanceInput = document.getElementById("distance");
    const manualDistanceCheckbox = document.getElementById("manual-distance");
    const helperText = document.querySelector(".calculator__helper");

    if (
      !originInput ||
      !destinationInput ||
      !distanceInput ||
      !manualDistanceCheckbox ||
      typeof RoutesDB === "undefined"
    ) {
      return;
    }

    if (distanceInput.dataset.autofillReady === "true") {
      return;
    }

    distanceInput.dataset.autofillReady = "true";

    const setHelperMessage = function(message, color) {
      if (!helperText) {
        return;
      }

      helperText.textContent = message;
      helperText.style.color = color;
    };

    const tryAutofillDistance = function() {
      if (manualDistanceCheckbox.checked) {
        distanceInput.removeAttribute("readonly");
        setHelperMessage("Digite a distância manualmente", "#6b7280");
        return;
      }

      const origin = originInput.value.trim();
      const destination = destinationInput.value.trim();

      distanceInput.setAttribute("readonly", "readonly");

      if (!origin || !destination) {
        distanceInput.value = "";
        setHelperMessage("A distância será preenchida automaticamente", "#6b7280");
        return;
      }

      const distance = RoutesDB.findDistance(origin, destination);

      if (distance !== null) {
        distanceInput.value = distance;
        setHelperMessage("Distância encontrada automaticamente", "#10b981");
        return;
      }

      distanceInput.value = "";
      setHelperMessage(
        "Rota não encontrada. Marque a opção manual para informar a distância.",
        "#f59e0b"
      );
    };

    originInput.addEventListener("change", tryAutofillDistance);
    originInput.addEventListener("input", tryAutofillDistance);
    destinationInput.addEventListener("change", tryAutofillDistance);
    destinationInput.addEventListener("input", tryAutofillDistance);

    manualDistanceCheckbox.addEventListener("change", function() {
      if (manualDistanceCheckbox.checked) {
        distanceInput.removeAttribute("readonly");
        setHelperMessage("Digite a distância manualmente", "#6b7280");
        distanceInput.focus();
        return;
      }

      tryAutofillDistance();
    });
  }
};
