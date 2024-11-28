import AttendanceRecordType from "../types/AttendanceRecordType"
import AttendanceTableType from "../types/AttendanceTableType";

export default async function fetchMonthlyAttendance(name:string, year:Number, month:Number){
    const url = `http://localhost:5000/api/attendance/monthly?userName=${name}&year=${year}&month=${month}`;
    console.log(url);
    const result : void|AttendanceTableType[] = await fetch(url, {
        method: "GET",
    }).then((res : Response)=>{
        if(!res.ok){
            throw new Error(`HTTP Error: ${res.status}`)
        }
        return res.json() as Promise<AttendanceTableType[]>;
    }).then((array : AttendanceTableType[])=>{
        return array;
    }).catch((error)=>{
        console.error("ERROR:" + error);
    })
    console.log(result);
    return result;
}