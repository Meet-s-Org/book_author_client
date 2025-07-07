import { Book } from "./book";

export interface Author {
    id: string;
    name: string;
    biography: string;
    bornDate: string;
    books?: Book[];
}
