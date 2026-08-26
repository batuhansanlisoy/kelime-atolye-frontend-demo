import type { Word } from "./word";

export interface Training extends Word {
    options: Word[];
}