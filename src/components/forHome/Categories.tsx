import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Context } from "../../App";
import { useEffect } from "react";

export default function Categories() {
  const { categories, setCategories } = useContext(Context);
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "https://algouni-students.duckdns.org/api/category"
      );
      const data = await response.json();
      setCategories(data);
    }
    fetchCategories();
    console.log("fetchincategory");
  }, []);
  const navigate = useNavigate();

  AOS.init({
    duration: 1000,
  });

  return (
    <>
      <MainCont>
        {categories.map((item, index) =>
          index % 2 == 0 ? (
            <Category key={index}>
              <TitleCategory style={{ borderRight: "solid 1px #121212" }}>
                <span>{item.name}</span>
                <div>
                  <Link className="shopNow" to={`/${item.name}`}>
                    Shop now
                  </Link>
                  <svg
                    className="arrowLeft"
                    width="24"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.64 6 14.18 7.504 17.5 11h-14v2h14l-3.298 3.503L15.667 18l5.833-6.014L15.64 6z"
                      fill="#000"
                    />
                  </svg>
                </div>
              </TitleCategory>
              <ImageCategory onClick={() => navigate(`/${item.name}`)}>
                <img src={item.image} alt="" />
              </ImageCategory>
            </Category>
          ) : (
            <Category key={index}>
              <ImageCategory
                onClick={() => navigate(`/${item.name}`)}
                style={{ borderRight: "solid 1px #121212" }}
              >
                <img src={item.image} alt="" />
              </ImageCategory>
              <TitleCategory>
                <span>{item.name}</span>
                <div>
                  <svg
                    className="arrowRight"
                    style={{ marginLeft: "10px" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 11v2H7l3.641 3.5L9.113 18 3 12l6.113-6 1.528 1.5L7 11h14z"
                      fill="#000"
                    />
                  </svg>
                  <Link className="shopNow" to={`/${item.name}`}>
                    Shop now
                  </Link>
                </div>
              </TitleCategory>
            </Category>
          )
        )}
      </MainCont>
    </>
  );
}

const arrowMove = keyframes`
  20% {
    transform: translateX(50%);
  }
  50% {
    transform: translateX(10%);
  }
`;

const MainCont = styled.div`
  display: grid;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1440px) {
    height: 764px;
  }
  & > div {
    height: 100%;
  }
`;
const Category = styled.div`
  display: flex;
  height: 200px;
`;
const TitleCategory = styled.div`
  border-top: solid 1px #121212;
  width: 50%;
  font-size: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 25% 0 10px 0;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    /* & > span{
        font-size: 10px;
        text-align: center;
        color: red;
        } */
    .arrowRight {
      margin-right: 10px;
    }
    &:hover {
      text-decoration: underline;
      animation: ${arrowMove} 10s infinite;
    }

    & > .shopNow {
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #121212;
      text-align: center;
      letter-spacing: 1.04px;
      font-weight: 600;
      @media (min-width: 1440px) {
        font-size: 24px;
      }
    }
  }
`;
const ImageCategory = styled.div`
  border-top: solid 1px #121212;
  width: 50%;
  font-size: 30px;
  cursor: pointer;
  overflow: hidden; //for img animation
  & > img {
    width: 100%;
    height: 100%;
    transition: 0.3s; //for img animation
  }
  :hover {
    transform: scale(1.1); //for img animation
  }
`;
