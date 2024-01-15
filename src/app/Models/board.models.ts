import { Column } from "./colum.model";

export class Board {
    constructor(public name: string, public columns: Column[]) {}
}