import React from "react";
import Link from 'next/link';
import styles from "./page.module.css";
import { Dropdown } from "./Dropdown" ;



import { NextPage } from "next";


//デザイン
// const style = {color: "black",backgroundColor: "white"

// }

const Header = () => {
  return <h1>申請画面表示予定地です</h1>;
};




const Homeback = () => {
  return <Link href="/">ホームに戻る</Link>;
}
const requestPage = () => {
    const aiu = 1;
       
    return (
      <div className={styles.all}>
       <Header />
       <RequestTable />
       <Homeback />
      </div>
    );
  }


//テーブルコンポーネント
const RequestTable = () => {

  //データ配列
const date = [
  {workPlace: "SCSK", departmentName: "情報システム部", employeeName: "田中一郎"},
  {workPlace: "本社", departmentName: "総務部", employeeName: "山田花子"},
  {workPlace: "SBM", departmentName: "情報システム部", employeeName: "鈴木慶"},
]

//ドロップダウンボタンを作ってみる



//dateTimeを使う意味あるのか不明だけどつかってみている↓
  return(
    <table className={styles.table}>
      <thead className={styles.abc}>
        <tr>
          <th scope="row" colSpan={3}> 就業場所 </th>
          <td colSpan={3}>{date[0].workPlace}</td>
          <th scope="row" colSpan={1}> 部署名 </th>
          <td colSpan={1}>{date[0].departmentName}</td>
        </tr>
        
        <tr>
          <th scope="row" colSpan={3}>就業時間</th>
          <td colSpan={3}><time dateTime="2024-11-11">9:00-18:00</time></td>
          <th scope="row" colSpan={1}> 氏名 </th>
          <td colSpan={1}>{date[0].employeeName}</td>
        </tr>
      </thead>   
      <thead className={styles.tdlayout} >   
        <tr>
          <th scope="col">日</th>
          <th scope="col">曜日</th>
          <th scope="col">始業時間</th>
          <th scope="col">就業時間</th>
          <th scope="col">休憩時間</th>
          <th scope="col">実質時間数</th>
          <th scope="col">時間外勤務
            時間数</th>
          <th scope="col"><Dropdown /></th>
        </tr>
      </thead>
      <tbody className={styles.tdlayout}>
        <tr>
          <td>5</td>
          <td>火</td>
          <td>10:00</td>
          <td>18:00</td>
          <td>01:00</td>
          <td>07:00</td>
          <td> </td>
          <td>遅刻</td>
        </tr>
      </tbody>
      {/* <tbody>
        {date.map((item, index) =>(
           <tr>
           <td>{item.workPlace}</td>
           <td>{item.departmentName}</td>
           <td>{item.employeeName}</td>
         </tr>
        ))}
      </tbody> */}
    </table>
  );
}



export default requestPage;