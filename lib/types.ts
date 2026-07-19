export type Mode = "easy" | "medium" | "deep";

export interface QuestionData {
  id: string;
  index: number;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  dimension: string;
}

export interface QuestionSetData {
  id: string;
  name: string;
  description: string;
  modes: Record<Mode, { label: string; count: number }>;
}

export interface QuizAnswer {
  questionId: string;
  chosen: string;
}

export interface CorrectionData {
  questionId: string;
  isCorrect: boolean;
  correctedTo?: string;
  note?: string;
}

export interface ResultSummary {
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  dimensionResults: {
    dimension: string;
    total: number;
    correct: number;
    accuracy: number;
  }[];
  biggestMisunderstandings: {
    question: QuestionData;
    guessed: string;
    actual: string;
  }[];
}
