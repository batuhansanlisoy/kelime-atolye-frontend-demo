import type { Training } from "~/types/training";
import { apiHelper } from "../useApiHelper";

export function useTrainingData() {
    const { apiFetch } = apiHelper();

    function list(query?: { limit?: number, subMode: TrainingSubMode }): Promise<Training[]> {
        return apiFetch("get", "training/list", query);
    }

    return { list };
}