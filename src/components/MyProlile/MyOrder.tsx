import styled from "styled-components";
import floverVideoBg from "/image/loginBg.jpg";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../App";
import { TOrder } from "../../types/Order";

export default function MyOrder() {
  const { setIsMyProfile, isAcount, setIsAcount } = useContext(Context);
  const [showOrder, setShowOrder] = useState<boolean | null | number>(false);
  const [order, setOrder] = useState<TOrder[]>([
    {
      recipientsName: "",
      recipientsPhoneNumber: "",
      dateOfDelivery: "",
      deliveryTime: "",
      city: "",
      street: "",
      houseNumber: "",
      total: 0,
      items: [
        {
          product: {
            image: "",
            name: "",
            price: 0,
            category: {
              id: 0,
              image: "",
              name: "",
            },
            description: "",
          },
          quantity: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token as string);
    }
    async function fetchSubscriptions() {
      const response = await fetch(
        "https://algouni-students.duckdns.org/api/order",

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              (token as { access: string; refresh: string }).access
            }`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      }

      console.log(order);
    }
    fetchSubscriptions();
  }, []);
  console.log(order[0]);
  return (
    <>
      {isAcount ? (
        <Parent>
          <MainCont>
            <Orders>
              {order.map((item, index: number) => (
                <Order key={index}>
                  <OrderNumber>
                    <p
                      onClick={() => {
                        setShowOrder(
                          showOrder !== index ? order.indexOf(item) : null
                        );
                      }}
                    >
                      Order Number N {index + 1}
                    </p>
                  </OrderNumber>
                  <OrderCont
                    style={
                      showOrder !== index
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <DeliverInfo>
                      <h2>delivery info</h2>
                      <div>
                        <div>
                          <p>date of delivey: {item.dateOfDelivery}</p>
                          <p>delivety time: {item.deliveryTime}</p>
                        </div>
                        <div>
                          <p>street: {item.street}</p>
                          <p>house N: {item.houseNumber}</p>
                        </div>
                      </div>
                    </DeliverInfo>

                    <h2 style={{ marginTop: "30px" }}>product info</h2>
                    <Products>
                      <Title>
                        <p>N</p>
                        <p>image</p>
                        <p>category</p>
                        <p>name</p>
                        <p>quantity</p>
                        <p>price</p>
                      </Title>

                      {item.items.map((prod, indexx: number) => (
                        <div key={indexx}>
                          <Product>
                            <p>{indexx + 1}</p>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src={prod.product.image}
                              alt={prod.product.name}
                            />
                            <p>{prod.product.category.name}</p>
                            <p>{prod.product.name}</p>
                            <p>{prod.quantity}</p>
                            <p>{prod.product.price}</p>
                          </Product>
                        </div>
                      ))}
                      <p className="total">
                        Total: <span>{item.total} USD</span>
                      </p>
                    </Products>
                  </OrderCont>
                </Order>
              ))}
            </Orders>

            <TitleIconBack>
              <h2
                onClick={() => {
                  setIsMyProfile(true), setIsAcount(false);
                }}
              >
                back
              </h2>
            </TitleIconBack>
          </MainCont>
        </Parent>
      ) : null}
    </>
  );
}
const Parent = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    background-image: url(${floverVideoBg});
    padding: 40px;
  }
`;
const MainCont = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f7;
  height: 500px;
`;
const Orders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 400px;
  overflow-y: auto;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
`;
const OrderNumber = styled.div`
  background-color: #64da88;
  p {
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
  }
`;
const OrderCont = styled.div`
  /* padding: 20px 10px; */
  display: flex;
  flex-direction: column;
  justify-content: left;
  /* gap: 30px; */
  width: 90%;
  background-color: #f5f5f7;
  font-size: 12px;
  & > p {
    font-size: 20px;
    font-weight: bold;
    border-top: 1px solid #121212;
    & > span {
      font-size: 16px;
      font-weight: normal;
    }
  }

  @media (min-width: 768px) {
    width: 100%;
    padding: 40px;
    font-size: 16px;
  }
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: last baseline;
`;

const DeliverInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  & > div {
    display: flex;
    flex-direction: row;
    gap: 250px;
  }
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  background-color: #c7cdc7;
  padding: 5px;
`;
const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  border-top: 1px solid #121212;
`;
const TitleIconBack = styled.div<{ isMyProfile?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border-top: 1px dashed #adaaaa;
  & > h2 {
    font-size: 30px;
    color: #736d6d;
    text-shadow: 1px 2px #121212;
    cursor: pointer;
  }
  :hover {
    color: #3ab561;
    font-size: 32px;
  }
`;
