import styled from "styled-components";
import { useContext, useEffect } from "react";
import AllCategoryforHome from "../components/forHome/AllCategoriesForHome";
import AboutUsforHome from "../components/forHome/AboutUsforHome";
import WhyChooseUs from "../components/forHome/WhyChoosUs";
import LetTalk from "../components/forHome/LetTalk";
import OurService from "../components/forHome/OurService";
import Wedding from "../components/forHome/Wedding";
import OurClientSey from "../components/forHome/OurClientSay";
import floverVideoBg from "/image/loginBg.jpg";
import { Context } from "../App";

export default function AllCategory() {
  const { setUsers, isMyProfile, users } = useContext(Context);
  useEffect(() => {
    const tokenCheckerr = async () => {
      let token: string | { access: string; refresh: string } | null =
        localStorage.getItem("token");
      if (users.id === 0 && token) {
        token = JSON.parse(token as string);
        const res = await fetch(
          "https://algouni-students.duckdns.org/auth/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer  ${
                (token as { access: string; refresh: string }).access
              }`,
            },
          }
        );
        if (res.ok) {
          const usersInfo = await res.json();
          setUsers(usersInfo);
        } else if (res.status === 401) {
          localStorage.clear();
        }
      }
    };
    tokenCheckerr();
  }, []);

  return (
    <>
      <HomeDiv style={isMyProfile ? { opacity: "0.3" } : { opacity: "1" }}>
        <iframe src="https://player.vimeo.com/video/917253515"></iframe>
        <AllCategoryforHome />
        <AboutUsforHome />
        <WhyChooseUs />
        <LetTalk />
        <OurService />
        <Wedding />
        <OurClientSey />
      </HomeDiv>
    </>
  );
}

const HomeDiv = styled.div`
  border-left: 1px solid #121212;
  border-right: 2px solid #121212;
  Iframe {
    background-image: url(${floverVideoBg});
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 50vh;
    @media (min-vidth: 758px) {
      height: 70vh;
    }
  }
`;
