import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TReviews } from "../../types/AddCategories";

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<TReviews[]>([
    {
      id: 0,
      user: "",
      review: "",
    },
  ]);
  useEffect(() => {
    async function fetchReview(reviewsId: number) {
      let token: string | { access: string; refresh: string } | null =
        localStorage.getItem("token");
      if (token) {
        token = JSON.parse(token as string);
        const response = await fetch(
          `https://algouni-students.duckdns.org/api/reviews/${reviewsId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer  ${
                (token as { access: string; refresh: string }).access
              }`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          console.log(data);
        }
      }
    }
    fetchReview(reviews[0].id);
    console.log(reviews);
  }, []);
  async function deleteReview(reviewId: number) {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token as string);
      const responce = await fetch(
        `https://algouni-students.duckdns.org/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer  ${
              (token as { access: string; refresh: string }).access
            }`,
          },
        }
      );
      if (responce.ok) {
        setReviews(reviews.filter((item) => item.id !== reviewId));
        throw alert("successfyly removed");
      } else if (responce.status === 401) {
        navigate("/login");
      } else {
        throw alert("something went wrong");
      }
    }
  }

  return (
    <>
      <MainCategories>
        <h2>List of Reviews</h2>
        <div className="titleContainer">
          <div className="descr">
            <p className="userName">User Name</p>
            <p className="userName">Review</p>
          </div>
        </div>
        <div className="listReviews">
          {reviews?.map((item, index) => (
            <div className="container" key={index}>
              <div className="descr">
                <p style={{ width: "30px" }} className="userName">
                  {item.user}
                </p>
                <p style={{ width: "120px" }} className="userName">
                  {item.review}
                </p>
              </div>
              <div className="editDelete">
                <button
                  onClick={() => {
                    deleteReview(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </MainCategories>
    </>
  );
}

const MainCategories = styled.div`
  background-color: #eaf07740;
  padding: 20px 0 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;

  .listReviews {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 30vh;
    overflow-y: scroll;
  }

  .container,
  .editDelete {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-radius: 8px;
    margin-right: 10px;
  }
  .titleContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
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
    justify-content: center;
    align-items: center;
    gap: 200px;
  }

  .userName {
    color: #121212;
    font-size: 12px;
    text-align: left;
  }
`;
