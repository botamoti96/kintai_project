import Link from 'next/link'

const Home = () => {
  const v = 1;
  return (
    <div>
      example<br/>
      example<br/>
      example<br/>
      <Link href="/test">
        example
      </Link>
      <br></br>
      <Link href="/test2">
      example
      </Link>
      <br></br>
      <Link href="/request">
       申請新規作成ページです
      </Link>
      <br></br>
      <Link href="/requestList">
       申請一覧ページです
      </Link>
      <Link href="/showAttendanceRecord">
        出勤簿ページへ
      </Link>
    </div>
  );
}

export default Home;
