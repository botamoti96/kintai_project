import fetchMonthlyAttendance from "@/app/async/fetchMonthlyAttendance";
import AttendanceRecordType from "@/app/types/AttendanceRecordType";
import AttendanceTableType from "@/app/types/AttendanceTableType";

const CreateTableFunc = (year: string, month: string, id: string) => {
    //表示したい次の月の0日を指定すると、表示したい月の最終日が何日なのかわかる
    const lastDay = new Date(Number(year), Number(month), 0).getDate();
    //console.log(lastDay)
    const AttendanceRecordData : AttendanceRecordType[] = [];
    const dayList : string[] = ["日", "月", "火", "水", "木", "金", "土"];
    
    //まずは要求されたひと月分のデータを取ってくる。
    const dataset : AttendanceTableType[] = await fetchMonthlyAttendance("佐藤", 2024, 11);
    console.log(dataset);
    
    //一行ずつ作っていく
    //必要なデータはAttendanceRecordTypeにあるやつ全部
    var j = 0;
    for(let i=1; i<= lastDay; i++){
        if(i.toString() === dataset[j].day){
            let dayData = dataset[j];
            let actualTime = calcActualTime(dayData.startTime, dayData.finishTime, dayData.breakTime, dayData.overTime);
            const record :AttendanceRecordType = {
                attendanceDate : dayData.day,
                employeeId : dayData.employeeId,
                dayOfWeek : dayList[Number(dayData.dayOfWeek)],
                startTime : dayData.startTime,
                finishTime : dayData.finishTime,
                breakTime : dayData.breakTime,
                actualTime : dayData,
                overTime : "0:00",
                notes : "備考欄"
            };
            AttendanceRecordData.push(record);
            date.setDate(i+1)
            if(i == lastDay.getDate()){
                break;
            }
    };
    return AttendanceRecordData;
}

const calcActualTime = (start: string, finish: string, breakTime: string, over: string) => {
    return "08:00:00";
}

export default CreateTableFunc;