document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("button-submit"); //seleziono il bottone con id button-submit
    //const si usa per dichiarare una variabile che non cambia, altrimenti si usa let
    submitButton.addEventListener("click", async(e) => { //aggiungo un event listener al bottone, che ascolta il click
    //ora è un evento asincrono
        e.preventDefault(); //previene il comportamento di default del bottone, che è quello di ricaricare la pagina
        let species = document.getElementById("input-species").value; //pulisco il div result ogni volta che clicco il bottone 
    console.log(species) //prendo il valore dell'input con id input-species e lo stam
    let req ={
        method: "POST", //metodo della richiesta
        headers : {
            "Content-Type": "application/json" //tipo di contenuto della richiesta
        },
        body : JSON.stringify({species: species}) //corpo della richiesta, i dati che voglio inviare al server
    // è una stringa JSON che contiene il valore dell'input species
    }
    //fecth prende una root dell'API e restituisce il risultato della richiesta
    const res = await fetch('/api/get_species', req) //chiamo la route /api/get_species con la richiesta req
//await aspetta che la richiesta(promessa)sia completata prima di continuare e quindi che il server restituisca un risultato
    console.log(res) //stampo il risultato della richiesta
    const json = await res.json() //trasformo il risultato in JSON
    console.log(json) //stampo il JSON
    document.getElementById("result").textContent = "" //pulisco il div result ogni volta che clicco il bottone
    for (let entry of json.entries) { //per ogni entry nel JSON

        document.getElementById("result").textContent += `${entry.domain} - ${entry.kingdom} - ${entry.phylum} - ${entry.class} - ${entry.order_name} - ${entry.family} - ${entry.genus} - ${entry.species} ${entry.subspecies} (${entry.scientific_name}, ${entry.common_name}) \n`
    }
    // += permette al ciclo di aggiungere result di più entries 
//``template literal, permette di inserire variabili all'interno di una stringa come f string in python
    if (json.entries.length === 0) { //se non ci sono entries nel JSON
        document.getElementById("result").innerHTML = "No results found </br> Specie not in the DB"; //mostro un messaggio di errore
    }
})
})
    //document corrisponde al file html
    //alla pagina html aggiungo un event listener, una funzione che viene eseguita quando accade un evento specifico
    //in questo caso l'evento è il caricamento completo del DOM (Document Object Model)
    //quando il DOM è completamente caricato, viene eseguita la funzione da eseguire.

    //quando il bottone submit viene cliccato devono succedere un insieme di cose
