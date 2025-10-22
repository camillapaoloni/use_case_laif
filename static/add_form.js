/**
 * add_form.js
 * Gestisce l'invio asincrono del form "Aggiungi specie".
 * - Validazione client-side dei campi obbligatori
 * - Invio JSON al backend Flask (/api/add_species)
 * - Mostra messaggi di feedback all'utente
 *
 * Migliorie incluse:
 * - disabilita il bottone mentre la richiesta è in corso
 * - aria-live per i messaggi (accessibilità)
 * - gestione errori robusta
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elementi DOM principali
  const form = document.getElementById("add-species-form");
  const message = document.getElementById("message");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Assicuriamoci che l'elemento message venga letto dagli screen reader
  // (in HTML: <p id="message" aria-live="polite"></p>)
  if (message) {
    message.setAttribute("aria-live", "polite");
  }

  // Lista degli id dei campi presenti nel form (ordine prevedibile)
  const fields = [
    "domain", "kingdom", "phylum", "class", "order_name",
    "family", "genus", "species", "subspecies", "scientific_name",
    "common_name", "author", "year_described", "conservation_status",
    "distribution", "notes"
  ];

  // Campi obbligatori per l'invio
  const required = ["domain", "genus", "species", "scientific_name", "common_name"];

  // Handler del submit del form (gestito a livello di form per intercettare anche Enter)
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita il reload della pagina

    // Raccogli i valori del form in un oggetto (rimuovendo spazi superflui)
    const data = {};
    fields.forEach(id => {
      const el = document.getElementById(id);
      data[id] = el ? el.value.trim() : "";
    });

    // Validazione client-side (rapida): controlla i campi obbligatori
    for (let field of required) {
      if (!data[field]) {
        showMessage(`⚠️ Il campo "${field}" è obbligatorio.`, "error");
        return;
      }
    }

    // Disabilita il bottone per prevenire invii multipli e mostra feedback visivo
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-75"); // effetto visivo (bootstrap)
    }
    showMessage("Invio in corso…", "info");

    try {
      // Invio della richiesta al backend
      const res = await fetch("/api/add_species", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      // Tenta di parsare il body della risposta (se presente)
      let result = {};
      try {
        result = await res.json();
      } catch (parseErr) {
        // risposta non JSON o body vuoto
        console.warn("Impossibile parsare JSON di risposta:", parseErr);
      }

      if (res.ok) {
        // Successo
        showMessage(`✅ ${result.message || "Specie aggiunta con successo!"}`, "success");
        form.reset(); // pulisce il form
      } else {
        // Errore gestito dal server (es. validazione, duplicati)
        showMessage(`❌ ${result.message || `Errore server: ${res.status}`}`, "error");
      }

    } catch (err) {
      // Errori di rete / fetch
      console.error("Errore fetch:", err);
      showMessage("❌ Errore di connessione al server. Riprova più tardi.", "error");

    } finally {
      // Riallena lo stato del bottone
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-75");
      }
    }
  });

  /**
   * Helper per mostrare messaggi all'utente.
   * type: "success" | "error" | "info"
   */
  function showMessage(text, type = "info") {
    if (!message) return;
    message.textContent = text;

    // Styling semplice (è preferibile usare classi CSS)
    switch (type) {
      case "success":
        message.style.color = "#2b7a0b"; // verde
        break;
      case "error":
        message.style.color = "#c0392b"; // rosso
        break;
      default:
        message.style.color = "#333"; // colore neutro
    }
  }
});
