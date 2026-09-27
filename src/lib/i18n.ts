export type Language = "en" | "es";

export const translations = {
  en: {
    // Header & Buckets
    selectBucket: "Select Bucket / Set",
    globalPool: "Global Pool (All Words)",
    newBucket: "New Bucket",
    exportCSV: "Export CSV",
    shuffle: "Shuffle deck",
    inQueue: "in queue",
    cardOf: "Card",
    of: "of",
    gotItBadge: "Got it",

    // Card
    clue: "Clue",
    tapToReveal: "Tap to reveal",
    tapToHide: "Tap to hide",
    tapToSeeDefinition: "Tap card to see definition",
    tapToFlip: "Tap to flip",
    definition: "Definition",
    example: "Example",

    // Controls
    needsWork: "Needs Work",
    leftArrow: "← Left Arrow",
    gotIt: "Got It!",
    rightArrow: "Right Arrow →",
    flipCard: "Flip Card",

    // Completion Screen
    bucketCompleted: "Bucket Completed!",
    masteredSubtitle: (count: number) =>
      `You successfully memorized all ${count} words in this set.`,
    practiceAgain: "Practice This Set Again",
    reviewStarred: (count: number) => `Review Starred Words (${count})`,
    chooseAnotherBucket: "Choose Another Bucket",

    // New Bucket Modal
    createNewBucket: "Create New Bucket",
    modalSubtitle: "Group a new set of words (e.g. 10 words for this week)",
    bucketNameLabel: "Bucket / Group Name",
    bucketNamePlaceholder: "e.g. Week 2, Module 3, Medical Set",
    pasteLabel: "Paste Word List (CSV or Line by Line)",
    pastePlaceholder: `Example format:\nword, "translation", "definition"\n\nOr full CSV:\nresilient, "resiliente", "fuerte", "Able to withstand or recover quickly", "She was resilient in the face of difficulties."`,
    usually10Words: "Usually 10 words",
    formatHelp: "Supports: word, translation, definition or comma/line-separated entries.",
    cancel: "Cancel",
    createAndStudy: "Create & Study Bucket",
    enterBucketNameError: "Please enter a bucket name (e.g. Week 2, Module 1).",
    pasteAtLeastOneError: "Please paste or enter at least one word.",
    couldNotExtractError: "Could not extract any words. Please check your text format.",

    // Empty state & loading
    loadingCards: "Loading vocabulary cards...",
    noWordsInBucket: "No words in this bucket",
    noWordsSubtitle: "Add words or create a new 10-word bucket to start practicing.",
    addWords: "Add Words",
  },
  es: {
    // Header & Buckets
    selectBucket: "Seleccionar Grupo / Set",
    globalPool: "Grupo Global (Todas las palabras)",
    newBucket: "Nuevo Grupo",
    exportCSV: "Exportar CSV",
    shuffle: "Barajar tarjetas",
    inQueue: "en cola",
    cardOf: "Tarjeta",
    of: "de",
    gotItBadge: "Aprendidas",

    // Card
    clue: "Pista",
    tapToReveal: "Toca para ver",
    tapToHide: "Toca para ocultar",
    tapToSeeDefinition: "Toca la tarjeta para ver definición",
    tapToFlip: "Toca para voltear",
    definition: "Definición",
    example: "Ejemplo",

    // Controls
    needsWork: "Repasar",
    leftArrow: "← Flecha Izquierda",
    gotIt: "¡La sé!",
    rightArrow: "Flecha Derecha →",
    flipCard: "Voltear Tarjeta",

    // Completion Screen
    bucketCompleted: "¡Grupo Completado!",
    masteredSubtitle: (count: number) =>
      `Memorizaste con éxito las ${count} palabras de este grupo.`,
    practiceAgain: "Practicar este grupo otra vez",
    reviewStarred: (count: number) => `Repasar palabras con estrella (${count})`,
    chooseAnotherBucket: "Elegir otro grupo",

    // New Bucket Modal
    createNewBucket: "Crear Nuevo Grupo",
    modalSubtitle: "Agrupa un nuevo conjunto de palabras (ej. 10 palabras de esta semana)",
    bucketNameLabel: "Nombre del Grupo / Set",
    bucketNamePlaceholder: "ej. Semana 2, Módulo 3, Set Médico",
    pasteLabel: "Pegar lista de palabras (CSV o línea por línea)",
    pastePlaceholder: `Formato de ejemplo:\npalabra, "traducción", "definición"\n\nO CSV completo:\nresilient, "resiliente", "fuerte", "Able to withstand or recover quickly", "She was resilient in the face of difficulties."`,
    usually10Words: "Usualmente 10 palabras",
    formatHelp: "Soporta: palabra, traducción, definición o líneas separadas por comas.",
    cancel: "Cancelar",
    createAndStudy: "Crear y Estudiar Grupo",
    enterBucketNameError: "Por favor ingresa un nombre para el grupo (ej. Semana 2, Módulo 1).",
    pasteAtLeastOneError: "Por favor pega o ingresa al menos una palabra.",
    couldNotExtractError: "No se pudieron extraer palabras. Por favor revisa el formato.",

    // Empty state & loading
    loadingCards: "Cargando tarjetas de vocabulario...",
    noWordsInBucket: "No hay palabras en este grupo",
    noWordsSubtitle: "Agrega palabras o crea un nuevo grupo de 10 palabras para practicar.",
    addWords: "Agregar Palabras",
  },
};
