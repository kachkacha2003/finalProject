import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const { faqs, setFaqs } = useContext(Context);
  const navigate = useNavigate();
  const [addFaq, setAddFaq] = useState({
    question: "",
    answer: "",
  });

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

  const addFAQ = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAddFaq({
      ...addFaq,
      [name]: value,
    });
  };

  async function addNewFaq(event: any) {
    event.preventDefault();
    const responce = await fetch(
      "https://algouni-students.duckdns.org/api/faq",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addFaq),
      }
    );
    const newFaq = await responce.json();
    setFaqs([...faqs, newFaq]);
    setAddFaq({ question: "", answer: "" });
  }

  async function deleteFaq(faqId: any) {
    const responce = await fetch(
      `https://algouni-students.duckdns.org/api/faq/${faqId}`,
      {
        method: "DELETE",
      }
    );
    if (responce.ok) {
      setFaqs(faqs.filter((item) => item.id !== faqId));
      throw alert("successfyly removed");
    } else if (responce.status === 401) {
      navigate("/login");
    } else {
      throw alert("something went wrong");
    }
  }

  return (
    <>
      <MainFaq>
        <h2>List of FAQ</h2>
        <div className="titleContainer">
          <div className="descr">
            <p style={{ width: "120px" }} className="titleName">
              Question
            </p>
            <p style={{ width: "520px" }} className="titleName">
              Answer
            </p>
          </div>
        </div>
        <div className="listFaq">
          {faqs?.map((item, index) => (
            <div className="container" key={index}>
              <div className="descr">
                <p style={{ width: "120px" }} className="faqName">
                  {item.question}
                </p>
                <p style={{ width: "520px" }} className="faqName">
                  {item.answer}
                </p>
              </div>
              <div className="editDelete">
                <button onClick={() => deleteFaq(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <form className="addContainer">
          <h2>Add FAQ</h2>
          <div className="field">
            <input
              placeholder="Add Question"
              className="inputFaq"
              type="text"
              name="question"
              value={addFaq.question}
              onChange={addFAQ}
            />
            <input
              placeholder="Add Answer"
              className="inputFaq"
              type="text"
              name="answer"
              value={addFaq.answer}
              onChange={addFAQ}
            />
          </div>
          <button type="submit" onClick={addNewFaq} className="addBt">
            Add
          </button>
        </form>
      </MainFaq>
    </>
  );
}

const MainFaq = styled.div`
  background-color: #eaf07740;
  padding: 20px 0 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;

  .listFaq {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .container,
  .editDelete {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-radius: 8px;
    margin-right: 20px;
  }

  .titleContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #121212;
    font-size: 20px;
    font-weight: 600;
    p {
      font-size: 20px;
    }
  }

  .container {
    border-bottom: 1px solid #121212;
  }
  .descr {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .faqName {
    color: #121212;
    font-size: 16px;
  }
  .faqImg {
    width: 50px;
    height: 50px;
  }

  .addContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100px;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #121212;
    cursor: pointer;
  }

  .chooseFile {
    padding: 4px 15px;
    border-radius: 8px;
    cursor: pointer;
  }

  .inputFaq {
    padding: 5px 15px;
    width: 300px;
  }
`;
