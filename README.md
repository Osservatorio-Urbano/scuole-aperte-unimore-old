# UNIMORE & Comune di Reggio Emilia - Progetto "Scuole Aperte"
## Dashboard Interattiva di Collocazione nel Modello di Cittadinanza Istituzionale (Neri-Salento, 2025)

Applicazione web interattiva per l'esplorazione, la diagnosi e la rendicontazione dell'infrastrutturazione sociale e istituzionale del progetto **"Scuole Aperte"** (Comune di Reggio Emilia in collaborazione con UNIMORE - Officina di Cittadinanza d'Impresa e Istituzionale).

---

### 📌 Inquadramento del Modello (Neri-Salento, 2025)

Il progetto analizza e posiziona la scuola aperta come **presidio civico** e **bene comune**, caratterizzato dai seguenti indirizzi:

1. **Indirizzo Strategico → Opzione Prevalente 2: Focus Sociale**
   - Contrasto alle povertà educative, inclusione sociale e welfare generativo. La governance collaborativa è un mezzo e non un fine.
2. **Indirizzo Istituzionale → Opzione Prevalente 3: Azione Civica**
   - Corresponsabilità educativa e cura condivisa dei beni comuni tramite i **Patti Educativi di Comunità** (art. 118 Cost.). Famiglie e ragazzi sono parte attiva della comunità educante (superamento del modello cliente/fornitore).
3. **Indirizzo Organizzativo → Opzione Prevalente 2: Orientamento del Processo**
   - Approccio *place-based*, co-design, apprendimento collaborativo ed adattamento continuo guidato da una regia pubblica abilitante.

#### 🔄 I Tre Salti di Paradigma:
- **Dal servizio alla comunità educante**: La scuola supera la logica dell'edificio chiuso con orari rigidi e diviene infrastruttura civica di quartiere.
- **Dall'affidamento alla corresponsabilità**: Le famiglie e gli attori locali non sono utenti passivi ma corresponsabili dei processi educativi.
- **Dal progetto predefinito all'apprendimento collaborativo**: Superamento dei bandi rigidi in favore di co-progettazione aperta e flessibile.

---

### 🚀 Funzionalità della Dashboard

- **Cubo 3D Interattivo**: Visualizzazione spaziale tridimensionale della collocazione del progetto tra gli assi Strategico, Istituzionale e Organizzativo.
- **Continuum dei Posizionamenti**: Sliders interattivi per esplorare le transizioni tra logiche convenzionali ed approcci trasformativi.
- **Matrice Purpose & Impatti**: Mappatura degli impatti su minori, famiglie, quartiere e comunità educante.
- **Scenari & Roadmap a 5 Fasi**: Analisi comparativa tra *Istituti Comprensivi di Quartiere* e *Poli delle Scuole Superiori*, con cronoprogramma di implementazione.
- **Econometria SROI & Capability Approach**:
  - Calcolatore dinamico di ritorno sociale sull'investimento (**SROI stimato 1:2.4**).
  - Mappatura delle capacità e dei fattori di conversione ispirata al *Capability Approach* di Amartya Sen.
- **Legenda & Glossario**: Approfondimento scientifico e metodologico dei termini operativi.
- **Test Diagnostico di Autovalutazione**: Questionario in 5 dimensioni per calcolare l'Indice di Cittadinanza Istituzionale dell'istituto o territorio.

---

### 💻 Stack Tecnologico

- **Frontend**: React 19, Vite 8, Lucide React (Iconografia).
- **Styling**: CSS moderno con design system scuro, glassmorphism e responsive layout.
- **Visualizzazione 3D**: Proiezione isometrica CSS 3D interattiva.

---

### 🛠️ Guida all'Installazione ed Avvio Locale

#### Prerequisiti
- Node.js (versione 18 o superiore consigliata)
- npm o pnpm

#### Installazione delle dipendenze
```bash
npm install
```

#### Avvio in ambiente di sviluppo
```bash
npm run dev
```
L'applicazione sarà accessibile localmente su [http://localhost:5173/](http://localhost:5173/).

#### Compilazione per la produzione
```bash
npm run build
```
I file ottimizzati per la pubblicazione verranno generati nella cartella `dist/`.

---

### 📄 Licenza
Progetto realizzato nell'ambito della collaborazione tra **UNIMORE** e il **Comune di Reggio Emilia** (2026).
Tutti i diritti riservati.
