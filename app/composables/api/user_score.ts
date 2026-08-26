import type { UserScore } from "~/types/user_score";
import { apiHelper } from "../useApiHelper";

export function useUserScoreApi() {
    const { apiFetch } = apiHelper();

    function getByUserId(): Promise<UserScore> {
        return apiFetch("get", "user-score");
    }

    return { getByUserId };
}