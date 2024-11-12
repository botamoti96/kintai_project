import Link from 'next/link'

const Home = () => {
  return (
    <div>
      まっさらなページです<br/>
      まっさらなページです<br/>
      まっさらなページです<br/>
      <Link href="/test">
        Go to Test Page
      </Link>
      <br></br>
      <Link href="/test2">
        テストページ2へ
      </Link>
    </div>
  );
}

export default Home;
