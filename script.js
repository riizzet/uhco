let bestellung = []; // Array bestellung speichern

// hinzufügen zu best.
function zurBestellungHinzufuegen(name, preis) {
    let gefunden = false;
    for (let artikel of bestellung) {
        if (artikel.name === name) {
            artikel.menge++;
            gefunden = true;
            break;
        }
    }
    if (!gefunden) {
        bestellung.push({ name: name, preis: preis, menge: 1 });
    }
    bestellzusammenfassungAktualisieren();
}

// aktualisieren zusammenfassung
function bestellzusammenfassungAktualisieren() {
    const bestellListe = document.getElementById('bestell-liste');
    const totalElement = document.getElementById('total');
    bestellListe.innerHTML = '';
    let total = 0;
    bestellung.forEach(artikel => {
        const listenEintrag = document.createElement('li');
        listenEintrag.textContent = `${artikel.name} - ${artikel.menge} x Fr. ${artikel.preis.toFixed(2)}`;
        bestellListe.appendChild(listenEintrag);
        total += artikel.preis * artikel.menge;
    });
    totalElement.textContent = `Total: Fr. ${total.toFixed(2)}`;
}

// leeren bestellung
function bestellungLeeren() {
    bestellung = [];
    bestellzusammenfassungAktualisieren();
}

// Eventlistener für Produktbuttons
document.querySelectorAll('.produkt-button').forEach(button => {
    button.addEventListener('click', event => {
        const name = button.getAttribute('data-name');
        const preis = parseFloat(button.getAttribute('data-preis'));
        zurBestellungHinzufuegen(name, preis);

        // switch zu rot
        button.style.backgroundColor = '#00FF66'; // Red color

        // Reset 
        setTimeout(() => {
            button.style.backgroundColor = ''; // Reset
        }, 100); // 
    });
});

// Eventlistener neue bestellungen
document.querySelector('.btn-neue-bestellung').addEventListener('click', () => {
    bestellungLeeren();

    // Reset style
    document.querySelectorAll('.produkt-button').forEach(button => {
        button.style.backgroundColor = ''; // Reset
    });
});
