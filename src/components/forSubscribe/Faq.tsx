import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import arrowRightDown from "/image/arrowrightdown.svg";
import { Context } from "../../App";
export default function Faq() {
  const [isAnswer, setIsAnswer] = useState<boolean | null | number>(null);
  const { faqs, setFaqs } = useContext(Context);

  useEffect(() => {
    async function fetchFaq() {
      const response = await fetch(
        "https://algouni-students.duckdns.org/api/faq"
      );
      const data = await response.json();
      setFaqs(data);
    }
    fetchFaq();
  }, []);

  return (
    <>
      <MainCont>
        <h2 className="title">Subscription FAQ</h2>
        <FaqCont>
          {faqs.map((item, index: number) => (
            <Qa key={index}>
              <div className="question">
                <p
                  onClick={() => {
                    setIsAnswer(isAnswer !== index ? faqs.indexOf(item) : null);
                  }}
                >
                  {item.question}
                </p>
                <img
                  src={arrowRightDown}
                  style={{
                    transform:
                      isAnswer === index ? "rotate(270deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              <div
                style={
                  isAnswer !== index
                    ? { display: "none" }
                    : { display: "block" }
                }
                className="answer"
              >
                {item.answer}
              </div>
            </Qa>
          ))}
        </FaqCont>
      </MainCont>
    </>
  );
}

const MainCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #121212;
  width: 100%;
  gap: 24px;
  padding: 40px 24px;
  background-color: #fff;
  @media (min-width: 768px) {
    margin: 40px auto;
    width: 70%;
  }
  @media (min-width: 1440px) {
    width: 50%;
  }

  .title {
    font-size: 34px;
    font-weight: 600;
  }
`;
const FaqCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;
const Qa = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #121212;
  width: 300px;
  padding: 20px 0px;
  @media (min-width: 768px) {
    width: 400px;
  }
  @media (min-width: 1440px) {
    width: 600px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }

  .question {
    cursor: pointer;
  }

  .answer {
    font-size: 12px;
    opacity: 0.7;
    padding-top: 20px;
    display: none;
    @media (min-width: 1440px) {
      font-size: 16px;
    }
  }

  .question,
  .answer {
    text-align: left;
  }
`;
