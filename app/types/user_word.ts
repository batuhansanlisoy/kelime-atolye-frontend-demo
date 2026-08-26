export interface UserWord {
    id: number,
    correctCount: number,
    wrongCount: number,
    userId: number,
    wordId: number,
    updatedAt: string,
};

export interface CreateUserWordDTO {
  wordId: number;
  correctCount: number;
  wrongCount: number;
}