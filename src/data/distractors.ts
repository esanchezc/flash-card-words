// Curated pool of Spanish distractors across various parts of speech (verbs, adjectives, nouns)
export const SPANISH_DISTRACTORS: string[] = [
  "fortalecer",
  "abundante",
  "respetar",
  "antigüedad",
  "equidad",
  "estímulo",
  "objetivo",
  "extenso",
  "innovador",
  "tranquilo",
  "efímero",
  "persistente",
  "desafío",
  "ambigüedad",
  "deteriorar",
  "comprensión",
  "armonía",
  "vulnerable",
  "esencial",
  "prudente",
  "obstinado",
  "complejo",
  "intencional",
  "impredecible",
  "generoso",
  "falso",
  "permanente",
  "confundir",
  "apoyar",
  "precaución",
  "modesto",
  "discreto",
  "evidente",
  "aislado",
  "colaborar",
  "estable",
  "relevante",
  "ilusorio",
  "exagerar",
  "claridad",
  "frecuente",
  "silencioso",
  "intransigente",
  "optimista",
  "lealtad",
  "satisfacer",
  "superficial",
  "adecuado",
  "disminuir",
  "progresar",
  "tolerante",
  "sospechoso",
  "audaz",
  "severo",
  "conciliar",
  "auténtico",
  "fragilidad",
  "diligente",
  "imparcial",
  "prudencia",
  "fructífero",
  "vasto",
  "coherente",
  "repugnante",
  "solidario",
  "vacilante",
  "sereno",
  "desconfiado",
  "abrumador",
  "minucioso",
  "vigoroso",
  "opulento",
  "disimular",
  "escepticismo",
  "inquietud",
  "sagaz",
  "inflexible",
  "impecable",
  "reprochar",
  "desolado",
];

export function getRandomDistractor(
  excludeWords: string[],
  actualPool: string[] = []
): string {
  const normalizedExclude = excludeWords.map((w) =>
    w.toLowerCase().trim()
  );

  // Combine curated distractors with words from the actual deck pool
  const combinedCandidates = Array.from(
    new Set([
      ...SPANISH_DISTRACTORS,
      ...actualPool.map((w) => w.trim()).filter((w) => w.length > 0),
    ])
  );

  const available = combinedCandidates.filter(
    (w) =>
      !normalizedExclude.some(
        (ex) =>
          ex.includes(w.toLowerCase()) || w.toLowerCase().includes(ex)
      )
  );

  if (available.length === 0) return "diferente";
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
