import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

import { NextPage } from "next";

const Header = () => {
  return <h1 className="underline">申請履歴一覧になる予定です</h1>;
};

const Homeback = () => {
  return <Link href="/">ホームに戻る</Link>;
};
const requestPage = () => {
  return (
    <div className={styles.all}>
      <Header />
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
        <div key={item.requestId}>
          <table className={styles.table}>
            <caption className="black">
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
          <button className={styles.kh}>
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
