document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-species-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Raccogli tutti i campi
    const fields = [
      "domain", "kingdom", "phylum", "class", "order_name",
      "family", "genus", "species", "subspecies", "scientific_name",
      "common_name", "author", "year_described", "conservation_status",
      "distribution", "notes"
    ];

    const data = {};
    fields.forEach(id => {
      data[id] = document.getElementById(id).value.trim();
    });

    // Controlla i campi obbligatori
    const required = ["domain", "genus", "species", "scientific_name", "common_name"];
    for (let field of required) {
      if (!data[field]) {
        message.textContent = `⚠️ Il campo "${field}" è obbligatorio.`;
        message.style.color = "red";
        return;
      }
    }

    try {
      const res = await fetch("/api/add_species", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        message.textContent = "✅ " + result.message;
        message.style.color = "green";
        form.reset();
      } else {
        message.textContent = "❌ " + result.message;
        message.style.color = "red";
      }

    } catch (err) {
      console.error(err);
      message.textContent = "❌ Errore di connessione al server.";
      message.style.color = "red";
    }
  });
});
