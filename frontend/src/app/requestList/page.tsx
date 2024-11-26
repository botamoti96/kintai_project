"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

import { NextPage } from "next";
import AttendanceRecordType from "../types/AttendanceRecordType";
import CreateTableFunc from "../showAttendanceRecord/function/CreateTable";

//ウィンドウの右上に配置するボタン
const WindowButton = () => {
  return (
    <div className={styles.windowButtons}>
      {/* ウィンドウボタン：黄色、緑、赤 */}
      <div
        className={styles.windowButton}
        style={{ backgroundColor: "yellow" }}
      ></div>
      <div
        className={styles.windowButton}
        style={{ backgroundColor: "green" }}
      ></div>
      <div
        className={styles.windowButton}
        style={{ backgroundColor: "red" }}
      ></div>
    </div>
  );
};

//ウィンドウの左上に配置するメニューバー
const MenuBar = () => {
  // プルダウンメニューの表示状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // メニューが開いているかどうか
  const menuRef = useRef<HTMLDivElement | null>(null); // メニューの参照を保持
  return (
    <div>
      <div className={styles.menuBar}>
        <div
          className={styles.menuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)} // メニューアイコンをクリックした時に開閉
        >
          &#9776;
        </div>

        {/* プルダウンメニュー */}
        {isMenuOpen && (
          <div ref={menuRef} className={styles.dropdownMenu}>
            <Link href="../time_card">
              <div className={styles.menuItem}>出退勤打刻</div>
            </Link>
            <Link href="../showAttendanceRecord">
              <div className={styles.menuItem}>出勤簿履歴表示</div>
            </Link>
            <Link href="../request">
              <div className={styles.menuItem}>新規申請書の作成</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

//タイトル
const Header = () => {
  return <h1 className="underline">申請承認履歴一覧</h1>;
};

const Homeback = () => {
  return <Link href="/">ホームに戻る</Link>;
};

const HandleSelectedYearMonth = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("11");

  const [data, setData] = useState<AttendanceRecordType[]>(
    CreateTableFunc(new Date(0, 0, 0), "1")
  );

  useEffect(() => {
    if (selectedYear != "xxxx" && selectedMonth != "xx") {
      console.log(selectedYear + "/" + selectedMonth);
      //月を指定するときは-1しないといけない
      //1月を表現するなら、new Dateの引数には0と入れる
      setData(
        CreateTableFunc(
          new Date(Number(selectedYear), Number(selectedMonth) - 1, 1),
          "1"
        )
      );
    }
  }, [selectedYear, selectedMonth]);

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
          <option value="" hidden>
            年
          </option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select name="month" defaultValue="月" onChange={handleSelectedMonth}>
          <option value="" hidden>
            月
          </option>
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
    </>
  );
};

const requestPage = () => {
  return (
    <div className={styles.container}>
      <MenuBar />
      <Header />
      <div className={styles.header}>
        <WindowButton />
        <HandleSelectedYearMonth />
      </div>

      <br></br>

      <RequestTable />

      <br></br>
      <Homeback />
    </div>
  );
};

//テーブルコンポーネント
const RequestTable = () => {
  //データ配列
  const date = [
    {
      requestId: 1,
      year: "2024",
      month: "11",
      day: "1",
      dayOfWeek: "金",
      startTime: "09:00",
      finishTime: "17:00",
      breakTime: "01:00",
      realTime: "07:00",
      overTime: "00:00",
      note: "早退",
      isApproved: 0,
    },
    {
      requestId: 2,
      year: "2024",
      month: "11",
      day: "5",
      dayOfWeek: "火",
      startTime: "10:00",
      finishTime: "18:00",
      breakTime: "01:00",
      realTime: "07:00",
      overTime: "00:00",
      note: "遅刻",
      isApproved: 1,
    },
    {
      requestId: 3,
      year: "2024",
      month: "11",
      day: "6",
      dayOfWeek: "水",
      startTime: "09:00",
      finishTime: "12:00",
      breakTime: "00:00",
      realTime: "03:00",
      overTime: "00:00",
      note: "午後半休有給",
      isApproved: 2,
    },
  ];

  //dateTimeを使う意味あるのか不明だけどつかってみている↓
  return (
    <>
      {date.map((item, index) => (
        <div key={item.requestId} className={styles.requestContainer}>
          <table className={styles.table}>
            <caption className={styles.caption}>
              {date[index].year}年 {date[index].month}月 勤務実績通知書
            </caption>
            <thead className={styles.abc}>
              <tr>
                <th scope="row" colSpan={3} className={styles.thLayout}>
                  {" "}
                  就業場所{" "}
                </th>
                <td colSpan={3} className={styles.tdMainLayout}>
                  SCSK
                </td>
                <th scope="row" colSpan={1} className={styles.thLayout}>
                  {" "}
                  部署名{" "}
                </th>
                <td colSpan={2} className={styles.tdMainLayout}>
                  情報システム部
                </td>
              </tr>

              <tr>
                <th scope="row" colSpan={3} className={styles.thLayout}>
                  就業時間
                </th>
                <td colSpan={3} className={styles.tdMainLayout}>
                  <time dateTime="2024-11-11">9:00-18:00</time>
                </td>
                <th scope="row" colSpan={1} className={styles.thLayout}>
                  {" "}
                  氏名{" "}
                </th>
                <td colSpan={2} className={styles.tdMainLayout}>
                  田中一郎
                </td>
              </tr>
            </thead>
            <thead className={styles.tdlayout}>
              <tr>
                <th scope="col" className={styles.thLayout}>
                  日
                </th>
                <th scope="col" className={styles.thLayout}>
                  曜日
                </th>
                <th scope="col" className={styles.thLayout}>
                  始業時間
                </th>
                <th scope="col" className={styles.thLayout}>
                  終業時間
                </th>
                <th scope="col" className={styles.thLayout}>
                  休憩時間
                </th>
                <th scope="col" className={styles.thLayout}>
                  実質時間数
                </th>
                <th scope="col" className={styles.thLayout}>
                  時間外勤務 時間数
                </th>
                <th scope="col" colSpan={2} className={styles.thLayout}>
                  備考
                </th>
              </tr>
            </thead>
            <tbody className={styles.black}>
              <tr>
                <td className={styles.thLayout}>{date[index].day}</td>
                <td className={styles.thLayout}>{date[index].dayOfWeek}</td>
                <td className={styles.thLayout}>{date[index].startTime}</td>
                <td className={styles.thLayout}>{date[index].finishTime}</td>
                <td className={styles.thLayout}>{date[index].breakTime}</td>
                <td className={styles.thLayout}>{date[index].realTime}</td>
                <td className={styles.thLayout}>{date[index].overTime} </td>
                <td colSpan={2} className={styles.thLayout}>
                  {date[index].note}
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          {/*承認されているかの判定↓*/}
          <button className={styles.label}>
            {(() => {
              if (date[index].isApproved === 0) {
                return <div>承認待ち</div>;
              } else if (date[index].isApproved === 1) {
                return <div>承認</div>;
              } else {
                return <div>承認却下</div>;
              }
            })()}
          </button>
          <br></br>
        </div>
      ))}
    </>
  );
};

export default requestPage;
