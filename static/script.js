/**
 * script.js
 * Gestisce l'interazione client-server per la ricerca di specie nel database.
 * Utilizza Fetch API per inviare una richiesta POST al backend Flask
 * e mostra i risultati nel DOM senza ricaricare la pagina.
 */

document.addEventListener("DOMContentLoaded", () => {

  // Seleziona il bottone di submit del form
  const submitButton = document.getElementById("button-submit");

  // Aggiunge un listener per l'evento "click"
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Evita il comportamento predefinito (reload della pagina)

    // Recupera il valore inserito dall'utente nel campo di input
    const species = document.getElementById("input-species").value.trim();
    console.log("Specie cercata:", species);

    // Prepara la richiesta HTTP da inviare al backend Flask
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ species: species }) // converte in stringa JSON
    };

    try {
      // Invia la richiesta alla route Flask e attende la risposta
      const res = await fetch("/api/get_species", req);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Converte la risposta in formato JSON
      const json = await res.json();
      console.log("Risposta dal server:", json);

      // Seleziona l'elemento del DOM dove mostrare i risultati e lo pulisce
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      // Se ci sono specie trovate, le mostra una per riga
      if (json.entries.length > 0) {
        for (let entry of json.entries) {
          resultDiv.innerHTML += `
            ${entry.domain} - ${entry.kingdom} - ${entry.phylum} - ${entry.class} - 
            ${entry.order_name} - ${entry.family} - ${entry.genus} - 
            ${entry.species} ${entry.subspecies} 
            (${entry.scientific_name}, ${entry.common_name}) <br>`;
        }
      } else {
        // Nessuna specie trovata nel database
        resultDiv.innerHTML = "No results found.<br>Specie not in the DB.";
      }

    } catch (error) {
      // Gestione degli errori di rete o di server
      console.error("Errore durante la richiesta:", error);
      document.getElementById("result").innerHTML =
        "⚠️ Errore durante la ricerca. Riprova più tardi.";
    }
  });
});
