export interface Timetable{
    id?:string;
    date:Date | string;
    title:string;
    start: Date | string;
    end: Date | string;
    pro:string;
    rno:number;
}