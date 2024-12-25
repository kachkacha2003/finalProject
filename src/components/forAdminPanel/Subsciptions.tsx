import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
  const { subscriptions, setSubscriptions } = useContext(Context);
  const navigate = useNavigate();
  const [addSubscription, setAddSubscription] = useState({
    id: 0,
    image: "",
    category: "",
    price: 0,
    delivery: "",
    theBest: "",
    firstDelivery: "",
    firstDelivery2: "",
    saveUp: 0,
  });

  useEffect(() => {
    async function fetchSubscriptions() {
      const response = await fetch(
        "https://algouni-students.duckdns.org/api/subscription"
      );
      const data = await response.json();
      setSubscriptions(data);
    }
    fetchSubscriptions();
  }, []);

  const addSubscr = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAddSubscription({
      ...addSubscription,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setAddSubscription({
      ...addSubscription,
      image: file,
    });
  };

  async function addNewSubscription(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", addSubscription.image);
    formData.append("category", addSubscription.category);
    formData.append("price", addSubscription.price.toString());
    formData.append("delivery", addSubscription.delivery);
    formData.append("theBest", addSubscription.theBest);
    formData.append("firstDelivery", addSubscription.firstDelivery);
    formData.append("firstDelivery2", addSubscription.firstDelivery2);
    formData.append("saveUp", addSubscription.saveUp.toString());

    const response = await fetch(
      "https://algouni-students.duckdns.org/api/subscription",
      {
        method: "POST",
        headers: {},
        body: formData,
      }
    );
    const newSubscriptions = await response.json();
    setSubscriptions([...subscriptions, newSubscriptions]);
    setAddSubscription({
      id: 0,
      image: "",
      category: "",
      price: 0,
      delivery: "",
      theBest: "",
      firstDelivery: "",
      firstDelivery2: "",
      saveUp: 0,
    });
  }

  async function deleteSubscr(subscrId: any) {
    const responce = await fetch(
      `https://algouni-students.duckdns.org/api/subscription/${subscrId}`,
      {
        method: "DELETE",
      }
    );
    if (responce.ok) {
      setSubscriptions(subscriptions.filter((item) => item.id !== subscrId));
      throw alert("successfyly removed");
    } else if (responce.status === 401) {
      navigate("/login");
    } else {
      throw alert("something went wrong");
    }
  }
  return (
    <>
      <MainCategories>
        <h2>List of Subscriptions</h2>
        <div className="titleContainer">
          <div className="descr">
            <p style={{ width: "45px" }} className="userName">
              Picture
            </p>
            <p style={{ width: "60px" }} className="userName">
              Category
            </p>
            <p style={{ width: "30px" }} className="userName">
              Price
            </p>
            <p style={{ width: "70px" }} className="userName">
              The Best
            </p>
            <p style={{ width: "60px" }} className="userName">
              First delivery
            </p>
            <p style={{ width: "70px" }} className="userName">
              First delivery
            </p>
            <p style={{ width: "80px" }} className="userName">
              save Up
            </p>
          </div>
        </div>
        <div className="listSubscriptions">
          {subscriptions?.map((item, index) => (
            <div className="container" key={index}>
              <div className="descr">
                <img className="userImg" src={item.image} />
                <p style={{ width: "60px" }} className="userName">
                  {item.category}
                </p>
                <p style={{ width: "30px" }} className="userName">
                  {item.price}
                </p>
                <p style={{ width: "70px" }} className="userName">
                  {item.theBest}
                </p>
                <p style={{ width: "60px" }} className="userName">
                  {item.firstDelivery}
                </p>
                <p style={{ width: "70px" }} className="userName">
                  {item.firstDelivery2}
                </p>
                <p style={{ width: "70px" }} className="userName">
                  {item.saveUp}
                </p>
              </div>
              <button onClick={() => deleteSubscr(item.id)}>Delete</button>
            </div>
          ))}
        </div>
        <form className="addContainer">
          <h2>Add Subscriptions</h2>
          <div className="field">
            <input
              placeholder="Add subscriptions's category"
              className="inputSubscriptions"
              type="text"
              name="category"
              value={addSubscription.category}
              onChange={addSubscr}
            />
            <input
              placeholder="Add subscriptions's price"
              className="inputSubscriptions"
              type="number"
              name="price"
              value={addSubscription.price}
              onChange={addSubscr}
            />
            <input
              placeholder="Add subscriptions's theBest"
              className="inputSubscriptions"
              type="text"
              name="theBest"
              value={addSubscription.theBest}
              onChange={addSubscr}
            />
            <input
              placeholder="Add subscriptions's firstDelivery"
              className="inputSubscriptions"
              type="text"
              name="firstDelivery"
              value={addSubscription.firstDelivery}
              onChange={addSubscr}
            />
            <input
              placeholder="Add subscriptions's firstDelivery2"
              className="inputSubscriptions"
              type="text"
              name="firstDelivery2"
              value={addSubscription.firstDelivery2}
              onChange={addSubscr}
            />
            <input
              placeholder="Add subscriptions's saveUp"
              className="inputSubscriptions"
              type="number"
              name="saveUp"
              value={addSubscription.saveUp}
              onChange={addSubscr}
            />
            <input
              className="chooseFile"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" onClick={addNewSubscription} className="addBt">
            Add
          </button>
        </form>
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

  .listSubscriptions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 30vh;
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
    margin-right: 10px;
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
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .userName {
    color: #121212;
    font-size: 12px;
    text-align: left;
  }
  .userImg {
    width: 50px;
    height: 50px;
  }

  .addContainer {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  button {
    width: 100px;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid #121212;
    cursor: pointer;
  }

  .chooseFile {
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
  }

  .inputUser {
    padding: 5px 15px;
  }
`;
