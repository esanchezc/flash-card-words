export interface FlashCard {
  id: string;
  bucket: string;          // e.g. "Set 1", "Week 20", "Module 1"
  word: string;            // e.g. "infirmity"
  translation: string;     // e.g. "debilidad física"
  notes?: string;          // e.g. "discapacidad"
  definition: string;      // e.g. "A physical weakness or defect; ailment"
  example?: string;        // e.g. "Old age brought on various infirmities."
  mastered?: boolean;
  starred?: boolean;
  isCustom?: boolean;      // Created in-app
}

export interface BucketStats {
  bucketName: string;
  totalCards: number;
  masteredCards: number;
  starredCards: number;
}
