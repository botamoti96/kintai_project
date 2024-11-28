"use client"; // クライアントサイドで動作するコンポーネントとして指定

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントを使用

// 時間を表示するカスタムフック
const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(""); // 現在時刻の状態

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-GB", { hour12: false })); // 時刻をHH:MM:SSの形式で取得
    }, 1000); // 1秒ごとに現在時刻を更新

    return () => clearInterval(interval); // クリーンアップ関数でインターバルをクリア
  }, []); // 初回マウント時のみ実行

  return currentTime; // 現在の時刻を返す
};

const TimeCard: React.FC = () => {
  const currentTime = useCurrentTime(); // 現在時刻を取得
  const today = new Date(); // 今日の日付を取得

  // 日付と曜日のフォーマットを行う
  const date = today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const weekday = today.toLocaleString("ja-JP", { weekday: "short" }); // 曜日（例: 月、火、水、木）

  // フォーマット例: 2024/11/21（木）
  const formattedDate = `${date}（${weekday}）`;

  // 出勤・退勤時刻、状態管理用のステート
  const [startTime, setStartTime] = useState<string | null>(null); // 出勤時刻
  const [finishTime, setFinishTime] = useState<string | null>(null); // 退勤時刻
  const [isStarted, setIsStarted] = useState<boolean>(false); // 出勤状態
  const [isFinished, setIsFinished] = useState<boolean>(false); // 退勤状態

  // プルダウンメニューの表示状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // メニューが開いているかどうか
  const menuRef = useRef<HTMLDivElement | null>(null); // メニューの参照を保持

  // 出勤ボタンが押された時の処理
  const handleStartClick = () => {
    setStartTime(currentTime); // 出勤時刻を保存
    setIsStarted(true); // 出勤状態を「true」に設定
    setIsFinished(false); // 退勤状態を「false」に設定（再度退勤ボタンを押せるようにする）
  };

  // 退勤ボタンが押された時の処理
  const handleFinishClick = () => {
    if (!isFinished) {
      // 退勤ボタンがまだ押されていない場合
      setFinishTime(currentTime); // 退勤時刻を保存
      setIsFinished(true); // 退勤状態を「true」に設定

      // 退勤後、10秒後に状態を初期化
      setTimeout(() => {
        // 10秒後に出勤・退勤の時刻と状態をリセット
        setStartTime(null);
        setFinishTime(null);
        setIsStarted(false);
        setIsFinished(false);
      }, 10000); // 10秒後にリセット
    }
  };

  // クリック外部検知のための処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // 外部クリックでメニューを閉じる
      }
    };

    // クリックイベントリスナーを追加
    document.addEventListener("mousedown", handleClickOutside);

    // クリーンアップ
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* 左上のメニューバー */}
      <div style={styles.menuBar}>
        <div
          style={styles.menuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)} // メニューアイコンをクリックした時に開閉
        >
          &#9776;
        </div>

        {/* プルダウンメニュー */}
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
            <Link href="/logout">
              <div style={styles.menuItem}>ログアウト</div>
            </Link>
          </div>
        )}
      </div>

      {/* 中央に日付と時刻を表示 */}
      <div style={styles.dateTimeContainer}>
        <h1 style={styles.date}>{formattedDate}</h1> {/* 日付 */}
        <h3 style={styles.time}>{currentTime}</h3> {/* 時刻 */}
      </div>

      {/* 出勤・退勤ボタン */}
      <div style={styles.buttonsContainer}>
        <button
          style={{
            ...styles.roundButton,
            backgroundColor: isStarted ? "black" : "orange", // 出勤後にボタン色を黒に変更
          }}
          onClick={handleStartClick}
          disabled={isStarted} // 出勤後はボタンを無効化
        >
          出勤
        </button>

        <button
          style={{
            ...styles.roundButton,
            backgroundColor: isFinished ? "black" : "mediumseagreen", // 退勤後にボタン色を黒に変更
          }}
          onClick={handleFinishClick}
          disabled={!isStarted || isFinished} // 出勤していない、または退勤済みなら無効化
        >
          退勤
        </button>
      </div>

      {/* 出勤時刻と退勤時刻の表示 */}
      <div style={styles.statusContainer}>
        {startTime && (
          <>
            <h2>出勤</h2>
            <h3>{startTime}</h3> {/* 出勤時刻 */}
          </>
        )}
        {finishTime && (
          <>
            <h2>退勤</h2>
            <h3>{finishTime}</h3> {/* 退勤時刻 */}
          </>
        )}
      </div>
    </div>
  );
};

// スタイルオブジェクト
const styles = {
  container: {
    fontFamily: "Arial, sans-serif", // フォント指定
    backgroundColor: "#f9f9f9", // 背景色
    height: "100vh", // 画面いっぱいの高さ
    display: "flex", // フレックスボックスでレイアウト
    flexDirection: "column" as const, // 縦方向にレイアウト
    alignItems: "center", // 中央揃え
    justifyContent: "center", // 中央揃え
    position: "relative" as const, // 相対位置指定
  },
  menuBar: {
    position: "absolute" as const, // 絶対位置指定
    top: 10, // 上から10px
    left: 10, // 左から10px
  },
  menuIcon: {
    fontSize: "30px", // メニューアイコンのサイズ
    cursor: "pointer", // ポインターカーソルにする
  },
  dropdownMenu: {
    position: "absolute" as const, // 絶対位置指定
    top: "40px", // アイコンの下に表示
    left: "0",
    backgroundColor: "#fff", // 背景色
    borderRadius: "8px", // 丸みを帯びた角
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // シャドウ効果
    width: "200px", // メニューの幅
    zIndex: 1, // メニューが前面に表示されるようにする
  },
  menuItem: {
    padding: "10px", // メニューアイテムの内側余白
    borderBottom: "1px solid #ddd", // メニューアイテムの下に境界線
    cursor: "pointer", // ポインターカーソル
    transition: "background-color 0.3s", // ホバー時のアニメーション
  },
  dateTimeContainer: {
    textAlign: "center" as const, // 中央揃え
    marginBottom: "30px", // 下部余白
  },
  date: {
    fontSize: "28px", // 日付のサイズ
    fontWeight: "bold", // 太字
    margin: 0, // 余白なし
  },
  time: {
    fontSize: "22px", // 時刻のサイズ
    fontWeight: "bold", // 太字
    margin: 0, // 余白なし
  },
  buttonsContainer: {
    display: "flex", // 横並び
    gap: "20px", // ボタン間の間隔
  },
  roundButton: {
    width: "100px", // ボタンの横幅
    height: "100px", // ボタンの高さ
    borderRadius: "50%", // 丸いボタン
    fontSize: "18px", // フォントサイズ
    color: "#fff", // ボタン内文字色
    border: "none", // ボーダーなし
    cursor: "pointer", // ポインターカーソル
    display: "flex", // フレックスボックスで配置
    justifyContent: "center", // 中央揃え
    alignItems: "center", // 中央揃え
  },
  statusContainer: {
    marginTop: "20px", // 上部余白
    textAlign: "center" as const, // 中央揃え
  },
};

export default TimeCard;
