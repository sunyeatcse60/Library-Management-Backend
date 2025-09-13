export interface IBorrow {
    book : string;
    quantity : number;
    duedate : Date;
    createdAt ?: Date;
    updatedAt ?: Date;
}