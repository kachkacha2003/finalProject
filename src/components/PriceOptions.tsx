import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../App";
import Circle from "./Circle";
import { useNavigate } from "react-router-dom";
import { TCartType } from "../types/CartType";
export default function PriceOptions({
  price,
  singleProduct,
}: {
  price: number;
  singleProduct: string | undefined;
}) {
  const { setSubscribe, subscribe, quantity, setUsers } = useContext(Context);
  const navigate = useNavigate();
  async function getingCartItems() {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token as string);
      const res = await fetch(
        "https://algouni-students.duckdns.org/api/cart-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (token as { access: string; refresh: string }).access
            }`,
          },
          body: JSON.stringify({
            product_id: singleProduct,
            quantity: quantity,
          }),
        }
      );

      if (res.status === 401) {
        clear();
      } else if (res.ok) {
        const item = await res.json();
        const cart = localStorage.getItem("cart");
        if (cart) {
          const data: string | null = localStorage.getItem("cart");
          let cart: TCartType | null = null;

          if (data) {
            cart = JSON.parse(data) as TCartType;
          }
          cart?.items?.push(item);
          localStorage.setItem("cart", JSON.stringify(cart));
          console.log("Added");
        }
      } else if (res.status === 400) {
        throw alert("item is already in basket");
      } else {
        throw alert("oops something went wrong");
      }
    } else {
      clear();
    }

    function clear() {
      setUsers({
        id: 0,
        review: "",
        username: "",
        email: "",
        last_name: "",
        first_name: "",
        password: "",
        profilePicture: "",
        phoneNumber: "",
        is_superuser: false,
      });
      localStorage.clear();
      navigate("/login");
    }
  }
  return (
    <Parent>
      <TextsCon>
        <StyledP>Price options</StyledP>
        <CircleCon>
          <Circle subscribe={subscribe} setSubscribe={setSubscribe} />
          <PurchaseP>One time purchase. Price ${price}</PurchaseP>
        </CircleCon>
        <CircleCon>
          <Circle subscribe={!subscribe} setSubscribe={setSubscribe} />
          <SubscribeP>Subscribe now, and save 25% on this order. </SubscribeP>
        </CircleCon>
      </TextsCon>
      <Btn onClick={() => getingCartItems()}>Add to basket</Btn>
    </Parent>
  );
}

const Btn = styled.button`
  background-color: #121212;
  padding: 1.6rem;
  color: var(--White, #fff);
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.48px;
  text-transform: uppercase;
  border: none;
  @media (min-width: 1200px) {
    padding: 2rem;
  }
`;
const SubscribeP = styled.p`
  color: var(--Black, #121212);
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;
const PurchaseP = styled.p`
  color: var(--Black, #121212);
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const CircleCon = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const StyledP = styled.p`
  color: var(--Black, #121212);
  font-family: Gilroy;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const TextsCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
