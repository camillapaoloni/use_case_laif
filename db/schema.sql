CREATE TABLE IF NOT EXISTS species (
    species_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identificatore univoco
    domain TEXT NOT NULL,                          -- Dominio (Eukaryota, Bacteria, Archaea)
    kingdom TEXT,                                  -- Regno (Animalia, Plantae, Fungi)
    phylum TEXT,                                   -- Phylum (Chordata, Arthropoda, etc.)
    class TEXT,                                    -- Classe (Mammalia, Insecta, etc.)
    order_name TEXT,                               -- Ordine (Carnivora, Primates, etc.)
    family TEXT,                                   -- Famiglia (Canidae, Hominidae, etc.)
    genus TEXT NOT NULL,                           -- Genere (Canis, Homo, etc.)
    species TEXT NOT NULL,                         -- Specie (lupus, sapiens, etc.)
    subspecies TEXT,                               -- Sottospecie (italicus, etc.)
    scientific_name TEXT NOT NULL UNIQUE,          -- Nome scientifico (Canis lupus italicus)
    common_name TEXT,                              -- Nome comune (Lupo appenninico)
    author TEXT,                                   -- Autore della descrizione
    year_described INTEGER,                        -- Anno di descrizione
    conservation_status TEXT,                      -- Stato di conservazione (IUCN)
    distribution TEXT,                             -- Distribuzione geografica
    notes TEXT,                                    -- Annotazioni varie
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data di inserimento
);

INSERT INTO species (
    domain, kingdom, phylum, class, order_name, family, genus, species, subspecies,
    scientific_name, common_name, author, year_described, conservation_status, distribution, notes
) VALUES
-- 1. Lupo appenninico
('Eukaryota', 'Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'lupus', 'italicus',
 'Canis lupus italicus', 'Lupo appenninico', 'Altobello', 1921, 'Least Concern',
 'Italia centrale e meridionale', 'Sottospecie endemica italiana del lupo grigio.'),

-- 2. Uomo
('Eukaryota', 'Animalia', 'Chordata', 'Mammalia', 'Primates', 'Hominidae', 'Homo', 'sapiens', NULL,
 'Homo sapiens', 'Uomo', 'Linnaeus', 1758, 'Least Concern',
 'Distribuzione globale', 'Specie umana attuale.'),

-- 3. Tigre del Bengala
('Eukaryota', 'Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Panthera', 'tigris', 'tigris',
 'Panthera tigris tigris', 'Tigre del Bengala', 'Linnaeus', 1758, 'Endangered',
 'Asia meridionale', 'Una delle sottospecie di tigre più numerose, ma in declino.'),

-- 4. Panda gigante
('Eukaryota', 'Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Ursidae', 'Ailuropoda', 'melanoleuca', NULL,
 'Ailuropoda melanoleuca', 'Panda gigante', 'David', 1869, 'Vulnerable',
 'Cina centrale', 'Dieta prevalentemente a base di bambù.'),

-- 5. Aquila reale
('Eukaryota', 'Animalia', 'Chordata', 'Aves', 'Accipitriformes', 'Accipitridae', 'Aquila', 'chrysaetos', NULL,
 'Aquila chrysaetos', 'Aquila reale', 'Linnaeus', 1758, 'Least Concern',
 'Emisfero nord', 'Predatore di grande taglia, simbolo di forza e libertà.'),

-- 6. Tartaruga marina verde
('Eukaryota', 'Animalia', 'Chordata', 'Reptilia', 'Testudines', 'Cheloniidae', 'Chelonia', 'mydas', NULL,
 'Chelonia mydas', 'Tartaruga marina verde', 'Linnaeus', 1758, 'Endangered',
 'Zone tropicali e subtropicali', 'Specie migratrice, minacciata da pesca e inquinamento.'),

-- 7. Trota fario
('Eukaryota', 'Animalia', 'Chordata', 'Actinopterygii', 'Salmoniformes', 'Salmonidae', 'Salmo', 'trutta', 'fario',
 'Salmo trutta fario', 'Trota fario', 'Linnaeus', 1758, 'Least Concern',
 'Fiumi e torrenti d Europa', 'Specie d acqua dolce molto apprezzata nella pesca sportiva.'),

-- 8. Quercia roverella
('Eukaryota', 'Plantae', 'Tracheophyta', 'Magnoliopsida', 'Fagales', 'Fagaceae', 'Quercus', 'pubescens', NULL,
 'Quercus pubescens', 'Roverella', 'Willdenow', 1805, 'Least Concern',
 'Europa meridionale e centrale', 'Specie arborea tipica di climi temperati caldi.'),

-- 9. Ape mellifera
('Eukaryota', 'Animalia', 'Arthropoda', 'Insecta', 'Hymenoptera', 'Apidae', 'Apis', 'mellifera', NULL,
 'Apis mellifera', 'Ape domestica', 'Linnaeus', 1758, 'Not Evaluated',
 'Distribuzione mondiale', 'Specie chiave per l impollinazione e la produzione di miele.'),

-- 10. Escherichia coli
('Bacteria', 'Eubacteria', 'Proteobacteria', 'Gammaproteobacteria', 'Enterobacterales', 'Enterobacteriaceae',
 'Escherichia', 'coli', NULL,
 'Escherichia coli', 'E. coli', 'Escherich', 1885, 'Not Evaluated',
 'Intestino di animali a sangue caldo', 'Specie modello in biologia molecolare e genetica.');