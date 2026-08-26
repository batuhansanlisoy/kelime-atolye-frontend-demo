import { apiHelper } from "../useApiHelper";

export interface Word {
  id: number;
  english: string;
  turkish: string;
  frequency: number;
  category?: string;
}

export interface WordListQuery {
  limit?: number;
  page?: number;
  letter?: string;
  sortBy?: 'popular' | 'alphabetical' | 'random';
}

export function useWordApi() {
  const { apiFetch } = apiHelper();

  // Kelimeleri listelemek için fonksiyon
  function list(query?: WordListQuery): Promise<Word[]> {
    return apiFetch("get", "word/list", query);
  }

  return { list };
}