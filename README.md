# 🧬 Linneus Classifier

A simple Flask web application for classifying and managing biological species based on Linnean taxonomy.

## 🚀 Overview

**Linneus Classifier** allows users to:
- Search for existing species in a local database
- Add new species through a structured form
- Explore taxonomic fields (Domain, Kingdom, Phylum, etc.)

Built using **Python (Flask)**, **Bootstrap 5**, and a lightweight **SQLite** backend.

---

## 🧠 How it works

1. The main page (`index.html`) lets you input a species name.
2. A Flask route queries the SQLite database and returns results dynamically.
3. JavaScript (`script.js`) handles form submission asynchronously, showing the output without reloading the page.
4. The `/add_form` page allows insertion of new species entries.

---

## 🐳 Run with Docker

```bash
# 1. Clone the repository
git clone https://github.com/camillapaoloni/use_case_laif.git
cd linneus-classifier

# 2. Build the Docker image
docker build -t linneus-classifier .

# 3. Run the container
docker run -p 5000:5000 linneus-classifier
