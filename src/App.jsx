import React, { useState, useEffect, useRef } from 'react';
import { 
  GitBranch, 
  Users, 
  Settings, 
  HelpCircle, 
  TrendingUp, 
  Coins, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Sliders,
  Target,
  FileText,
  Activity,
  Heart,
  Briefcase,
  Calendar,
  Users2,
  FileCheck,
  Eye,
  Award,
  ChevronDown,
  ChevronUp,
  Printer,
  Sparkles,
  Building
} from 'lucide-react';
import './App.css';

function App() {
  const [config, setConfig] = useState('trasformativa'); // 'convenzionale' or 'trasformativa'
  const [activeDim, setActiveDim] = useState('strategico'); // 'strategico', 'istituzionale', 'organizzativo'
  const [activeTab, setActiveTab] = useState('cube'); // 'cube', 'continuum', 'purpose', 'timeline', 'quiz'
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [scenario, setScenario] = useState('pmi'); // 'pmi' or 'corporate'
  const [expandedPhase, setExpandedPhase] = useState(null); // index of expanded timeline phase
  const [sroiBudget, setSroiBudget] = useState(100000);
  
  // Custom manual rotation angles
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({ q1: null, q2: null, q3: null, q4: null, q5: null });
  const [quizScore, setQuizScore] = useState(0);

  // Diagnostic questions for "Scuole Aperte"
  const quizQuestions = [
    {
      id: 'q1',
      dimension: 'Strategica',
      title: "1. Indirizzo Strategico: Qual è il focus prevalente dell'intervento?",
      options: [
        { text: "Erogazione di singoli servizi educativi a catalogo con logica cliente-fornitore e risposta a bisogni contingenti.", score: 0, type: 'convenzionale' },
        { text: "Focus sociale: scuola come presidio civico e bene comune, contrasto alle povertà educative, rafforzamento delle competenze di vita e coesione.", score: 20, type: 'trasformativa' }
      ]
    },
    {
      id: 'q2',
      dimension: 'Istituzionale',
      title: "2. Indirizzo Istituzionale: Come viene intesa la cittadinanza?",
      options: [
        { text: "Fruizione passiva di attività da parte di studenti e famiglie intesi come meri utenti/destinatari finali.", score: 0, type: 'convenzionale' },
        { text: "Azione civica e corresponsabilità: famiglie, ragazzi e attori territoriali sono protagonisti attivi della comunità educante.", score: 20, type: 'trasformativa' }
      ]
    },
    {
      id: 'q3',
      dimension: 'Istituzionale',
      title: "3. Strumenti di Rete: Come si formalizzano gli impegni tra gli attori?",
      options: [
        { text: "Bandi di affidamento tradizionali e accordi formali basati esclusivamente su conformità amministrativa o status giuridico.", score: 0, type: 'convenzionale' },
        { text: "Patti Educativi di Comunità: accordi reciproci di co-gestione, condivisione di obiettivi e cura collettiva dei beni comuni.", score: 20, type: 'trasformativa' }
      ]
    },
    {
      id: 'q4',
      dimension: 'Organizzativa',
      title: "4. Indirizzo Organizzativo: Quale logica di pianificazione guida il Comune?",
      options: [
        { text: "Approccio prescrittivo: soluzioni integralmente predefinite dal Comune con orari, spazi e moduli rigidi e standardizzati.", score: 0, type: 'convenzionale' },
        { text: "Orientamento del processo: regia pubblica abilitante, co-design, analisi dei bisogni e sperimentazione flessibile place-based.", score: 20, type: 'trasformativa' }
      ]
    },
    {
      id: 'q5',
      dimension: 'Organizzativa',
      title: "5. Evoluzione del Modello: Come si produce il valore pubblico?",
      options: [
        { text: "Esecuzione di progetti chiusi a bando con indicatori puramente quantitativi di spesa ed erogazione a ore.", score: 0, type: 'convenzionale' },
        { text: "Apprendimento collaborativo: monitoraggio ricorsivo, valutazione d'impatto SROI e capacità di adattare le risposte ai bisogni reali.", score: 20, type: 'trasformativa' }
      ]
    }
  ];

  // Calculate score when answers change
  useEffect(() => {
    let score = 0;
    Object.keys(quizAnswers).forEach(key => {
      if (quizAnswers[key] !== null) {
        score += quizAnswers[key];
      }
    });
    setQuizScore(score);
    
    // Automatically change config state based on quiz score for visualization
    if (score >= 60) {
      setConfig('trasformativa');
    } else {
      setConfig('convenzionale');
    }
  }, [quizAnswers]);

  // Update cube rotation based on config and active dimension
  useEffect(() => {
    if (isAutoRotate || activeTab !== 'cube') return;
    
    let targetX = -15;
    let targetY = 25;

    if (activeDim === 'strategico') {
      targetX = 0;
      targetY = config === 'trasformativa' ? 0 : 180;
    } else if (activeDim === 'istituzionale') {
      targetX = 0;
      targetY = config === 'trasformativa' ? -90 : 90;
    } else if (activeDim === 'organizzativo') {
      targetX = config === 'trasformativa' ? -90 : 90;
      targetY = 0;
    }

    setRotation({ x: targetX, y: targetY });
  }, [config, activeDim, isAutoRotate, activeTab]);

  // Handle Dragging / Rotation controls
  const handleMouseDown = (e) => {
    isDragging.current = true;
    setIsAutoRotate(false);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setRotation((prev) => ({
      x: Math.min(Math.max(prev.x - deltaY * 0.5, -90), 90),
      y: prev.y + deltaX * 0.5,
    }));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Data definitions for the 3 dimensions according to Scuole Aperte model
  const dimensionData = {
    strategico: {
      title: "Indirizzo Strategico",
      badge: "2. Focus Sociale",
      question: "Qual è il focus prevalente del progetto 'Scuole Aperte'?",
      subQuestions: [
        "Quale ambito specifico è – prioritariamente, prevalentemente… - interessato dall’intervento?",
        "Quale sfera d’intervento costituisce l'oggetto principale del programma?",
        "Su quale aspetto della realtà collettiva si concentra prevalentemente l'intervento?",
        "Quale bene collettivo viene perseguito prioritariamente?"
      ],
      convenzionale: {
        focus: "Ambito: Servizio a Catalogo & Erogazione Standard",
        desc: "Attività extrascolastiche gestite come fornitura prestazionale a catalogo, concepite come risposte parcellizzate e isolate dal contesto.",
        points: [
          "Focus: limitato alla sola custodia temporale o a singoli corsi extrascolastici standard.",
          "Sfera d'intervento: logica cliente-fornitore con esigenze di standardizzazione ed efficientamento.",
          "Realtà collettiva: separazione tra tempo scolastico formale e bisogni sociali della comunità.",
          "Bene collettivo: inteso in chiave puramente funzionale o erogativa dall'alto."
        ]
      },
      trasformativa: {
        focus: "Opzione 2. Focus Sociale & Contrasto alle Povertà Educative",
        desc: "La scuola è promossa come presidio civico e bene comune: ampliamento delle opportunità extrascolastiche, contrasto alle disuguaglianze, sostegno alle famiglie e coesione sociale.",
        points: [
          "Focus: contrasto alle povertà educative, inclusione, welfare locale e coesione sociale.",
          "Sfera d'intervento: integrazione tra competenze curricolari e competenze di cittadinanza (progetto di vita e progetto di comunità).",
          "Realtà collettiva: relazioni territoriali più dense e capitale sociale diffuso tra scuola, famiglie, bambini ed educatori.",
          "Bene collettivo: la governance collaborativa è il metodo essenziale per conseguire risultati sociali trasformativi."
        ]
      }
    },
    istituzionale: {
      title: "Indirizzo Istituzionale",
      badge: "3. Azione Civica",
      question: "Quale idea di cittadinanza istituzionale si mobilita nel progetto?",
      subQuestions: [
        "Quali principi di cittadinanza sono richiamati nello svolgimento del progetto?",
        "Quali caratteri della cittadinanza trovano espressione nell’iniziativa?",
        "Quali componenti dell'idea di cittadinanza ispirano l’iniziativa?",
        "Come si declina la titolarità sostanziale rispetto allo status giuridico?"
      ],
      convenzionale: {
        focus: "Delega Passiva e Fruizione Individuale",
        desc: "I cittadini, i minori e le famiglie sono considerati semplici destinatari passivi o consumatori di attività progettate da altri.",
        points: [
          "Appartenenza: formale o burocratica, legata alla sola iscrizione scolastica.",
          "Azione civica: assente; il ruolo dell'utenza è limitato alla fruizione o al reclamo.",
          "Status: regolato da contratti rigidi di fornitura o accesso prestazionale.",
          "Principi: affidamento delegante che deresponsabilizza la comunità territoriale."
        ]
      },
      trasformativa: {
        focus: "Opzione 3. Azione Civica & Patti Educativi di Comunità",
        desc: "La cittadinanza è esercizio attivo di responsabilità verso il bene comune: famiglie, alunni e attori territoriali sono parte viva della comunità educante.",
        points: [
          "Appartenenza: comunità educante aperta in cui appartenere dipende dalla condivisione sostanziale degli obiettivi.",
          "Azione civica: corresponsabilità educativa, partecipazione attiva e cura diretta dei beni comuni.",
          "Status: superamento dei vincoli formali/giuridici in favore di impegni reciproci concreti.",
          "Principi: Patti Educativi di Comunità come strumenti di co-decisione e corresponsabilità sociale."
        ]
      }
    },
    organizzativo: {
      title: "Indirizzo Organizzativo",
      badge: "2. Orientamento del Processo",
      question: "Quale logica organizzativa guida la realizzazione del progetto?",
      subQuestions: [
        "Quale logica organizzativa ispira l’intervento?",
        "Quale impostazione progettuale orienta l’intervento?",
        "Quale assetto organizzativo caratterizza l’intervento?",
        "Come si realizza il coordinamento place-based delle responsabilità?"
      ],
      convenzionale: {
        focus: "Approccio Prescrittivo e Amministrazione Erogatrice",
        desc: "Soluzioni integralmente predefinite dal Comune con bandi rigidi, orari prestabiliti e standardizzazione che impedisce l'adattamento ai contesti.",
        points: [
          "Logica: amministrazione puramente erogatrice con pacchetti chiusi ex-ante.",
          "Impostazione: modello prescrittivo centralizzato senza co-progettazione sul campo.",
          "Giustizia: procedurale e formalistica, incapace di cogliere i bisogni specifici di quartiere."
        ]
      },
      trasformativa: {
        focus: "Opzione 2. Orientamento del Processo & Co-design Collaborativo",
        desc: "Il Comune definisce la cornice e la regia, mentre le soluzioni vengono elaborate con gli attori territoriali attraverso co-design, sperimentazione e patti place-based.",
        points: [
          "Logica: passaggio da amministrazione erogatrice a istituzione che attiva e coordina responsabilità collettive.",
          "Impostazione: ascolto e interpretazione dei bisogni come punto di partenza per accordi concreti e differenziati.",
          "Giustizia: capacitante, abilitante e fondata sull'apprendimento collaborativo ricorsivo."
        ]
      }
    }
  };

  // Strategic operational timeline for Patti Educativi di Comunità - Scuole Aperte
  const timelinePhases = [
    {
      phase: "Fase 1",
      title: "Analisi dei Bisogni & Manifestazione d'Interesse",
      icon: <Users2 size={22} />,
      period: "Mese 1 - 2",
      actions: [
        "Mappatura place-based dei bisogni educativi, sociali e di conciliazione nei quartieri target di Reggio Emilia.",
        "Avviso pubblico e manifestazione d'interesse per scuole, associazioni del terzo settore, comitati genitori e realtà educative.",
        "Costituzione del tavolo di regia territoriale coordinato dal Comune con il supporto scientifico UNIMORE."
      ],
      rischi: "Rischio di polarizzazione o diffidenza iniziale tra istituzioni scolastiche e realtà del terzo settore.",
      attori: "Comune di Reggio Emilia, Dirigenti Scolastici, UNIMORE, Terzo Settore.",
      deliverable: "Mappa del Fabbisogno Educativo di Quartiere ed Elenco Soggetti Aderenti."
    },
    {
      phase: "Fase 2",
      title: "Co-Design & Sottoscrizione dei Patti Educativi di Comunità",
      icon: <GitBranch size={22} />,
      period: "Mese 3 - 4",
      actions: [
        "Tavoli laboratoriali di co-progettazione tra docenti, educatori, famiglie, studenti e associazioni civiche.",
        "Definizione puntuale di attività extrascolastiche, orari di apertura, ruoli, risorse condivise e impegni reciproci.",
        "Stipula e firma pubblica dei Patti Educativi di Comunità per ciascun plesso scolastico partecipante."
      ],
      rischi: "Complessità nella convergenza su obiettivi comuni superando la logica cliente-fornitore.",
      attori: "Comunità Educante, Comune, Scuole, Genitori, Operatori Sociali e Culturali.",
      deliverable: "Patti Educativi di Comunità sottoscritti con calendario delle attività."
    },
    {
      phase: "Fase 3",
      title: "Apertura Presidi Scolastici & Sperimentazione Place-Based",
      icon: <Calendar size={22} />,
      period: "Mese 5 - 10",
      actions: [
        "Apertura delle scuole oltre l'orario curricolare (pomeriggi, weekend, periodi estivi) come presidi civici aperti.",
        "Attivazione di laboratori di rinforzo didattico, potenziamento linguistico, teatro, sport, musica e cittadinanza attiva.",
        "Monitoraggio in itinere e adattamento rapido delle attività in base alla frequenza e ai riscontri di ragazzi e famiglie."
      ],
      rischi: "Calo di frequenza degli alunni più vulnerabili per difficoltà logistiche o carichi familiari.",
      attori: "Educatori, Volontari, Animatori di Comunità, Scuole, Minori e Famiglie.",
      deliverable: "Cruscotto di monitoraggio mensile delle presenze e delle attività realizzate."
    },
    {
      phase: "Fase 4",
      title: "Valutazione d'Impatto Sociale (SROI & Competenze)",
      icon: <FileCheck size={22} />,
      period: "Mese 11",
      actions: [
        "Misurazione econometrica del Social Return on Investment (SROI) generato sui minori, sulle famiglie e sulla comunità.",
        "Rilevazione dell'impatto sul contrasto alla dispersione, sul benessere emotivo e sull'acquisizione di competenze di vita.",
        "Valutazione del capitale sociale generato e del grado di corresponsabilità civica attivata nei territori."
      ],
      rischi: "Rischio di limitarsi a metriche di output quantitativo (n. iscritti) trascurando gli impatti trasformativi di lungo periodo.",
      attori: "Nucleo di Valutazione d'Impatto (UNIMORE), Comune, Reti Scolastiche.",
      deliverable: "Report Econometrico SROI e Matrice di Valutazione d'Impatto Educativo."
    },
    {
      phase: "Fase 5",
      title: "Apprendimento Collaborativo & Istituzionalizzazione",
      icon: <Eye size={22} />,
      period: "Mese 12",
      actions: [
        "Restituzione pubblica dei risultati alla città e condivisione dell'apprendimento collaborativo maturato.",
        "Integrazione stabile delle buone pratiche nel Piano dell'Offerta Formativa e nelle politiche di welfare cittadino.",
        "Estensione progressiva del modello ad altri istituti comprensivi e quartieri di Reggio Emilia."
      ],
      rischi: "Rischio di mancata sostenibilità economica per gli anni successivi in assenza di programmazione strutturale.",
      attori: "Cittadinanza, Giunta Comunale, Consulte di Quartiere, Dirigenti Scolastici.",
      deliverable: "Piano Pluriennale di Consolidamento di 'Scuole Aperte' a Reggio Emilia."
    }
  ];

  // Dynamic values depending on Scenario
  const scenarioDetails = {
    pmi: {
      title: "Scenario: Istituti Comprensivi di Quartiere (Presidio Sociale)",
      badge: "Inclusione & Prossimità",
      icon: <Users size={22} />,
      challenge: "Contrasto alle povertà educative, isolamento delle famiglie e supporto pomeridiano a contesti ad alta vulnerabilità.",
      solution: "Scuola aperta come presidio civico quotidiano: patti con associazioni di quartiere, oratori e volontariato per laboratori, studio assistito e supporto alla genitorialità.",
      kpis: [
        { label: "Riduzione rischio dispersione scolastica", value: "-35%" },
        { label: "Famiglie attivamente coinvolte nei Patti", value: "88%" },
        { label: "Ore annue di apertura pomeridiana/estiva", value: "+220h" }
      ],
      cost: "Finanziamento pubblico a regia comunale integrato da risorse del Terzo Settore e fondazioni."
    },
    corporate: {
      title: "Scenario: Poli Superiori & Reti Integrate (Cittadinanza Attiva)",
      badge: "Competenze & Alleanze",
      icon: <Building size={22} />,
      challenge: "Coinvolgimento degli adolescenti, orientamento alle carriere, competenze di cittadinanza e raccordo scuola-lavoro.",
      solution: "Patti di comunità allargati con imprese del territorio, FabLab, atenei (UNIMORE) e centri giovanili per co-working e progetti civici.",
      kpis: [
        { label: "Partecipazione studenti ad attività di cittadinanza", value: "+45%" },
        { label: "Partner territoriali e imprese attivate per polo", value: "15+" },
        { label: "Competenze trasversali e civiche certificate", value: "92%" }
      ],
      cost: "Accordi pubblico-privati con fondi di innovazione educativa, Terzo Settore e supporto del tessuto economico locale."
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo-reggio-emilia.png" alt="Comune di Reggio Emilia" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
            <img src="/appLogoIcon.png" alt="UNIMORE" style={{ height: '52px', width: 'auto', objectFit: 'contain', alignSelf: 'flex-start', marginBottom: '4px' }} />
            <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Dipartimento di Comunicazione ed Economia</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="officina-title">Officina di Cittadinanza d'Impresa e Istituzionale</div>
          <div style={{ 
            color: '#ff3b30', 
            textShadow: '0 0 10px rgba(255, 59, 48, 0.8), 0 0 20px rgba(255, 59, 48, 0.4)', 
            fontFamily: 'var(--font-display)', 
            fontWeight: '800', 
            fontSize: '1.25rem', 
            letterSpacing: '1px', 
            marginTop: '0.2rem', 
            textTransform: 'uppercase' 
          }}>
            PROGETTO "SCUOLE APERTE" - Presidio Civico & Comunità Educante
          </div>
        </div>
        
        {/* Actions & Print */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            className="control-btn" 
            onClick={handlePrint}
            title="Stampa Report PDF"
            style={{ width: 'auto', borderRadius: '20px', padding: '0.5rem 1rem', display: 'flex', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            <Printer size={16} /> Esporta PDF
          </button>
          
          {/* Toggle Configuration */}
          <div className="config-toggle-container">
            <button 
              className={`toggle-btn ${config === 'convenzionale' ? 'active convenzionale' : ''}`}
              onClick={() => { setConfig('convenzionale'); }}
            >
              Convenzionale
            </button>
            <button 
              className={`toggle-btn ${config === 'trasformativa' ? 'active trasformativa' : ''}`}
              onClick={() => { setConfig('trasformativa'); }}
            >
              Trasformativa
            </button>
          </div>
        </div>
      </header>



      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={`toggle-btn ${activeTab === 'cube' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('cube')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'cube' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Layers size={16} /> Modello Analitico (Cubo 3D)
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'continuum' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('continuum')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'continuum' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Sliders size={16} /> Continuum delle Soluzioni
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'purpose' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('purpose')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'purpose' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Target size={16} /> Purpose, Impatti & Attese
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'timeline' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('timeline')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'timeline' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Calendar size={16} /> Timeline & Rischi
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'economia' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('economia')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'economia' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Coins size={16} /> Valutazione Economica & SROI
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'glossario' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('glossario')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'glossario' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <FileText size={16} /> Legenda & Glossario
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'quiz' ? 'active trasformativa' : ''}`}
          onClick={() => setActiveTab('quiz')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: activeTab === 'quiz' ? '' : 'rgba(255,255,255,0.03)' }}
        >
          <Sparkles size={16} /> Test Autovalutazione
        </button>
      </div>

      {/* Project Abstract */}
      <div className="glass-card fade-in-slide abstract-banner">
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
          <strong>“Scuole Aperte”</strong> è un progetto di cittadinanza istituzionale a prevalente <strong>focus sociale</strong> (contrasto alle povertà educative, inclusione e coesione sociale), che assume l’<strong>azione civica</strong> come concezione della cittadinanza (corresponsabilità educativa e cura dei beni comuni) e l’<strong>orientamento del processo</strong> come logica organizzativa (co-design, Patti Educativi di Comunità e governance collaborativa). La scuola viene promossa come presidio civico e bene comune; il Comune coordina la costruzione di Patti Educativi con scuole, famiglie e attori territoriali, per sviluppare opportunità educative condivise, contrastare le povertà educative e rafforzare la coesione sociale. Il tratto qualificante è il passaggio da un’amministrazione prevalentemente erogatrice a un’istituzione capace di attivare e coordinare responsabilità collettive.
        </p>
      </div>

      {/* Tab Content 1: 3D Cube */}
      {activeTab === 'cube' && (
        <div className="fade-in-slide">
          <div className="app-grid">
          {/* Left Side - 3D Cube Scene */}
          <div className="glass-card interactive-highlight" style={{ '--accent-gradient': config === 'trasformativa' ? 'var(--grad-transformative)' : 'var(--grad-conventional)' }}>
            <div className="intro-description-card">
              <h3 className="intro-title-text">
                Applicazione dello Schema di Analisi a Progetti di Cittadinanza d'Impresa/Istituzionale <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 'normal', marginLeft: '6px' }}>Neri-Salento (2025)</span>
              </h3>
              <p>
                Naviga gli assi di posizionamento del progetto <strong>"Scuole Aperte"</strong> (Presidio Civico e Bene Comune) per la configurazione di cittadinanza istituzionale. Trascina il cubo per ruotarlo a piacimento o seleziona le dimensioni per centrare il modello.
              </p>

              {/* Matrice di Sintesi Scuole Aperte */}
              <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Collocazione nel modello di cittadinanza istituzionale:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', color: 'var(--text-secondary)' }}>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', borderLeft: '3px solid #f43f5e' }}>
                    <strong style={{ color: '#fff', display: 'block', fontSize: '0.74rem' }}>Indirizzo Strategico</strong>
                    <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>2. Focus sociale</span>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.68rem', lineHeight: '1.2' }}>Contrasto povertà educative, inclusione e coesione</p>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', borderLeft: '3px solid #a855f7' }}>
                    <strong style={{ color: '#fff', display: 'block', fontSize: '0.74rem' }}>Indirizzo Istituzionale</strong>
                    <span style={{ color: '#a855f7', fontWeight: 'bold' }}>3. Azione civica</span>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.68rem', lineHeight: '1.2' }}>Corresponsabilità educativa e cura beni comuni</p>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
                    <strong style={{ color: '#fff', display: 'block', fontSize: '0.74rem' }}>Indirizzo Organizzativo</strong>
                    <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>2. Orient. processo</span>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.68rem', lineHeight: '1.2' }}>Co-design, Patti Educativi e governance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cube-section">
              <div className="cube-mode-label">
                Visualizzazione: <span style={{ color: config === 'trasformativa' ? 'var(--accent-tertiary)' : '#94a3b8', fontWeight: 'bold' }}>{config.toUpperCase()}</span>
              </div>
              
              <div 
                className="scene-3d" 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
              >
                {/* Orbital Sci-Fi Rings in the background */}
                <div className="orbit-ring" />
                
                {/* Floating Shadow under the cube */}
                <div className="cube-shadow" />
                
                <div 
                  className={`cube-3d ${config} ${isAutoRotate ? 'auto-rotating' : ''}`}
                  style={!isAutoRotate ? { transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` } : {}}
                >
                  {/* Glowing Core inside the transparent cube */}
                  <div className="cube-core" />
                  {/* FRONT: Strategico Trasformativo */}
                  <div className={`cube-face front ${activeDim === 'strategico' && config === 'trasformativa' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag strategico">Strategico</span>
                      <span className="face-number">01</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">2. Focus Sociale</h3>
                      <p className="face-desc">Scuola presidio civico, contrasto povertà educative e coesione.</p>
                    </div>
                    <div className="face-footer">Scuole Aperte</div>
                  </div>

                  {/* BACK: Strategico Convenzionale */}
                  <div className={`cube-face back ${activeDim === 'strategico' && config === 'convenzionale' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag">Strategico</span>
                      <span className="face-number">02</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">Servizi a Catalogo</h3>
                      <p className="face-desc">Custodia isolata e fornitura prestazionale cliente-fornitore.</p>
                    </div>
                    <div className="face-footer">Convenzionale</div>
                  </div>

                  {/* RIGHT: Istituzionale Trasformativo */}
                  <div className={`cube-face right ${activeDim === 'istituzionale' && config === 'trasformativa' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag istituzionale">Istituzionale</span>
                      <span className="face-number">03</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">3. Azione Civica</h3>
                      <p className="face-desc">Corresponsabilità educativa e Patti Educativi di Comunità.</p>
                    </div>
                    <div className="face-footer">Scuole Aperte</div>
                  </div>

                  {/* LEFT: Istituzionale Convenzionale */}
                  <div className={`cube-face left ${activeDim === 'istituzionale' && config === 'convenzionale' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag">Istituzionale</span>
                      <span className="face-number">04</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">Delega Passiva</h3>
                      <p className="face-desc">Fruizione individuale e adempimento burocratico.</p>
                    </div>
                    <div className="face-footer">Convenzionale</div>
                  </div>

                  {/* TOP: Organizzativo Trasformativo */}
                  <div className={`cube-face top ${activeDim === 'organizzativo' && config === 'trasformativa' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag organizzativo">Organizzativo</span>
                      <span className="face-number">05</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">2. Orient. Processo</h3>
                      <p className="face-desc">Regia pubblica abilitante, co-design e apprendimento.</p>
                    </div>
                    <div className="face-footer">Scuole Aperte</div>
                  </div>

                  {/* BOTTOM: Organizzativo Convenzionale */}
                  <div className={`cube-face bottom ${activeDim === 'organizzativo' && config === 'convenzionale' ? 'active-dimension' : ''}`}>
                    <div className="face-header">
                      <span className="face-tag">Organizzativo</span>
                      <span className="face-number">06</span>
                    </div>
                    <div className="face-body">
                      <h3 className="face-title">Prescrittivo</h3>
                      <p className="face-desc">Soluzioni integralmente predefinite ed erogazione chiusa.</p>
                    </div>
                    <div className="face-footer">Convenzionale</div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="quick-cube-controls">
                <button 
                  className={`control-btn ${isAutoRotate ? 'active' : ''}`}
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  title="Autorotazione"
                >
                  <RotateCw size={18} />
                </button>
              </div>

              {/* Selectors */}
              <div className="dimension-selectors">
                <div 
                  className={`dim-selector-card ${activeDim === 'strategico' ? 'active' : ''}`}
                  onClick={() => { setActiveDim('strategico'); setIsAutoRotate(false); }}
                >
                  <h4 style={{ color: config === 'trasformativa' ? '#f43f5e' : '#94a3b8' }}>Strategico</h4>
                  <span>2. Focus Sociale</span>
                </div>
                <div 
                  className={`dim-selector-card ${activeDim === 'istituzionale' ? 'active' : ''}`}
                  onClick={() => { setActiveDim('istituzionale'); setIsAutoRotate(false); }}
                >
                  <h4 style={{ color: config === 'trasformativa' ? '#a855f7' : '#94a3b8' }}>Istituzionale</h4>
                  <span>3. Azione Civica</span>
                </div>
                <div 
                  className={`dim-selector-card ${activeDim === 'organizzativo' ? 'active' : ''}`}
                  onClick={() => { setActiveDim('organizzativo'); setIsAutoRotate(false); }}
                >
                  <h4 style={{ color: config === 'trasformativa' ? '#06b6d4' : '#94a3b8' }}>Organizzativo</h4>
                  <span>2. Orient. Processo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Dimension Details */}
          <div className="glass-card details-section">
            <div className="dimension-badge-container">
              <span className={`dim-badge ${activeDim}`}>
                {activeDim}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                &mdash; Schema di Analisi
              </span>
            </div>

            <h2>{dimensionData[activeDim].title}</h2>

            {/* Questions list */}
            <div className="detail-card" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle size={16} /> DOMANDE GUIDA DI DETTAGLIO:
              </div>
              <ul style={{ listStyle: 'none', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {dimensionData[activeDim].subQuestions.map((sq, i) => (
                  <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                    • {sq}
                  </li>
                ))}
              </ul>
            </div>

            {/* Compare Rows */}
            <div className="compare-row">
              <div className={`compare-box convenzionale`} style={config === 'convenzionale' ? { border: '1px solid #94a3b8', background: 'rgba(71,85,105,0.15)' } : {}}>
                <div className="compare-title">Convenzionale</div>
                <div className="compare-focus">{dimensionData[activeDim].convenzionale.focus}</div>
                <p className="compare-desc">{dimensionData[activeDim].convenzionale.desc}</p>
                <ul className="compare-list">
                  {dimensionData[activeDim].convenzionale.points.map((p, idx) => (
                    <li key={idx}>
                      <XCircle size={14} className="bullet-red" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`compare-box trasformativa`} style={config === 'trasformativa' ? { border: '1px solid var(--accent-tertiary)', background: 'rgba(99,102,241,0.1)' } : {}}>
                <div className="compare-title">Trasformativa</div>
                <div className="compare-focus">{dimensionData[activeDim].trasformativa.focus}</div>
                <p className="compare-desc">{dimensionData[activeDim].trasformativa.desc}</p>
                <ul className="compare-list">
                  {dimensionData[activeDim].trasformativa.points.map((p, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="bullet-green" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Specific to Modello Analitico */}
          <div className="bottom-grid" style={{ marginTop: '3rem' }}>
            
            {/* Il Cambio di Paradigma di Scuole Aperte */}
            <div className="glass-card">
              <h3 className="intro-title-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} color="var(--accent-tertiary)" />
                I Tre Salti di Paradigma di "Scuole Aperte"
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                "Scuole Aperte" propone un cambio di paradigma del ruolo degli attori nella definizione delle politiche pubbliche e per un modello di sviluppo fondato su governance collaborativa, partecipazione e corresponsabilità:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="benefit-details">
                    <h4>Dal Servizio alla Comunità Educante</h4>
                    <p>La scuola supera i confini orari e diventa luogo di opportunità educative condivise, relazioni territoriali più dense e capitale sociale più diffuso.</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Coins size={18} />
                  </div>
                  <div className="benefit-details">
                    <h4>Dall'Affidamento alla Corresponsabilità</h4>
                    <p>Le organizzazioni condividono obiettivi, risorse e responsabilità; superano il tradizionale modello cliente-fornitore a catalogo per co-produrre valore pubblico.</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Layers size={18} />
                  </div>
                  <div className="benefit-details">
                    <h4>Dal Progetto Predefinito all'Apprendimento Collaborativo</h4>
                    <p>Sperimentazione, valutazione continua e adattamento place-based delle soluzioni educative diventano le nuove capacità generative condivise.</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Award size={18} style={{ color: 'var(--accent-secondary)' }} />
                  </div>
                  <div className="benefit-details">
                    <h4>Patti Educativi di Comunità come Metodo e Presidio</h4>
                    <p>Accordi strutturati tra Comune, scuole, famiglie, terzo settore ed enti territoriali che formalizzano impegni reciproci per la cura dei beni comuni.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Domanda Forte da Portare all'Incontro */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="intro-title-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={20} color="var(--accent-secondary)" />
                  L'Orientamento Istituzionale & Strategico
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Il tratto qualificante di "Scuole Aperte" è il passaggio da un’amministrazione comunale prevalentemente erogatrice a un’istituzione capace di attivare e coordinare responsabilità collettive sul territorio.
                </p>
                
                <div className="detail-card" style={{ background: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Info size={16} color="var(--accent-tertiary)" />
                    <strong style={{ fontSize: '0.85rem' }}>Sintesi della Collocazione Istituzionale</strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    La scuola è promossa come presidio civico e bene comune: combina un <strong>focus sociale</strong> (contrasto alle povertà educative, inclusione e coesione), una concezione della cittadinanza come <strong>azione civica</strong> (corresponsabilità e partecipazione) e una logica organizzativa fondata sull'<strong>orientamento del processo</strong> (co-design e patti territoriali).
                  </p>
                </div>
              </div>

              <div className="strong-question-box" style={{ marginTop: '1.5rem' }}>
                <div>
                  <div className="strong-question-title">Domanda di Posizionamento Chiave</div>
                  <div className="strong-question-text">
                    «Vogliamo considerare la scuola come un semplice fornitore di servizi a catalogo e orari prestabiliti, oppure costruire un presidio civico stabile e bene comune, attivando Patti Educativi di Comunità fondati su corresponsabilità, contrasto alle povertà educative e orientamento del processo?»
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab Content 2: Continuum of options */}
      {activeTab === 'continuum' && (
        <div className="glass-card">
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="continuum-section-title">Continuum delle Scelte Adottabili in "Scuole Aperte"</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Rappresentazione del posizionamento istituzionale sul continuum teorico dell'Officina. Il marcatore indica la collocazione del progetto <strong>"Scuole Aperte"</strong> secondo le dimensioni di analisi Neri-Salento (2025).
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Axis 1: Strategico */}
            <div className="continuum-axis-card">
              <div className="continuum-axis-header">
                <h3 className="continuum-axis-title strategico">
                  <Activity size={18} /> 1. INDIRIZZO STRATEGICO (Opzione prevalente: 2. Focus Sociale)
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Finalità & Impatto Territoriale</span>
              </div>
              
              <div className="slider-container">
                <div className="slider-track">
                  <div className={`slider-fill ${config === 'trasformativa' ? 'trasformativa strategico' : 'convenzionale'}`} />
                  <div 
                    className="slider-marker-wrapper"
                    style={{ left: config === 'trasformativa' ? '90%' : '15%' }}
                  >
                    <div className={`slider-marker-pill ${config === 'trasformativa' ? 'trasformativa strategico' : 'convenzionale'}`}>
                      {config === 'trasformativa' ? 'Focus Sociale' : 'Servizio a Catalogo'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pole-labels">
                <div className={`pole-box left-pole ${config === 'convenzionale' ? 'active' : ''}`}>
                  <span className="pole-title-badge">Servizio a catalogo (Fornitura isolata)</span>
                  <p className="pole-desc">Attività extrascolastiche concepite come prestazioni aggiuntive e isolate con logica fornitore-cliente.</p>
                </div>
                <div className={`pole-box right-pole strategico ${config === 'trasformativa' ? 'active trasformativa' : ''}`}>
                  <span className="pole-title-badge">Opzione 2. Focus sociale (Presidio civico)</span>
                  <p className="pole-desc">Scuola come bene comune: contrasto alle povertà educative, inclusione, sostegno alle famiglie e coesione sociale.</p>
                </div>
              </div>
            </div>

            {/* Axis 2: Istituzionale */}
            <div className="continuum-axis-card">
              <div className="continuum-axis-header">
                <h3 className="continuum-axis-title istituzionale">
                  <Users size={18} /> 2. INDIRIZZO ISTITUZIONALE (Opzione prevalente: 3. Azione Civica)
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cittadinanza & Corresponsabilità</span>
              </div>

              {/* Sub-axis A */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.6rem', color: '#ffffff' }}>
                  <span>A. Comunità di riferimento (Appartenenza)</span>
                </div>
                <div className="slider-container" style={{ height: '24px', margin: '1rem 0' }}>
                  <div className="slider-track" style={{ height: '6px' }}>
                    <div className={`slider-fill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ width: config === 'trasformativa' ? '85%' : '15%' }} />
                    <div className="slider-marker-wrapper" style={{ left: config === 'trasformativa' ? '85%' : '15%' }}>
                      <div className={`slider-marker-pill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ padding: '0.2rem 0.6rem', fontSize: '0.65rem' }}>
                        {config === 'trasformativa' ? 'Comunità Educante' : 'Utenti Iscritti'}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>
                  <span>Fruizione individuale / iscritti al singolo servizio</span>
                  <span>Comunità educante allargata (studenti, famiglie, docenti, terzo settore)</span>
                </div>
              </div>

              {/* Sub-axis B */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.6rem', color: '#ffffff' }}>
                  <span>B. Concezione della Cittadinanza (Azione Civica)</span>
                </div>
                <div className="slider-container" style={{ height: '24px', margin: '1rem 0' }}>
                  <div className="slider-track" style={{ height: '6px' }}>
                    <div className={`slider-fill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ width: config === 'trasformativa' ? '90%' : '10%' }} />
                    <div className="slider-marker-wrapper" style={{ left: config === 'trasformativa' ? '90%' : '10%' }}>
                      <div className={`slider-marker-pill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ padding: '0.2rem 0.6rem', fontSize: '0.65rem' }}>
                        {config === 'trasformativa' ? 'Azione Civica' : 'Delega Passiva'}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>
                  <span>Delega assistenziale / Utente passivo</span>
                  <span>Opzione 3. Azione civica (Esercizio attivo di responsabilità e cura dei beni comuni)</span>
                </div>
              </div>

              {/* Sub-axis C */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.6rem', color: '#ffffff' }}>
                  <span>C. Strumenti e Titolarità (Status e Patti)</span>
                </div>
                <div className="slider-container" style={{ height: '24px', margin: '1rem 0' }}>
                  <div className="slider-track" style={{ height: '6px' }}>
                    <div className={`slider-fill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ width: config === 'trasformativa' ? '80%' : '20%' }} />
                    <div className="slider-marker-wrapper" style={{ left: config === 'trasformativa' ? '80%' : '20%' }}>
                      <div className={`slider-marker-pill ${config === 'trasformativa' ? 'trasformativa istituzionale' : 'convenzionale'}`} style={{ padding: '0.2rem 0.6rem', fontSize: '0.65rem' }}>
                        {config === 'trasformativa' ? 'Patti di Comunità' : 'Adempimento Formale'}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>
                  <span>Status formale / Requisiti burocratici di bando</span>
                  <span>Patti Educativi di Comunità (Impegni reciproci e partecipazione sostanziale)</span>
                </div>
              </div>
            </div>

            {/* Axis 3: Organizzativo */}
            <div className="continuum-axis-card">
              <div className="continuum-axis-header">
                <h3 className="continuum-axis-title organizzativo">
                  <Settings size={18} /> 3. INDIRIZZO ORGANIZZATIVO (Opzione prevalente: 2. Orientamento del Processo)
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Regia Pubblica & Co-design</span>
              </div>
              
              <div className="slider-container">
                <div className="slider-track">
                  <div className={`slider-fill ${config === 'trasformativa' ? 'trasformativa organizzativo' : 'convenzionale'}`} />
                  <div 
                    className="slider-marker-wrapper"
                    style={{ left: config === 'trasformativa' ? '85%' : '15%' }}
                  >
                    <div className={`slider-marker-pill ${config === 'trasformativa' ? 'trasformativa organizzativo' : 'convenzionale'}`}>
                      {config === 'trasformativa' ? 'Orient. Processo' : 'Prescrittivo'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pole-labels">
                <div className={`pole-box left-pole ${config === 'convenzionale' ? 'active' : ''}`}>
                  <span className="pole-title-badge">Approccio Prescrittivo (Erogativo)</span>
                  <p className="pole-desc">Soluzioni integralmente predefinite dal Comune con orari rigidi e standardizzazione burocratica.</p>
                </div>
                <div className={`pole-box right-pole organizzativo ${config === 'trasformativa' ? 'active trasformativa' : ''}`}>
                  <span className="pole-title-badge">Opzione 2. Orientamento del processo</span>
                  <p className="pole-desc">Regia comunale abilitante, manifestazioni d'interesse, co-design place-based e apprendimento collaborativo.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab Content 3: Purpose & Impacts */}
      {activeTab === 'purpose' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Slide 19 Theoretical Box: Scuole Aperte */}
          <div className="glass-card interactive-highlight" style={{ '--accent-gradient': 'var(--grad-transformative)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem', color: '#a855f7' }}>
              Il Purpose di "Scuole Aperte": Verso la Comunità Educante
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Il <em>purpose</em> di "Scuole Aperte" ridefinisce l'identità istituzionale della scuola: da semplice erogatore di lezioni ed attività a catalogo a <strong>presidio civico e bene comune</strong> aperto al quartiere, in cui convergono le energie di istituzioni, famiglie, terzo settore e realtà produttive.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Primo Salto di Paradigma</span>
                <h4 style={{ margin: '0.5rem 0', color: '#fff' }}>Dal Servizio Isolato</h4>
                <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', margin: '0.3rem 0' }}>↓</div>
                <h4 style={{ color: 'var(--accent-tertiary)' }}>Alla Comunità Educante</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>La scuola come luogo di relazioni territoriali dense, opportunità educative condivise e capitale sociale.</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Secondo Salto di Paradigma</span>
                <h4 style={{ margin: '0.5rem 0', color: '#fff' }}>Dall'Affidamento Cliente/Fornitore</h4>
                <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', margin: '0.3rem 0' }}>↓</div>
                <h4 style={{ color: 'var(--accent-tertiary)' }}>Alla Corresponsabilità</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Condivisione di obiettivi, risorse e responsabilità per co-produrre valore pubblico e cura dei beni comuni.</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Terzo Salto di Paradigma</span>
                <h4 style={{ margin: '0.5rem 0', color: '#fff' }}>Dal Progetto Predefinito</h4>
                <div style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', margin: '0.3rem 0' }}>↓</div>
                <h4 style={{ color: 'var(--accent-tertiary)' }}>All'Apprendimento Collaborativo</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Sperimentazione, monitoraggio ricorsivo e adattamento place-based delle soluzioni educative.</p>
              </div>
            </div>
            
            <div className="formula-highlight" style={{ marginTop: '1.5rem', background: 'rgba(168, 85, 247, 0.08)' }}>
              <span>I <strong>Patti Educativi di Comunità</strong> sono lo strumento operativo in cui il purpose si traduce in alleanze stabili tra scuola, famiglie, Comune e città.</span>
            </div>
          </div>

          {/* Dynamic Scenario Dashboard */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            
            {/* Integrated Scenario Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.2rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Building size={20} color="var(--accent-tertiary)" />
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#fff' }}>Simulatore di Scenario Applicativo:</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confronta le modalità operative di "Scuole Aperte" in base al contesto e al grado scolastico.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={`toggle-btn ${scenario === 'pmi' ? 'active trasformativa' : ''}`}
                  onClick={() => setScenario('pmi')}
                  style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}
                >
                  Istituti Comprensivi di Quartiere
                </button>
                <button 
                  className={`toggle-btn ${scenario === 'corporate' ? 'active trasformativa' : ''}`}
                  onClick={() => setScenario('corporate')}
                  style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}
                >
                  Poli Superiori & Reti Integrate
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>Configurazione Scenario Corrente</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {scenarioDetails[scenario].icon} {scenarioDetails[scenario].title}
                </h3>
              </div>
              <span className="dim-badge istituzionale">{scenarioDetails[scenario].badge}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem' }}>Sfida Principale dello Scenario:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>{scenarioDetails[scenario].challenge}</p>

                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem' }}>Soluzione Applicativa Consigliata:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>{scenarioDetails[scenario].solution}</p>

                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem' }}>Struttura e Regia delle Risorse:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{scenarioDetails[scenario].cost}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.15)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--accent-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>KPI & Impatti Attesi di Scenario</strong>
                {scenarioDetails[scenario].kpis.map((kpi, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: idx !== 2 ? '0.6rem' : '0' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>{kpi.label}</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-tertiary)' }}>{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expected Impacts Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Impact on Children & Families */}
            <div className="glass-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-tertiary)' }}>
                <Heart size={20} /> Impatti sui Minori e sulle Famiglie
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Contrasto alle Povertà Educative:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Opportunità extrascolastiche gratuite o accessibili: studio assistito, arte, sport e linguaggi digitali per azzerare le disuguaglianze.</p>
                  </div>
                </li>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Progetto di Vita e di Comunità:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Rinforzo congiunto delle competenze curricolari e di quelle di cittadinanza nell'interazione con adulti ed educatori di prossimità.</p>
                  </div>
                </li>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Sostegno alla Genitorialità e Conciliazione:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>La scuola come presidio sicuro e accogliente che supporta le famiglie nei tempi di vita e lavoro e combatte la solitudine educativa.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Impact on School & Community */}
            <div className="glass-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
                <Briefcase size={20} /> Impatti sulla Comunità Territoriale
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Presidio Civico e Cura dei Beni Comuni:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Gli spazi scolastici e i cortili aperti rigenerano il quartiere, migliorano la vivibilità urbana e contrastano il degrado.</p>
                  </div>
                </li>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Capitale Sociale e Reti Fiduciarie:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Costruzione di legami stabili di corresponsabilità tra docenti, genitori, associazioni, cooperative e volontari.</p>
                  </div>
                </li>
                <li style={{ fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <strong>Alleanza Pubblico-Civica & Welfare Generativo:</strong>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Il Comune evolve da mero fornitore a coordinatore di energie collettive, certificando impatti sociali misurabili.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Tab Content 4: Operational Timeline & Accountability */}
      {activeTab === 'timeline' && (
        <div className="glass-card">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Timeline di Progetto, Onboarding & Accountability</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Un percorso strategico in 5 fasi pensato per tradurre il modello teorico in pratica territoriale strutturata. Clicca sui singoli pulsanti delle fasi per esplorare i rischi e gli attori coinvolti.
            </p>
          </div>

          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(99,102,241,0.2)' }}>
            {timelinePhases.map((phase, index) => (
              <div key={index} style={{ position: 'relative', marginBottom: '2.5rem' }}>
                {/* Timeline dot */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '-2.7rem', 
                    top: '0', 
                    background: 'var(--bg-secondary)', 
                    border: '2px solid var(--accent-primary)', 
                    color: 'var(--accent-tertiary)',
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  {phase.icon}
                </div>

                {/* Phase Content */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginLeft: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-tertiary)', fontWeight: 'bold', letterSpacing: '1px' }}>
                        {phase.phase} &bull; {phase.period}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff', marginTop: '0.2rem' }}>
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                    {phase.actions.map((act, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                        <ArrowRight size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '0.2rem' }} />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expand button */}
                  <button 
                    className="timeline-expandable-btn"
                    onClick={() => setExpandedPhase(expandedPhase === index ? null : index)}
                  >
                    {expandedPhase === index ? (
                      <>Chiudi Dettagli Diagnostici <ChevronUp size={14} /></>
                    ) : (
                      <>Espandi Rischi & Attori <ChevronDown size={14} /></>
                    )}
                  </button>

                  {/* Expandable details drawer */}
                  <div className={`timeline-details-drawer ${expandedPhase === index ? 'expanded' : ''}`}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <strong style={{ fontSize: '0.8rem', color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.3rem' }}>
                          ⚠️ Principali Fattori di Rischio:
                        </strong>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{phase.rischi}</p>
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.8rem', color: 'var(--accent-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.3rem' }}>
                          👥 Attori Chiave Coinvolti:
                        </strong>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{phase.attori}</p>
                      </div>
                    </div>
                  </div>

                  {/* Output/Deliverable banner */}
                  <div style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99,102,241,0.2)', padding: '0.8rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem' }}>
                    <Award size={16} style={{ color: 'var(--accent-secondary)' }} />
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>
                      <strong>Output Atteso:</strong> {phase.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Valutazione Economica & SROI */}
      {activeTab === 'economia' && (
        <div className="fade-in-slide">
          <div className="glass-card" style={{ padding: '2rem' }}>
            
            {/* Economic Evaluation & SROI Simulation */}
            <h3 className="intro-title-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#fff' }}>
              <Coins size={20} color="var(--accent-secondary)" />
              Valutazione Econometrica & SROI di "Scuole Aperte"
            </h3>

            <div className="sroi-wrapper" style={{ marginBottom: '2.5rem' }}>
              <div className="sroi-slider-container">
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-tertiary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Budget di Investimento nei Patti Educativi
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Regola l'investimento finanziario complessivo (fondi comunali, risorse scolastiche, terzo settore e contributi del territorio) per calcolare l'impatto sociale ed economico generato a Reggio Emilia dal progetto "Scuole Aperte".
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'var(--font-display)', color: '#fff' }}>
                    € {sroiBudget.toLocaleString('it-IT')}
                  </span>
                  <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(230,0,0,0.15)', color: '#ff4444', border: '1px solid rgba(230,0,0,0.3)', fontWeight: 'bold' }}>
                    FONDO PATTI EDUCATIVI
                  </span>
                </div>
                <input 
                  type="range" 
                  min="20000" 
                  max="500000" 
                  step="5000" 
                  value={sroiBudget} 
                  onChange={(e) => setSroiBudget(Number(e.target.value))}
                  className="sroi-range-input"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>€ 20.000 (Sperimentazione 1 Plesso)</span>
                  <span>€ 500.000 (Rete Cittadina Pluriennale)</span>
                </div>
              </div>

              <div className="detail-card sroi-circle-card" style={{ margin: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: '700' }}>
                  Rapporto SROI Stimato
                </span>
                <div className="sroi-circle-container" style={{ position: 'relative', width: '170px', height: '170px' }}>
                  <svg width="170" height="170" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="url(#sroiGrad)" strokeWidth="8" fill="transparent" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 - (251.2 * 0.76)}
                    />
                    <defs>
                      <linearGradient id="sroiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#e60000" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="sroi-circle-value" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '900', fontSize: '2.5rem', color: '#fff' }}>
                    1:2.4
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'center' }}>
                  Per ogni euro investito nei Patti Educativi, "Scuole Aperte" genera <strong>€ 2,40</strong> di valore sociale ed educativo sul territorio.
                </p>
                <div className="sroi-formula-box" style={{ marginTop: '1rem' }}>
                  SROI = (Valore Sociale Generato / Capitale Investito) = {Math.round(sroiBudget * 2.4).toLocaleString('it-IT')}€ / {sroiBudget.toLocaleString('it-IT')}€
                </div>
              </div>
            </div>

            <div className="sroi-metrics-grid" style={{ marginBottom: '2.5rem' }}>
              <div className="sroi-progress-card">
                <div className="sroi-progress-header">
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Valore per i Minori e le Famiglie (Opportunità & Conciliazione)</span>
                  <strong style={{ color: 'var(--accent-secondary)' }}>€ {Math.round(sroiBudget * 0.95).toLocaleString('it-IT')} (95% del budget)</strong>
                </div>
                <div className="sroi-progress-bar-bg">
                  <div className="sroi-progress-bar-fill families" style={{ width: '95%' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.3' }}>
                  Risparmi diretti per le famiglie (doposcuola privato, lezioni, attività sportive e culturali), contrasto alla povertà educativa e conciliazione dei tempi di vita e lavoro per i genitori.
                </p>
              </div>

              <div className="sroi-progress-card">
                <div className="sroi-progress-header">
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Valore per la Comunità Educante & Terzo Settore (Capitale Sociale & Reti)</span>
                  <strong style={{ color: 'var(--accent-tertiary)' }}>€ {Math.round(sroiBudget * 0.85).toLocaleString('it-IT')} (85% del budget)</strong>
                </div>
                <div className="sroi-progress-bar-bg">
                  <div className="sroi-progress-bar-fill business" style={{ width: '85%' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.3' }}>
                  Rafforzamento della corresponsabilità educativa, valorizzazione delle professionalità del terzo settore, arricchimento dell'offerta formativa e cura condivisa degli spazi scolastici.
                </p>
              </div>

              <div className="sroi-progress-card">
                <div className="sroi-progress-header">
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Valore per il Comune & Cittadinanza (Inclusione & Sicurezza Civica)</span>
                  <strong style={{ color: '#f43f5e' }}>€ {Math.round(sroiBudget * 0.60).toLocaleString('it-IT')} (60% del budget)</strong>
                </div>
                <div className="sroi-progress-bar-bg">
                  <div className="sroi-progress-bar-fill community" style={{ width: '60%' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.3' }}>
                  Abbattimento dei costi sociali della dispersione scolastica e del disagio giovanile, rigenerazione civica dei quartieri e potenziamento della coesione sociale cittadina.
                </p>
              </div>
            </div>

            {/* Hybrid Funding Model */}
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Modello di Finanziamento Ibrido dei Patti Educativi
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Composizione multipartner delle risorse per garantire stabilità, autonomia e corresponsabilità tra gli attori della comunità educante:
              </p>
              
              <div className="funding-split-bar">
                <div className="funding-segment" style={{ width: '40%', background: '#a855f7' }} title="Comune di Reggio Emilia & Fondi Pubblici">40% COMUNE</div>
                <div className="funding-segment" style={{ width: '30%', background: '#6366f1' }} title="Istituzioni Scolastiche & Fondazioni">30% SCUOLE/ETS</div>
                <div className="funding-segment" style={{ width: '20%', background: '#06b6d4' }} title="Tessuto Produttivo & Imprese (CSR)">20% IMPRESE</div>
                <div className="funding-segment" style={{ width: '10%', background: '#f43f5e' }} title="Comunità Locale & Cura Condivisa">10% COMUNITÀ</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div style={{ borderLeft: '3px solid #a855f7', paddingLeft: '8px' }}>
                  <strong>Regia e Fondi Pubblici (40%):</strong> Finanziamenti comunali, regionali e PNRR dedicati al contrasto alla povertà educativa.
                </div>
                <div style={{ borderLeft: '3px solid #6366f1', paddingLeft: '8px' }}>
                  <strong>Scuole & Terzo Settore (30%):</strong> Risorse PON, fondazioni bancarie e cooperative educative territoriali.
                </div>
                <div style={{ borderLeft: '3px solid #06b6d4', paddingLeft: '8px' }}>
                  <strong>Imprese e Fondazioni (20%):</strong> Sostegno del tessuto economico locale (CSR, donazioni e welfare territoriale).
                </div>
                <div style={{ borderLeft: '3px solid #f43f5e', paddingLeft: '8px' }}>
                  <strong>Comunità Educante (10%):</strong> Attivazione del volontariato civico, autogestione dei comitati genitori e cura dei beni comuni.
                </div>
              </div>
            </div>

            {/* Amartya Sen's Capability Mapping */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Mappatura delle Capacità (Amartya Sen's Capability Approach) per "Scuole Aperte"
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                L'approccio teorico di Amartya Sen sposta la valutazione dall'erogazione di semplici ore didattiche alla moltiplicazione delle <strong>capacitazioni e libertà sostanziali</strong> dei minori e delle famiglie sul territorio:
              </p>

              <div className="capability-grid">
                <div className="capability-card">
                  <div className="capability-card-header">
                    <Briefcase size={16} color="var(--accent-secondary)" />
                    Opportunità & Talenti
                  </div>
                  <div className="capability-card-body">
                    <div className="capability-sub-title">Funzionamento Base</div>
                    <div className="capability-text">Frequenza delle sole lezioni obbligatorie; scarse occasioni extrascolastiche di sviluppo dei talenti.</div>
                    <div className="capability-sub-title" style={{ color: 'var(--accent-secondary)', marginTop: '0.4rem' }}>Espansione Capacitante</div>
                    <div className="capability-text">Accesso a laboratori artistici, scientifici, musicali e digitali per orientare il proprio progetto di vita.</div>
                  </div>
                </div>

                <div className="capability-card">
                  <div className="capability-card-header">
                    <Heart size={16} color="var(--accent-tertiary)" />
                    Cura & Genitorialità
                  </div>
                  <div className="capability-card-body">
                    <div className="capability-sub-title">Funzionamento Base</div>
                    <div className="capability-text">Solitudine dei nuclei familiari nella gestione pomeridiana ed estiva con costi proibitivi.</div>
                    <div className="capability-sub-title" style={{ color: 'var(--accent-tertiary)', marginTop: '0.4rem' }}>Espansione Capacitante</div>
                    <div className="capability-text">Presidio civico accogliente e corresponsabilità comunitaria che supporta madri e padri.</div>
                  </div>
                </div>

                <div className="capability-card">
                  <div className="capability-card-header">
                    <Award size={16} color="#f43f5e" />
                    Equità Sostanziale
                  </div>
                  <div className="capability-card-body">
                    <div className="capability-sub-title">Funzionamento Base</div>
                    <div className="capability-text">Disuguaglianze socio-economiche che condizionano la riuscita e l'inclusione scolastica.</div>
                    <div className="capability-sub-title" style={{ color: '#f43f5e', marginTop: '0.4rem' }}>Espansione Capacitante</div>
                    <div className="capability-text">Scuola come bene comune aperto che neutralizza i divari di partenza e crea pari opportunità reali.</div>
                  </div>
                </div>

                <div className="capability-card">
                  <div className="capability-card-header">
                    <Users2 size={16} color="var(--accent-primary)" />
                    Capitale Sociale & Presidio
                  </div>
                  <div className="capability-card-body">
                    <div className="capability-sub-title">Funzionamento Base</div>
                    <div className="capability-text">Edificio scolastico chiuso e isolato che interrompe la relazione con il quartiere alle ore 13 o 16.</div>
                    <div className="capability-sub-title" style={{ color: 'var(--accent-primary)', marginTop: '0.4rem' }}>Espansione Capacitante</div>
                    <div className="capability-text">Patti Educativi di Comunità che generano fiducia diffusa, legami fiduciari e cura civica del territorio.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab Content: Legenda & Glossario dell'Officina */}
      {activeTab === 'glossario' && (
        <div className="fade-in-slide">
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="intro-title-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem', marginBottom: '1.5rem', color: '#fff' }}>
              <FileText size={20} color="var(--accent-primary)" />
              Legenda & Glossario: Il Modello "Scuole Aperte"
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-tertiary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Presidio Civico & Bene Comune</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  La scuola non più intesa come edificio isolato con orari rigidi, ma come infrastruttura civica aperta e accessibile oltre l'orario didattico. Diventa presidio sociale di prossimità per il quartiere e bene comune custodito dall'intera comunità educante.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Patti Educativi di Comunità</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Strumento di governance collaborativa fondato sulla sussidiarietà circolare (art. 118 Cost.). Accordi stabili tra Amministrazione Comunale, Scuole, Terzo Settore, famiglie e imprese del territorio per unire progetto educativo e progetto di comunità.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: '#f43f5e', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Azione Civica & Corresponsabilità</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Superamento radicale della dicotomia "erogatore/utente" o "cliente/fornitore". Studenti, genitori e residenti sono considerati co-attori responsabili nella gestione delle attività e nella cura condivisa degli spazi comuni.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Orientamento del Processo & Co-Design</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Approccio place-based che privilegia l'apprendimento collaborativo, la flessibilità e l'adattamento continuo rispetto all'esecuzione rigida di progetti precostituiti. Si avvale di manifestazioni d'interesse aperte e regia pubblica abilitante.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Contrasto alle Povertà Educative</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Finalità strategica primaria (Focus Sociale): garantire equità sostanziale, rimuovere barriere economiche, culturali e relazionali, offrendo opportunità pomeridiane di qualità (studio, arte, sport, cultura digitale) a tutti i minori.
                </p>
              </div>

            </div>

            <hr style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '2.5rem 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
              
              {/* SROI Methodology Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-secondary)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Coins size={20} /> Metodologia Econometrica: SROI (Social Return on Investment)
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Lo <strong>SROI (Social Return on Investment)</strong> è una metodologia standardizzata a livello europeo per misurare e rendicontare il valore extra-finanziario (sociale, educativo ed ambientale) generato da un investimento. Il progetto <strong>Scuole Aperte</strong> applica un coefficiente SROI stimato pari a <strong>1:2.4</strong>.
                </p>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Formula Econometrica del Ritorno Sociale:</strong>
                  <div style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-secondary)', fontSize: '1.1rem', margin: '0.5rem 0', textAlign: 'center', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                    SROI = (Valore Sociale ed Educativo Netto) / (Capitale Investito)
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', marginTop: '0.5rem' }}>
                    Il valore sociale netto è ricavato sommando la riduzione della dispersione scolastica, il risparmio per le famiglie in attività extrascolastiche private, il miglioramento del benessere giovanile e la valorizzazione del patrimonio pubblico scolastico oltre gli orari standard.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', lineHeight: '1.4', marginTop: '0.5rem', fontWeight: 'bold' }}>
                    📈 Rilevanza per Ente Pubblico & Imprese CSR: Dimostra l'impatto moltiplicatore degli investimenti comunali e di fondazione, rendicontando gli indicatori di impatto ESG e di coesione territoriale.
                  </p>
                </div>
              </div>

              {/* Amartya Sen's Capability Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-tertiary)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={20} /> L'Approccio delle Capacità (Amartya Sen)
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Il <strong>Capability Approach (Approccio delle Capacità)</strong> di Amartya Sen sposta l'asse della giustizia sociale dalla mera fornitura di risorse formali (banchi, aule) alla rimozione degli ostacoli che impediscono l'autorealizzazione e lo sviluppo dei talenti (libertà sostantiva).
                </p>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Fattori di Conversione & Libertà di Scelta:</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    Il progetto Scuole Aperte non misura solo la disponibilità dell'edificio, ma fornisce i <strong>fattori di conversione sociali e relazionali</strong> (laboratori gratuiti, tutoraggio, peer-education) che consentono a ogni ragazzo di trasformare lo spazio in reali opportunità di vita.
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '0.5rem' }}>
                    La scuola si converte da mero contenitore didattico a presidio di equità sostanziale, contrastando la segregazione e rigenerando la fiducia civica.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Tab Content 5: Self-Assessment Quiz */}
      {activeTab === 'quiz' && (
        <div className="glass-card">
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="continuum-section-title">Test di Autovalutazione: Modello "Scuole Aperte" & Cittadinanza Istituzionale</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Rispondi alle domande per misurare il grado di aderenza del tuo istituto o polo territoriale rispetto al modello trasformativo di <strong>Scuole Aperte</strong> (Patti Educativi, Azione Civica, Presidio di Comunità).
            </p>
          </div>

          <div className="quiz-wrapper">
            {/* Left side - Questions */}
            <div>
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="question-card">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-tertiary)', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                    Dimensione {q.dimension}
                  </span>
                  <h3 className="question-title">{q.title}</h3>
                  
                  <div className="option-list">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === opt.score;
                      return (
                        <div 
                          key={optIdx} 
                          className={`option-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                        >
                          <input 
                            type="radio" 
                            name={q.id} 
                            checked={isSelected}
                            onChange={() => {}} // handled by click
                            className="option-input"
                          />
                          <span className="option-text">
                            <strong>{opt.type === 'trasformativa' ? 'Logica Trasformativa: ' : 'Logica Convenzionale: '}</strong>
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Sticky Score Card */}
            <div className="glass-card score-card" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff' }}>
                Indice di Cittadinanza Istituzionale
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Aderenza del progetto alla logica di presidio civico e comunità educante.
              </p>

              <div className="score-circle-wrapper">
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle 
                    cx="75" 
                    cy="75" 
                    r="65" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="75" 
                    cy="75" 
                    r="65" 
                    fill="none" 
                    stroke="var(--accent-primary)" 
                    strokeWidth="10" 
                    strokeDasharray={2 * Math.PI * 65}
                    strokeDashoffset={2 * Math.PI * 65 * (1 - quizScore / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </svg>
                <div className="score-value">{quizScore}%</div>
              </div>

              <div>
                <strong style={{ fontSize: '0.95rem', color: '#fff', display: 'block', marginBottom: '0.4rem' }}>
                  {quizScore === 0 ? "Configura Progetto" :
                   quizScore <= 20 ? "Profilo Tradizionale / Erogativo" :
                   quizScore <= 60 ? "Profilo Ibrido / In Transizione" : 
                   "Profilo Pienamente Trasformativo ('Scuole Aperte')"}
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {quizScore === 0 ? "Rispondi alle 5 domande diagnostiche a sinistra per calcolare il posizionamento del progetto nel modello Scuole Aperte." :
                   quizScore <= 20 ? "La scuola o il servizio opera secondo logiche chiuse ed erogative convenzionali (orari rigidi, famiglie come utenti passivi, scarsi legami col quartiere)." :
                   quizScore <= 60 ? "Il progetto include prime aperture pomeridiane ed intese locali, ma la corresponsabilità civica e i Patti Educativi di Comunità non sono ancora pienamente strutturati." :
                   "Aderenza eccellente al modello: la scuola opera come presidio civico e bene comune, animata da Patti Educativi di Comunità, corresponsabilità civica e regia pubblica abilitante."}
                </p>
              </div>

              {quizScore > 0 && (
                <button 
                  className="control-btn"
                  onClick={() => setQuizAnswers({ q1: null, q2: null, q3: null, q4: null, q5: null })}
                  style={{ marginTop: '1.5rem', width: '100%', borderRadius: '20px', padding: '0.5rem 0', fontWeight: 'bold' }}
                >
                  Resetta Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}





      {/* Footer */}
      <footer style={{ marginTop: '3rem', padding: '1.5rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)' }}>
        Comune di Reggio Emilia & UNIMORE &copy; 2026 | Officina di Cittadinanza d'Impresa e Istituzionale. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

export default App;
