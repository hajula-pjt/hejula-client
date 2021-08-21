import Head from "next/head";

import styled from "@emotion/styled";

const Home = () => {
  return (
    <>
      <Head>
        <title>HAJULA</title>
        <meta name="description" content="Heajura project" />
      </Head>

      <main>
        <VisualBanner>
          <p className="title">이제, 여행은 가까운 곳에서</p>
          <p className="description">
            <span>새로운 공간에 머물러 보세요</span>
            <span>여행 등 다양한 목적에 맞는 숙소를 찾아보세요</span>
          </p>
        </VisualBanner>
        <AdminButton onClick={() => alert("준비중입니다.")}>
          <button type="button">관리자 페이지로 이동</button>
        </AdminButton>
      </main>
    </>
  );
};

const VisualBanner = styled.section({
  padding: "300px 40px 45px",
  background:
    "linear-gradient(45deg, black, transparent), url('./visual.jpg') center 45%",
  p: {
    maxWidth: "350px",
    wordBreak: "keep-all",
    lineHeight: "1.2",
    color: "#fff",
  },
  ".title": {
    fontSize: "3rem",
  },
  ".description": {
    fontSize: "1.5rem",
    lineHeight: "1.5",
    span: {
      display: "block",
    },
  },
  "p + p": {
    marginTop: "1em",
  },
});

const AdminButton = styled.section({
  margin: "2rem",
  button: {
    width: "100%",
    padding: "2em 0",
    fontSize: "2rem",
    border: "1px solid #dcdcdc",
  },
});

export default Home;
