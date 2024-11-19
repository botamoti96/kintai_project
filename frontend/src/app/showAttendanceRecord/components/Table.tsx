"use client"
import AttendanceRecordType from "@/app/types/AttendanceRecordType";
import {ChangeEvent, useState} from "react";
import CreateTableFunc from "../function/CreateTable";

interface AttendanceProps {
    data: AttendanceRecordType[];
  }


const TableComponent = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const data = CreateTableFunc(new Date(), "1");

    const handleSelectedYear = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleSelectedMonth = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <>
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
                <table border={1}>
                    <caption>
                        {selectedYear === "" ? "xxxx":selectedYear}年　{selectedMonth === "" ? "xx":selectedMonth}月分    勤務実績通知書
                    </caption>
                    <thead>
                        
                    </thead>
                    <tbody>
                        <tr className="workplace">
                            <th scope="row" colSpan={3}>就業場所</th>
                            <td colSpan={3}></td>
                            <th>部署名</th>
                            <th colSpan={1}></th>
                            <td colSpan={1}></td>
                        </tr>
                        <tr className="time-name">
                            <th scope="row" colSpan={3}>就業時間</th>
                            <td className="time" colSpan={2}>9:00 - 18:00</td>
                            <td className="_"> </td>
                            <th>氏名</th>
                            <td>氏名入力欄</td>
                        </tr>
                        <tr>
                            <th className="date-column" scope="row" colSpan={1}>日</th>
                            <th className="weekday-column" scope="row" colSpan={1}>曜日</th>
                            <th scope="col" colSpan={1}>始業時間</th>
                            <th scope="col" colSpan={1}>就業時間</th>
                            <th scope="col" colSpan={1}>休憩時間</th>
                            <th scope="col" colSpan={1}>実質時間数</th>
                            <th scope="col" colSpan={1}>時間外勤務時間数</th>
                            <th className="note-column" scope="row" colSpan={1}>備考</th>
                        </tr>
                        {data.map((record, index) => (
                            <tr key={index}>
                                <td>{record.attendanceDate}</td>
                                <td>{record.dayOfWeek}</td>
                                <td>{record.startTime}</td>
                                <td>{record.finishTime}</td>
                                <td>{record.breakTime}</td>
                                <td>{record.actualTime}</td>
                                <td>{record.overTime}</td>
                                <td>{record.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableComponent;