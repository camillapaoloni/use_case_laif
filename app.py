from flask import Flask, jsonify, render_template, request
import sqlite3
import os

def get_db(): #per interagire con il database
    conn = sqlite3.connect('db/database.db') #connessione al database SQLite chiamato database.db dentro la cartella db
    conn.row_factory = sqlite3.Row #per restituire i risultati delle query come dizionari invece che come tuple
    return conn 

def init_db(): #per inizializzare il database, serve solo la prima volta che si crea il database
    db = get_db() #ottiene la connessione al database
    with app.open_resource('db/schema.sql', mode="r") as f: #apre il file schema.sql che contiene le istruzioni SQL per creare le tabelle del database
        db.executescript(f.read()) #esegue lo script SQL per creare le tabelle
    db.commit() #salva le modifiche al database
    db.close() #chiude la connessione al database

app = Flask(__name__) #creazione dell'app Flask

@app.route('/') #definizione della route principale, la chiocciola si usa la riga prima di una funzione per indicare che quella funzione risponde a una specifica route
def index():   #questa funzione risponde alla route principale
    db = get_db() #ottiene la connessione al database
    results = db.execute("SELECT * FROM species").fetchall()

    return render_template('index.html', n_species=len(results)) #restituisce il file HTML chiamato index.html che ancora non esiste
#il file html viene cercato nella cartella templates se non si specifica un percorso diverso
@app.route('/api/get_species', methods=['POST']) #definizione della route /api/data
#get specifica che questa route risponde solo alle richieste POST
#POST è un metodo HTTP usato per inviare dati al server, ad esempio tramite un form o dati aggiuntivi per identificare la richiesta esatta
#se fosse stato un GET, la route avrebbe risposto a richieste GET, che di solito vengono utilizzate per recuperare dati
#le richieste avvengono tramite http, e le route sono gli endpoint a cui si può accedere tramite http

def get_species():
    data= request.get_json() #ottiene i dati JSON inviati nella richiesta POST
    specie = data['species'] #estrae il valore associato alla chiave 'species' dai dati JSON
    db = get_db() #ottiene la connessione al database
    results = db.execute("SELECT * FROM species WHERE species = (?)", (specie,)).fetchall() #esegue una query SQL per selezionare tutte le righe dalla tabella species e memorizza i risultati
    #ora creo la risposta che arrival all'utente
    return jsonify({"entries": [dict(row) for row in results]}) #restituisce i risultati come JSON

if __name__ == '__main__': #se questo file viene eseguito direttamente
    if not os.path.exists('db/database.db'): #se il database non esiste
        with app.app_context(): #crea un contesto dell'app Flask per poter accedere alle risorse dell'app
            init_db()
    app.run(debug=True) #avvia il server Flask in modalità debug, che fornisce informazioni dettagliate sugli errori e ricarica automaticamente l'app quando si apportano modifiche al codice