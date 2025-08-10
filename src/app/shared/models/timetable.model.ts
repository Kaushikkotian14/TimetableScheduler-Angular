export interface Timetable{
    id?:string;
    date:Date | string;
    title:string;
    start: Date | string;
    end: Date | string;
    professor:string;
    roomNo:number;
}