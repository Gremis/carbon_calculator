// Global UI renderer for results, comparisons, carbon credits, and loading states.
var UI = {
  formatNumber: function(value, decimalPlaces = 2) {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
  },

  formatCurrency: function(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  },

  escapeHTML: function(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  getTransportMode: function(mode) {
    return CONFIG.TRANSPORT_MODES[mode] || {
      label: mode,
      icon: "🌿",
      color: "#10b981"
    };
  },

  getProgressColor: function(percentage) {
    if (percentage >= 100) {
      return "#ef4444";
    }

    if (percentage <= 25) {
      return "#10b981";
    }

    if (percentage <= 75) {
      return "#f59e0b";
    }

    return "#f97316";
  },

  renderResults: function(data) {
    const mode = this.getTransportMode(data.mode);
    const savings = data.savings;
    const hasSavings = data.mode !== "car" && savings;
    const savingsLabel = savings && savings.savedKg >= 0
      ? "Economia vs. carro"
      : "Aumento vs. carro";
    const savingsClass = savings && savings.savedKg >= 0
      ? "results__card--savings"
      : "results__card--increase";
    const savingsValue = savings
      ? `${this.formatNumber(Math.abs(savings.savedKg))} kg CO2 (${this.formatNumber(Math.abs(savings.percentage))}%)`
      : "";

    return `
      <div class="results__grid">
        <article class="results__card results__card--route">
          <span class="results__label">Rota</span>
          <strong class="results__value">
            ${this.escapeHTML(data.origin)} → ${this.escapeHTML(data.destination)}
          </strong>
        </article>

        <article class="results__card results__card--distance">
          <span class="results__label">Distância</span>
          <strong class="results__value">${this.formatNumber(data.distance)} km</strong>
        </article>

        <article class="results__card results__card--emission">
          <span class="results__label">Emissão</span>
          <strong class="results__value">🌿 ${this.formatNumber(data.emission)} kg CO2</strong>
        </article>

        <article class="results__card results__card--transport">
          <span class="results__label">Transporte</span>
          <strong class="results__value" style="color: ${mode.color}">
            ${mode.icon} ${mode.label}
          </strong>
        </article>

        ${hasSavings ? `
          <article class="results__card ${savingsClass}">
            <span class="results__label">${savingsLabel}</span>
            <strong class="results__value">
              ${savingsValue}
            </strong>
          </article>
        ` : ""}
      </div>
    `;
  },

  renderComparison: function(modesArray, selectedMode) {
    const maxEmission = Math.max(...modesArray.map((modeData) => modeData.emission), 0);
    const itemsHTML = modesArray.map((modeData) => {
      const mode = this.getTransportMode(modeData.mode);
      const isSelected = modeData.mode === selectedMode;
      const progress = maxEmission > 0 ? (modeData.emission / maxEmission) * 100 : 0;
      const progressWidth = Math.max(progress, modeData.emission > 0 ? 4 : 0);
      const progressColor = this.getProgressColor(progress);

      return `
        <div class="comparison__item${isSelected ? " comparison__item--selected" : ""}">
          <div class="comparison__header">
            <div class="comparison__mode">
              <span class="comparison__icon" aria-hidden="true">${mode.icon}</span>
              <span class="comparison__label">${mode.label}</span>
            </div>
            ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ""}
          </div>

          <div class="comparison__metrics">
            <span class="comparison__emission">${this.formatNumber(modeData.emission)} kg CO2</span>
            <span class="comparison__percentage">
              ${this.formatNumber(modeData.percentageVsCar)}% vs. carro
            </span>
          </div>

          <div class="comparison__progress" aria-hidden="true">
            <span
              class="comparison__progress-bar"
              style="width: ${progressWidth}%; background-color: ${progressColor};"
            ></span>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="comparison__list">
        ${itemsHTML}
      </div>

      <div class="comparison__tip">
        Modais com barras menores geram menos CO2 para a mesma distância. Use a comparação para escolher a opção de menor impacto quando possível.
      </div>
    `;
  },

  renderCarbonCredits: function(creditsData) {
    return `
      <div class="carbon-credits__grid">
        <article class="carbon-credits__card">
          <span class="carbon-credits__label">Créditos necessários</span>
          <strong class="carbon-credits__value">
            ${this.formatNumber(creditsData.credits, 4)}
          </strong>
          <p class="carbon-credits__helper">1 crédito = 1000 kg CO2</p>
        </article>

        <article class="carbon-credits__card">
          <span class="carbon-credits__label">Preço médio estimado</span>
          <strong class="carbon-credits__value">
            ${this.formatCurrency(creditsData.price.average)}
          </strong>
          <p class="carbon-credits__helper">
            ${this.formatCurrency(creditsData.price.min)} - ${this.formatCurrency(creditsData.price.max)}
          </p>
        </article>
      </div>

      <div class="carbon-credits__info">
        Créditos de carbono representam uma forma de compensar emissões financiando projetos que reduzem ou removem CO2 da atmosfera.
      </div>

      <button class="carbon-credits__button" type="button">Compensar Emissões</button>
    `;
  },

  showLoading: function(button) {
    if (!button) {
      return;
    }

    button.dataset.originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Calculando...';
  },

  hideLoading: function(button) {
    if (!button) {
      return;
    }

    button.disabled = false;
    button.textContent = button.dataset.originalText || "Calcular Emissão";
    delete button.dataset.originalText;
  },

  hideElement: function(element) {
    if (!element) {
      return;
    }

    element.classList.add("hidden");
  },

  showElement: function(element) {
    if (!element) {
      return;
    }

    element.classList.remove("hidden");
  }
};
