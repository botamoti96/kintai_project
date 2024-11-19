import AttendanceRecordType from "@/app/types/AttendanceRecordType";

const CreateTableFunc = (date: Date, id: string) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0)
    console.log(lastDay)
    date.setDate(1);
    const AttendanceRecordData : AttendanceRecordType[] = [];
    const dayList : string[] = ["日", "月", "火", "水", "木", "金", "土"];
    date.setDate(1);
    //一行ずつ作っていく
    //必要なデータはAttendanceRecordTypeにあるやつ全部
    for(let i=1; i<= 31; i++){
        const week : string = "";
        AttendanceRecordData.push({
            attendanceDate : (i).toString(),
            employeeId : id,
            dayOfWeek : dayList[date.getDay()],
            startTime : "9:00",
            finishTime : "18:00",
            breakTime : "1:00",
            actualTime : "8:00",
            overTime : "0:00",
            notes : "備考欄"
        });
        date.setDate(i)
        if(i == lastDay.getDate()){
            break;
        }
    };
    return AttendanceRecordData;
}

export default CreateTableFunc;