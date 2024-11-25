import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

/*申請新規作成ページを作ります*/

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

/* 
 <div style={styles.menuBar}>
 <div
   style={styles.menuIcon}
   onClick={() => setIsMenuOpen(!isMenuOpen)} // メニューアイコンをクリックした時に開閉
 >
   &#9776;
 </div>

 {/* プルダウンメニュー 
 {isMenuOpen && (
   <div ref={menuRef} style={styles.dropdownMenu}>
     <Link href="../request">
       <div style={styles.menuItem}>新規申請書の作成</div>
     </Link>
     <Link href="../showAttendanceRecord">
       <div style={styles.menuItem}>出勤簿履歴表示</div>
     </Link>
     <Link href="../requestList">
       <div style={styles.menuItem}>申請履歴表示</div>
     </Link>
   </div>
 )}
</div>*/

const menuBar = () => {
  return <div></div>;
};

const Homeback = () => {
  return <Link href="/">ホームに戻る</Link>;
};

const requestPage = () => {
  const aiu = 3;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <WindowButton />
        </div>
        <br></br>
        <div>
          <RequestTable />
        </div>
        <button className={styles.requestButton}>申請する</button>
        <br></br>
        <div className={styles.header2}>
          <Homeback />
        </div>
      </div>
    </>
  );
};

//テーブルコンポーネント
const RequestTable = () => {
  //データ配列
  const date = [
    {
      workPlace: "SCSK",
      departmentName: "情報システム部",
      employeeName: "田中一郎",
    },
    { workPlace: "本社", departmentName: "総務部", employeeName: "山田花子" },
    {
      workPlace: "SBM",
      departmentName: "情報システム部",
      employeeName: "鈴木慶",
    },
  ];

  //dateTimeを使う必要あるのかわからないけどつかってみている↓
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="row" colSpan={3} className={styles.thLayout}>
            就業場所
          </th>

          <td colSpan={3} className={styles.tdMainLayout}>
            {date[0].workPlace}
          </td>

          <th scope="row" colSpan={1} className={styles.thLayout}>
            部署名
          </th>
          <td colSpan={2} className={styles.tdMainLayout}>
            {date[0].departmentName}
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
            氏名
          </th>
          <td colSpan={2} className={styles.tdMainLayout}>
            {date[0].employeeName}
          </td>
        </tr>
      </thead>
      <thead>
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
      <tbody>
        <tr>
          <td className={styles.tdLayout}>
            {/*text等を対象とするmin・maxlengthをdateなどを対象とするmin・maxに変更したほうがいいのか悩み中*/}
            <input
              type="text"
              name="day"
              minLength={1}
              maxLength={2}
              placeholder="1"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="dayOfWeek"
              minLength={1}
              maxLength={1}
              placeholder="火"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="startTime"
              minLength={5}
              maxLength={5}
              placeholder="09:00"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="finishTime"
              minLength={5}
              maxLength={5}
              placeholder="18:00"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="breakTime"
              minLength={5}
              maxLength={5}
              placeholder="01:00"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="realTime"
              placeholder="08:00"
              className={styles.input}
              required
            />
          </td>
          <td className={styles.tdLayout}>
            <input
              type="text"
              name="overTime"
              minLength={1}
              maxLength={2}
              placeholder="00:00"
              className={styles.input}
              required
            />
          </td>
          <td colSpan={2} className={styles.tdLayout}>
            <input
              type="text"
              name="notes"
              maxLength={10}
              placeholder="遅刻"
              className={styles.input}
              required
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default requestPage;
