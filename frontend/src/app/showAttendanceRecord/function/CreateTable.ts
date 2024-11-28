import fetchMonthlyAttendance from "@/app/async/fetchMonthlyAttendance";
import AttendanceRecordType from "@/app/types/AttendanceRecordType";
import AttendanceTableType from "@/app/types/AttendanceTableType";

const calcActualTime = (start: string, finish: string, breakTime: string, over: string) => {
    return "08:00:00";
}

const CreateTableFunc = (dataset: AttendanceTableType[], year:string, month:string) => {
    const AttendanceRecordData : AttendanceRecordType[] = [];
    const holidayJp = require('holiday-jp');
    const dayList : string[] = ["日", "月", "火", "水", "木", "金", "土"];
    
    //一行ずつ作っていく
    //必要なデータはAttendanceRecordTypeにあるやつ全部
    var j = 0;
    console.log(dataset);
    if(dataset.length===0){
        return AttendanceRecordData;
    }
    let record : AttendanceRecordType;
    console.log(dataset.length);
    for(let i=1; i<= 31; i++){
        console.log("i: " + i + " j: " + j);
        const holiday = holidayJp.isHoliday(new Date(Number(year), Number(month)-1, i));
        const isOff = new Date(Number(year), Number(month)-1, i).getDay() == 0 || new Date(Number(year), Number(month)-1, i).getDay() == 6;
        const className = isOff?"dayoff":holiday?"publicHoliday":"";
        if(i.toString() === dataset[j].day){
            let dayData = dataset[j];
            let actualTime = calcActualTime(dayData.startTime, dayData.finishTime, dayData.breakTime, dayData.overTime);
            record =  {
                className : className,
                attendanceDate : dayData.day,
                dayOfWeek : dayList[Number(dayData.dayOfWeek)],
                startTime : dayData.startTime,
                finishTime : dayData.finishTime,
                breakTime : dayData.breakTime,
                actualTime : actualTime,
                overTime : dayData.overTime,
                notes : dayData.notes
            };
            j += 1;
            AttendanceRecordData.push(record);
        } else {
            record = {
                className : className,
                attendanceDate : i.toString(),
                dayOfWeek : dayList[Number(new Date(Number(year), Number(month)-1, i).getDay())],
                startTime : "",
                finishTime : "",
                breakTime : "",
                actualTime : "",
                overTime : "",
                notes : ""
            }
            AttendanceRecordData.push(record);
        }
        if(j >= dataset.length){
            break;
        }
        
    }
    return AttendanceRecordData;
}



export default CreateTableFunc;