import Link from 'next/link'

const Home = () => {
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
       申請ページです
      </Link>
    </div>
  );
}

export default Home;
