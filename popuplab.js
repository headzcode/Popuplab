class PopupLabs {
    constructor() {
        this.popups = {}; // Armazena os pop-ups carregados
    }

    // Carrega um pop-up pelo código (ex: 1234)
    async loadPopup(popupCode) {
        const popupUrl = `https://headzcode.github.io/Popuplab/presentes/${popupCode}.html`;
        const response = await fetch(popupUrl);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o pop-up: ${response.statusText}`);
        }
        const html = await response.text();
        const popupContainer = document.createElement('div');
        popupContainer.innerHTML = html;
        document.body.appendChild(popupContainer);

        // Armazena o pop-up para gerenciamento
        this.popups[popupCode] = popupContainer;
        return popupContainer;
    }

    // Abre um pop-up específico
    openPopup(popupCode) {
        const popup = this.popups[popupCode];
        if (popup) {
            popup.style.display = 'block';
        } else {
            console.error(`Popup ${popupCode} não encontrado.`);
        }
    }

    // Fecha um pop-up específico
    closePopup(popupCode) {
        const popup = this.popups[popupCode];
        if (popup) {
            popup.style.display = 'none';
        } else {
            console.error(`Popup ${popupCode} não encontrado.`);
        }
    }

    // Remove um pop-up do DOM
    removePopup(popupCode) {
        const popup = this.popups[popupCode];
        if (popup) {
            popup.remove();
            delete this.popups[popupCode];
        } else {
            console.error(`Popup ${popupCode} não encontrado.`);
        }
    }

    // Modifica o conteúdo de um pop-up
    setPopupContent(popupCode, options = {}) {
        const popup = this.popups[popupCode];
        if (popup) {
            if (options.title) {
                const titleElement = popup.querySelector('.popuplab-title');
                if (titleElement) titleElement.textContent = options.title;
            }
            if (options.description) {
                const descriptionElement = popup.querySelector('.popuplab-description');
                if (descriptionElement) descriptionElement.textContent = options.description;
            }
            if (options.logo) {
                const logoElement = popup.querySelector('.popuplab-logo');
                if (logoElement) logoElement.src = options.logo;
            }
        } else {
            console.error(`Popup ${popupCode} não encontrado.`);
        }
    }
}

// Exporta a instância da biblioteca
window.PopupLabs = new PopupLabs(); // Torna acessível globalmente
