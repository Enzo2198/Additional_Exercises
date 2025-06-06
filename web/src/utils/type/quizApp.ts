import {Dispatch} from "react";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  selectedOption: string | null;
  showAnswer: boolean;
  isFinished: boolean;
}

export type QuizAction =
  | { type: "SELECT_OPTION"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "RESTART" };

export interface QuizContextProps {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}