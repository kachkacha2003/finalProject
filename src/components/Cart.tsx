import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TCartType } from "../types/CartType";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

export default function Cart() {
  const { setUsers, setCartshow } = useContext(Context);
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
  let token: string | { access: string; refresh: string } | null =
    localStorage.getItem("token");
  const navigate = useNavigate();
  async function deleteCartItem(id: number) {
    if (token) {
      token = JSON.parse(token as string);
      const res = await fetch(
        `https://ecommerce-collab.duckdns.org/api/cart-item/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              (token as { access: string; refresh: string }).access
            }`,
          },
        }
      );
      if (res.ok) {
        setCartItemsState((prev) => {
          const updatedState = {
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
          };
          localStorage.setItem("cart", JSON.stringify(updatedState));
          return updatedState;
        });
      } else if (res.status === 401) {
        clear();
      } else {
        throw alert("something went wrong");
      }
    }
  }

  const [cartItemsState, setCartItemsState] = useState<TCartType>({
    id: 1,
    user: 1,
    items: [],
  });

  useEffect(() => {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token as string);
      const cartrequest = async () => {
        const cart = localStorage.getItem("cart");
        if (!cart) {
          const res = await fetch(
            "https://algouni-students.duckdns.org/api/cart",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${
                  (token as { access: string; refresh: string }).access
                }`,
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            setCartItemsState(data);
            localStorage.setItem("cart", JSON.stringify(data));
          } else {
            clear();
          }
        } else {
          setCartItemsState(JSON.parse(cart));
        }
      };

      cartrequest();
    }
  }, []);

  async function deleteAllInCart(id: number) {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
      const res = await fetch(
        `https://algouni-students.duckdns.org/api/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              (token as { access: string; refresh: string }).access
            }`,
          },
        }
      );
      console.log(res);
      if (res.ok) {
        setCartItemsState((prev) => {
          const updatedState = {
            ...prev,
            items: [],
          };
          localStorage.setItem("cart", JSON.stringify(updatedState));
          return updatedState;
        });
      } else if (res.status === 401) {
        clear();
      } else {
        throw alert("oops something went wrong");
      }
    }
  }

  return (
    <Cover>
      <Parent>
        <TextCon>
          <CartSpan>Cart</CartSpan>
          <RemoveAllSpan onClick={() => deleteAllInCart(cartItemsState.id)}>
            Remove All
          </RemoveAllSpan>
        </TextCon>
        <CartItemsConParent>
          {cartItemsState.items.map((item, index) => {
            return (
              <CartItemsCon key={index}>
                <ItemImage src={item.product.image} alt="" />
                <ItemsNameSpan>{item.product.name} </ItemsNameSpan>
                <ItemsPriceSpan>
                  ${item.product.price}
                  <ItemQuantitySpan> ({item.quantity} x)</ItemQuantitySpan>
                </ItemsPriceSpan>
                <ItemsPriceSpan onClick={() => deleteCartItem(item.id)}>
                  Remove
                </ItemsPriceSpan>
              </CartItemsCon>
            );
          })}
        </CartItemsConParent>
        <TotalCon>
          <TotalSpan>Total</TotalSpan>
          <MoneyAmountSpan>$</MoneyAmountSpan>
        </TotalCon>
        <Btn
          onClick={() => {
            if (cartItemsState.items.length === 0) {
              throw alert("empty cart");
            } else {
              navigate("/checkout");
              setCartshow(false);
            }
          }}
        >
          Check Out
        </Btn>
      </Parent>
    </Cover>
  );
}
const ItemQuantitySpan = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
const ItemsPriceSpan = styled.span`
  font-size: 14px;
  opacity: 0.5;
  color: #121212;
`;
const ItemsNameSpan = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #121212;
`;
const ItemImage = styled.img`
  width: 6rem;
  height: 6rem;
`;
const CartItemsCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Btn = styled.button`
  padding: 1.5rem;
  background-color: #121212;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: orange;
  }
`;
const MoneyAmountSpan = styled.span`
  font-size: 15px;
  font-weight: 500;

  color: #121212;
`;
const TotalSpan = styled.span`
  font-size: 15px;
  font-weight: 500;
  opacity: 0.5;
  color: #121212;
`;
const TotalCon = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CartItemsConParent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const RemoveAllSpan = styled.span`
  color: #121212;
  font-size: 18px;
  font-size: 500;
  text-decoration: underline;
  opacity: 0.5;
`;
const CartSpan = styled.span`
  color: #121212;
  font-size: 18px;
  font-size: 700;
`;
const TextCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Parent = styled.div`
  border-radius: 8px;
  background-color: #fff;
  padding: 2.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 40rem;
  height: 70rem;
  overflow-y: auto;
`;
const Cover = styled.div`
  overflow-y: auto;
  z-index: 89;
  top: 0;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;
