import React from "react";
import Link from 'next/link'

import { NextPage } from "next";


const Header = () => {
  return <h1>申請画面表示予定地です</h1>;
};

const requestPage = () => {
    const aiu = 1;
       
    return (
      <div>
       <Header />
       <RequestTable />
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

  return(
    <table style={{ /*backgroundColor: "white",*/ width: "50%", border: "1px solid black", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th> 就業場所 </th>
          <th> 部署名 </th>
          <th> 氏名 </th>
        </tr>
      </thead>
      <tbody>
        {date.map((item, index) =>(
           <tr>
           <td>{item.workPlace}</td>
           <td>{item.departmentName}</td>
           <td>{item.employeeName}</td>
         </tr>
        ))}
      </tbody>
    </table>
  );
}



export default requestPage;