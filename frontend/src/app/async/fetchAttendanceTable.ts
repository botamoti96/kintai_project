import AttendanceRecordType from "@/app/types/AttendanceRecordType";

export interface Attendances{
    attendances: AttendanceRecordType[];
}

export default async function fetchAttendance(){
    const url = "http://localhost:5000/api/attendance";
    await fetch(url).then((res : Response)=>{
        if(res.statusText === "OK"){
            return Promise.resolve;
        } else {
            return Promise.reject;
        }
    });
    
    
}