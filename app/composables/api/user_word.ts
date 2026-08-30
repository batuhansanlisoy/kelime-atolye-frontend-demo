import type { CreateUserWordDTO } from "~/types/user_word";
import { apiHelper } from "../useApiHelper";

export interface Stats {
  totalWordCount: number;
  memorizedWordCount: number;
  mistakedWordCount: number
}

export function useUserWordApi() {
    const { apiFetch } = apiHelper();

    function save(payload: CreateUserWordDTO[], isInitial: boolean = false): Promise<{ success: boolean }> {
        return apiFetch("post", "user-words/save", payload, {
          query: { initial: isInitial }
        });
    }

    function stats(): Promise<Stats> {
        return apiFetch("get", "user-words/stats");
    }

    return { save, stats };
}