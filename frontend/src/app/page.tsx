import Link from 'next/link'

const Home = () => {
  const v = 1;
  return (
    <div>
      まっくろなページです<br/>
      まっくろなページです<br/>
      まっくろなページで...す<br/>
      {v}
      <Link href="/test">
        Go to Test Page
      </Link>
      <br></br>
      <Link href="/test2">
        テストページ2へ
      </Link>
      <Link href="/showAttendanceRecord">
        出勤簿ページへ
      </Link>
    </div>
  );
}

export default Home;
