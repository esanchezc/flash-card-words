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
    modeFlashcards: "Flashcards",
    modeSentenceCheck1: "Sentence Check 1",
    modeSentenceCheck2: "Sentence Check 2",

    // Card
    clue: "Clue",
    tapToReveal: "Tap to reveal",
    tapToHide: "Tap to hide",
    tapToSeeBack: "Tap card to flip",
    tapToFlip: "Tap to flip",
    definition: "Definition",
    translation: "Translation",
    example: "Example",
    chooseMeaning: "Choose the meaning:",
    continueBtn: "Continue →",
    reviewAnswer: "Incorrect — Review Answer",
    correct: "Correct!",
    starWord: "Star word",
    removeStar: "Remove star",

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

    // Add Words Modal
    addWordsModalTitle: "Add Vocabulary Words",
    addWordsModalSubtitle: "Import a 10-word bucket or add words one by one",
    tabCsv: "CSV / Paste",
    tabOneByOne: "One by One",
    bucketNameLabel: "Bucket / Group Name",
    bucketNamePlaceholder: "e.g. Week 2, Module 3, Medical Set",
    targetBucketLabel: "Bucket Target",
    existingBucketsOption: "Choose existing bucket",
    newBucketOption: "+ New Bucket Name",

    // One-by-one fields
    wordField: "Word (English)",
    wordPlaceholder: "e.g. resilient",
    translationField: "Spanish Translation",
    translationPlaceholder: "e.g. resiliente, resistente",
    notesField: "Notes / Synonyms (Optional)",
    notesPlaceholder: "e.g. que se recupera rápido",
    definitionField: "English Definition",
    definitionPlaceholder: "e.g. Able to withstand or recover quickly from difficult conditions.",
    exampleField: "Example Sentence (Optional)",
    examplePlaceholder: "e.g. She was resilient in the face of difficulties.",
    addWordToSetBtn: "Add Word to List",
    wordsInList: (count: number) => `Words in this set (${count})`,
    noWordsInListYet: "No words added yet. Fill out the fields above and tap 'Add Word to List'.",
    saveAndStudy: (count: number) => count > 0 ? `Save & Study (${count} words)` : "Save & Study",
    requiredFieldsMissing: "Please provide at least the Word and Definition.",

    // CSV Paste fields
    pasteLabel: "Paste Word List (CSV or Line by Line)",
    pastePlaceholder: `Example format:\nword, "translation", "definition"\n\nOr full CSV:\nresilient, "resiliente", "fuerte", "Able to withstand or recover quickly", "She was resilient in the face of difficulties."`,
    usually10Words: "Usually 10 words",
    formatHelp: "Supports: word, translation, notes, definition, example.",
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
    modeFlashcards: "Tarjetas",
    modeSentenceCheck1: "Oraciones 1",
    modeSentenceCheck2: "Oraciones 2",

    // Card
    clue: "Pista",
    tapToReveal: "Toca para ver",
    tapToHide: "Toca para ocultar",
    tapToSeeBack: "Toca la tarjeta para voltear",
    tapToFlip: "Toca para voltear",
    definition: "Definición",
    translation: "Traducción",
    example: "Ejemplo",
    chooseMeaning: "Elige el significado:",
    continueBtn: "Continuar →",
    reviewAnswer: "Incorrecto — Repasar Respuesta",
    correct: "¡Correcto!",
    starWord: "Destacar palabra",
    removeStar: "Quitar estrella",

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

    // Add Words Modal
    addWordsModalTitle: "Agregar Palabras de Vocabulario",
    addWordsModalSubtitle: "Importa un grupo de 10 palabras o agrégalas una por una",
    tabCsv: "CSV / Pegar",
    tabOneByOne: "Una por Una",
    bucketNameLabel: "Nombre del Grupo / Set",
    bucketNamePlaceholder: "ej. Semana 2, Módulo 3, Set Médico",
    targetBucketLabel: "Destino del Grupo",
    existingBucketsOption: "Elegir grupo existente",
    newBucketOption: "+ Nombre de nuevo grupo",

    // One-by-one fields
    wordField: "Palabra (Inglés)",
    wordPlaceholder: "ej. resilient",
    translationField: "Traducción al Español",
    translationPlaceholder: "ej. resiliente, resistente",
    notesField: "Notas / Sinónimos (Opcional)",
    notesPlaceholder: "ej. que se recupera rápido",
    definitionField: "Definición en Inglés",
    definitionPlaceholder: "ej. Able to withstand or recover quickly from difficult conditions.",
    exampleField: "Frase de Ejemplo (Opcional)",
    examplePlaceholder: "ej. She was resilient in the face of difficulties.",
    addWordToSetBtn: "Agregar Palabra a la Lista",
    wordsInList: (count: number) => `Palabras en este grupo (${count})`,
    noWordsInListYet: "Aún no hay palabras agregadas. Llena los campos arriba y toca 'Agregar Palabra a la Lista'.",
    saveAndStudy: (count: number) => count > 0 ? `Guardar y Estudiar (${count} palabras)` : "Guardar y Estudiar",
    requiredFieldsMissing: "Por favor proporciona al menos la Palabra y la Definición.",

    // CSV Paste fields
    pasteLabel: "Pegar lista de palabras (CSV o línea por línea)",
    pastePlaceholder: `Formato de ejemplo:\npalabra, "traducción", "definición"\n\nO CSV completo:\nresilient, "resiliente", "fuerte", "Able to withstand or recover quickly", "She was resilient in the face of difficulties."`,
    usually10Words: "Usualmente 10 palabras",
    formatHelp: "Soporta: palabra, traducción, notas, definición, ejemplo.",
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
