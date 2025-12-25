export type Verdict = "HIRE" | "MAYBE" | "REJECT";

export type Candidate = {
  id?: string;
  filename: string;
  score: number;
  verdict: Verdict;
  reasons: string;
  rawText: string;
};
