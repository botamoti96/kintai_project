export default interface RequestRecordType {
    
    requestId : number,
    attendanceId : number,
    employeeId : string,
    requestDate : string,
    year : string,
    month : string,
    day : string,
    dayOfWeek : number,
    startTime : string,
    finishTime : string,
    breakTime : string,
    actualTime : string,
    overTime : string,
    notes : string,
    isApproved : number,
    ApprovedDate : string
};