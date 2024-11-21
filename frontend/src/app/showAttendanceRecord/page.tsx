
import TableComponent from "./components/Table";
import CreateTableFunc from "./function/CreateTable";

const ShowAttendanceRecord = () => {
    const d = new Date();
    
    return (
    <div id="div_attendance_record">
        <TableComponent/>
    </div>
    );
};

export default ShowAttendanceRecord;