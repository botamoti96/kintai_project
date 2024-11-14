"use client"
import {ChangeEvent, useState} from "react";


const showAttendanceRecord = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleSelectedMonth = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (
    <div id="div_attendance_record">
        <div id="div_selectmenu">
            <select name="year" onChange={handleSelectedYear}>
                <option value="" hidden>年</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            <select name="month" defaultValue="月" onChange={handleSelectedMonth}>
                <option value="" hidden>月</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
        <div id="div_record_body">
            <table>
                <caption>
                    {selectedYear === "" ? "xxxx":selectedYear}年　{selectedMonth === "" ? "xx":selectedMonth}月分    勤務実績通知書
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Person</th>
                        <th scope="col">Most interest in</th>
                        <th scope="col">Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Chris</th>
                        <td>HTML tables</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <th scope="row">Dennis</th>
                        <td>Web accessibility</td>
                        <td>45</td>
                    </tr>
                    <tr>
                        <th scope="row">Sarah</th>
                        <td>JavaScript frameworks</td>
                        <td>29</td>
                    </tr>
                    <tr>
                        <th scope="row">Karen</th>
                        <td>Web performance</td>
                        <td>36</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" colSpan={2}>Average age</th>
                        <td>33</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>);
};

export default showAttendanceRecord;