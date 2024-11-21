import React from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート

// ログイン画面のコンポーネント
const Login: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* ウィンドウの右上に配置するボタン */}
      <div style={styles.header}>
        <div style={styles.windowButtons}>
          {/* ウィンドウボタン：黄色、緑、赤 */}
          <div style={{ ...styles.windowButton, backgroundColor: "yellow" }}></div>
          <div style={{ ...styles.windowButton, backgroundColor: "green" }}></div>
          <div style={{ ...styles.windowButton, backgroundColor: "red" }}></div>
        </div>
      </div>
      
      {/* ログインフォームのコンテナ */}
      <div style={styles.formContainer}>
        <h1 style={styles.title}>勤怠管理システム</h1> {/* タイトル */}
        <form>
          {/* 社員番号の入力フィールド */}
          <div style={styles.inputGroup}>
            <label htmlFor="employee-id" style={styles.label}>社員番号</label>
            <input
              type="text"
              id="employee-id"
              name="employee-id"
              style={styles.input}
              placeholder="社員番号を入力してください" // プレースホルダー
            />
          </div>

          {/* パスワードの入力フィールド */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
              placeholder="パスワードを入力してください" // プレースホルダー
            />
          </div>

          {/* ログインボタンをリンクでラップ */}
          <Link href="/time_card"> {/* ログイン成功後に遷移するページへリンク */}
            <button type="button" style={styles.button}>
              ログイン
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

// スタイルオブジェクト：画面のレイアウトやデザインに関するスタイル
const styles = {
  container: {
    fontFamily: "Arial, sans-serif", // フォント設定
    backgroundColor: "#f9f9f9", // 背景色
    height: "100vh", // 高さを画面全体に設定
    display: "flex", // フレックスボックスでレイアウト
    flexDirection: "column" as const, // 縦方向のレイアウト
    alignItems: "center", // 横方向中央揃え
    justifyContent: "center", // 縦方向中央揃え
  },
  header: {
    position: "absolute" as const, // 絶対位置で配置
    top: 10, // 上から10px
    right: 10, // 右から10px
  },
  windowButtons: {
    display: "flex", // 横並び
    gap: 8, // ボタン間の間隔
  },
  windowButton: {
    width: 15, // ボタンの横幅
    height: 15, // ボタンの高さ
    borderRadius: "50%", // 丸いボタン
    backgroundColor: "#ccc", // ボタンの色
  },
  formContainer: {
    width: "300px", // フォームの幅
    padding: "20px", // 内側の余白
    backgroundColor: "#fff", // 背景色
    borderRadius: "8px", // 角を丸く
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // シャドウ効果
    textAlign: "center" as const, // 中央揃え
  },
  title: {
    marginBottom: "20px", // タイトル下の余白
    fontSize: "24px", // フォントサイズ
    fontWeight: "bold", // 太字
  },
  inputGroup: {
    marginBottom: "15px", // 入力フィールド間の余白
  },
  label: {
    display: "block", // ブロック要素で表示
    marginBottom: "5px", // ラベル下の余白
    fontWeight: "bold", // 太字
  },
  input: {
    width: "100%", // 入力フィールドを親要素に合わせる
    padding: "10px", // 内側の余白
    border: "1px solid #ccc", // 枠線の色
    borderRadius: "4px", // 角を丸く
    fontSize: "14px", // フォントサイズ
  },
  button: {
    width: "100%", // ボタンの幅を親要素に合わせる
    padding: "10px", // 内側の余白
    backgroundColor: "#007BFF", // ボタンの背景色
    color: "#fff", // 文字色
    border: "none", // 枠線なし
    borderRadius: "4px", // 角を丸く
    fontSize: "16px", // フォントサイズ
    cursor: "pointer", // カーソルをポインターに変更
  },
};

export default Login;