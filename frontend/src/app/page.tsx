import Link from 'next/link'

const Home = () => {
  const v = 1;
  return (
    <div>
      test<br/>
      <Link href="/test">
        リンクのテスト
      </Link>
      <br></br>
      <Link href="/login">
      ログインページのリンク
      </Link>
      <br></br>
      <Link href="/request">
       申請ページです
      </Link>
      <Link href="/showAttendanceRecord">
        出勤簿ページへ
      </Link>
    </div>
  );
}

export default Home;