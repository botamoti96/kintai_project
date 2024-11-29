import AttendanceTableType from "@/app/types/AttendanceTableType";

export default async function fetchAttendance(){
    const url = "http://localhost:5000/api/attendance/test";
    return await fetch(url, {
        method: 'GET',
    })
        .then((res: Response) => {
            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
            }
            return res.json() as Promise<AttendanceTableType[]>;
        })
        .then((json) => {
            console.log(json); // json は解決済みの List<>
            return json;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}