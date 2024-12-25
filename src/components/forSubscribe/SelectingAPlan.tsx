import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import forYouImg from "/image/flowers/foryou.webp";

import { Context } from "../../App";

export default function SelectingAPlan() {
  const [selectCategory, setSelectCategory] = useState(false);
  const [selectFrequency, setSelectFrequency] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState(false);

  const { subscriptions, setSubscriptions } = useContext(Context);

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

  const deliveryFrequency = [
    {
      frequency: "MONTHLY",
    },
    {
      frequency: "BI-WEEKLY",
    },
    {
      frequency: "WEEKLY",
    },
  ];
  return (
    <>
      <Main>
        <ForYouImg>
          <img src={forYouImg} alt="" />
        </ForYouImg>
        <ForYouCont>
          <Plan>
            <p className="build">BUILD YOUR SUBSCRIPTION</p>
            <p className="title">Selecting a Plan</p>
            <p className="description">
              Enjoy free shipping on every order and save up to 30%. Every
              bouquet we deliver is carefully curated to ensure it arrives fresh
              and stunning. To modify, pause, or cancel your subscription,
              simply log in to your account dashboard. You're in complete
              control of your flower delivery experience.
            </p>
          </Plan>
          <div>
            {subscriptions.map((item, index) => (
              <SubscriptionCategory
                key={index}
                style={selectCategory ? { opacity: "0.4" } : { opacity: "1" }}
              >
                <div className="category">
                  <img src={item.image} alt="" />
                  <div className="categorydesc">
                    <p className="tatle">{item.category}</p>
                    <li>Price ${item.price}</li>
                    <li>{item.delivery}</li>
                    <li>{item.theBest}</li>
                    <li>{item.firstDelivery}</li>
                    {item.firstDelivery2 ? (
                      <li>{item.firstDelivery2}</li>
                    ) : null}
                    <li>Save up to {item.saveUp}%</li>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectCategory(true);
                    setSelectFrequency(true);
                  }}
                  style={
                    !selectCategory
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                >
                  SELECT
                </button>
              </SubscriptionCategory>
            ))}
          </div>

          <div>
            {deliveryFrequency.map((item, index) => (
              <DeliveryFrequency
                key={index}
                style={selectFrequency ? { opacity: "1" } : { opacity: "0.4" }}
              >
                <p className="qst">How often do you want flowers delivered?</p>
                <p className="deliveryFrequency">
                  Select the delivery frequency
                </p>
                <div className="frequency">
                  <button
                    onClick={() => {
                      setSelectQuantity(true);
                      setSelectFrequency(false);
                    }}
                    style={
                      selectFrequency
                        ? { cursor: "pointer" }
                        : { cursor: "default" }
                    }
                  >
                    {item.frequency}
                  </button>
                </div>
              </DeliveryFrequency>
            ))}
          </div>

          <QuantitySubscribtion
            style={selectQuantity ? { opacity: "1" } : { opacity: "0.4" }}
          >
            <p className="qst">How many deliveries would you like ?</p>
            <p className="deliveryFrequency">
              Pay once and do not worry about flowers, our bouquets will be
              beautiful and on time, as many times as you need
            </p>
            <div className="frequency">
              <button className="arithmeticOperator">-</button>
              <button className="qty">1</button>
              <button className="arithmeticOperator">+</button>
            </div>
          </QuantitySubscribtion>

          <button className="bascet">Add To Bascet</button>
        </ForYouCont>
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #121212;
  @media (min-width: 1440px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;
const Plan = styled.div`
  font-weight: 500;
  color: #121212;
  @media (min-width: 768px) {
    padding: 40px 64px;
  }
  .build {
    font-size: 12px;
    @media (min-width: 768px) {
      font-size: 14px;
    }
  }
  .title {
    margin: 24px 0 16px;
    font-size: 26px;

    @media (min-width: 768px) {
      margin: 30px 0 16px;
      font-size: 38px;
    }
    @media (min-width: 1440px) {
      margin: 41px 0 21px;
      font-size: 43px;
    }
  }

  .description {
    font-size: 16px;
    color: #6e6c6c;
    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }
`;
const ForYouImg = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;
const ForYouCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 16px;
  gap: 8px;
  @media (min-width: 1440px) {
    height: 750px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .bascet {
    width: 100%;
    padding: 16px;
    background-color: #121212;
    color: #fff;
    font-size: 16px;
    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }
`;
const SubscriptionCategory = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  .category {
    display: flex;
    flex-direction: column;
    border: 1px solid #d2d2d7;
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  img {
    width: 100%;
    border-bottom: 1px solid #d2d2d7;
    @media (min-width: 768px) {
      border-right: 1px solid #d2d2d7;
    }
  }
  .categorydesc {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 16px 16px 16px;
    line-height: 1.4;
    font-size: 16px;
    .title {
      font-size: 18px;
    }
  }
  button {
    padding: 16px;
    background-color: #121212;
    color: #fff;
  }
`;
const DeliveryFrequency = styled.div`
  border-top: 1px solid #d2d2d7;
  display: flex;
  flex-direction: column;
  padding: 40px 16px;
  color: #181818;
  & > .qst {
    font-size: 22px;
    line-height: 26.4px;
  }
  & > .frequency {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 14px;
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    & > button {
      border: 1px solid #121212;
      padding: 16px;
      text-align: center;
    }
    :hover {
      background-color: #121212;
      color: #fff;
    }
  }
  .deliveryFrequency {
    margin: 16px 0 24px;
    font-size: 16px;
  }
`;
const QuantitySubscribtion = styled.div`
  border-top: 1px solid #d2d2d7;
  display: flex;
  flex-direction: column;
  padding: 40px 16px;
  color: #181818;

  & > .qst {
    font-size: 22px;
    line-height: 26.4px;
  }
  .frequency {
    display: grid;
    grid-template-columns: 50px 68% 50px;
    @media (min-width: 468px) {
      grid-template-columns: 50px 80px 50px;
    }

    & > button {
      border: 1px solid #121212;
      padding: 16px;
      text-align: center;
      cursor: pointer;
    }
  }

  .deliveryFrequency {
    margin: 16px 0 24px;
    font-size: 16px;
  }
`;
