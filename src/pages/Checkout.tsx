import styled from "styled-components";
import BillingDetails from "../components/forCheckout/BillingDetails";
import ShipingInfo from "../components/forCheckout/ShipingInfo";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCheckout } from "../Scema/Checkout";
import { TcheckoutTypes } from "../types/CheckoutTypes";
import { CartItem, TCartType } from "../types/CartType";
import { useNavigate } from "react-router-dom";
import Purchase from "../components/Purchase";
import { useContext, useState } from "react";
import { Context } from "../App";

export default function Checkout() {
  const { setUsers } = useContext(Context);
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
  }
  const navigate = useNavigate();
  const [purchaseShow, setPurchaseShow] = useState<boolean>(false);
  const data: string | null = localStorage.getItem("cart");
  let cart: TCartType | null = null;
  if (data) {
    cart = JSON.parse(data);
  }

  const count = cart?.items.reduce(
    (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
    0
  );
  const inputsData: SubmitHandler<TcheckoutTypes> = async (InputsData) => {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
      const orderItems = cart?.items.map((item: CartItem) => {
        return { product_id: item.product.id, quantity: item.quantity };
      });
      if (cart) {
        if (cart?.items.length > 0) {
          InputsData.items = orderItems;
          InputsData.total = count;
          const res = await fetch(
            "https://algouni-students.duckdns.org/api/order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  (token as { access: string; refresh: string }).access
                }`,
              },
              body: JSON.stringify(InputsData),
            }
          );
          if (res.ok) {
            cart = { ...cart, items: [] };
            localStorage.setItem("cart", JSON.stringify(cart));
            setPurchaseShow(true);
          } else if (res.status === 401) {
            clear();
          } else {
            throw alert("oops something went wrong");
          }
        }
      }
    }
  };
  const methods = useForm({ resolver: yupResolver(schemaCheckout) });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Parent>
        <CheckOutCon>
          <GoBack onClick={() => navigate("-1")}>Go Back</GoBack>
          <Hone>CHECKOUT</Hone>
          <form onSubmit={handleSubmit(inputsData)}>
            <BillingDetails />
            <ShipingInfo />
            <Btn> Continue And Pay</Btn>
          </form>
        </CheckOutCon>
        <Cover>
          <CartCon>
            {cart?.items.map((item: CartItem, index: number) => {
              return (
                <SingleItemCon key={index}>
                  <Image src={item.product.image} alt="" />
                  <Honee>{item.product.name}</Honee>
                  {
                    <Para>
                      <Span>{item.product.category.name} </Span>
                    </Para>
                  }
                  <Para>
                    Quantity <Span>{item.quantity} x</Span>
                  </Para>
                  <Para>$ {item.product.price}</Para>
                </SingleItemCon>
              );
            })}
          </CartCon>
          <Con>
            <TotalSpan>Total</TotalSpan>
            <MoneyAmoint>{count}$</MoneyAmoint>
          </Con>
        </Cover>
        {purchaseShow ? <Purchase /> : null}
      </Parent>
    </FormProvider>
  );
}

const GoBack = styled.span`
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;
`;
const Con = styled.div`
  padding: 2.4rem;
  display: flex;
  justify-content: space-between;
`;
const MoneyAmoint = styled.span`
  font-size: 20px;
  font-weight: 600;
  opacity: 0.5;
`;
const TotalSpan = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
const Cover = styled.div`
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  @media (min-width: 1200px) {
    width: 40%;
  }
`;
const Span = styled.span`
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;
`;
const Para = styled.p`
  font-size: 20px;
  font-weight: 500;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;
const Image = styled.img`
  width: 6rem;
  height: 6rem;
`;
const CartCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background-color: #fff;
  padding: 2.4rem;
  border-radius: 8px;
  @media (min-width: 1200px) {
    width: 100%;
  }
`;
const CheckOutCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Honee = styled.h1`
  color: #121212;
  font-size: 18px;
  font-weight: 600;
  @media (min-width: 1200px) {
    font-weight: 500;
  }
`;
const SingleItemCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Btn = styled.button`
  letter-spacing: 1px;
  margin-top: 2.4rem;
  width: 100%;
  border: none;
  padding: 1.5rem;
  background-color: #121212;
  color: #fff;
  font-size: 19px;
  font-weight: 500;
  border-radius: 8px;
`;
const Hone = styled.h1`
  font-size: 24px;
  letter-spacing: 1px;
  color: #121212;
  font-weight: 700;
`;
const Parent = styled.div`
  position: relative;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
