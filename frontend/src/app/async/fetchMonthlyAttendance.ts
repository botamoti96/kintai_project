import AttendanceTableType from "../types/AttendanceTableType";

export default async function fetchMonthlyAttendance(name:string, year:Number, month:Number){
    const url = `http://localhost:5000/api/attendance/monthly?userName=${name}&year=${year}&month=${month}`;
    console.log(url);
    const result : AttendanceTableType[] = await fetch(url, {
        method: "GET",
    }).then((res : Response)=>{
        if(!res.ok){
            throw new Error(`HTTP Error: ${res.status}`)
        }
        return res.json() as Promise<AttendanceTableType[]>;
    }).catch((error)=>{
        console.error("ERROR:" + error);
        return [];
    })
    return result;
}