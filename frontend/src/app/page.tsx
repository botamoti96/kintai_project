import Link from 'next/link'

const Home = () => {
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
    </div>
  );
}

export default Home;