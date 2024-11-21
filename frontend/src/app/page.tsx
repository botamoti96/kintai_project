import Link from 'next/link'

const Home = () => {
  return (
    <div>
      まっくろなページです<br/>
      まっくろなページです<br/>
      まっくろなページです<br/>
      <Link href="/test">
        Go to Test Page
      </Link>
      <br></br>
      <Link href="/test2">
        テストページ2へ
      </Link>
      <br></br>
      <Link href="/request">
       申請ページです
      </Link>
    </div>
  );
}

export default Home;
