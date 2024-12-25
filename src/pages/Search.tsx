import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tproducts } from "../types/AddCategories";
export default function SingleCategory() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  let inputValue: string | null = localStorage.getItem("searchValue");
  if (inputValue) {
    inputValue = JSON.parse(inputValue);
  }

  useEffect(() => {
    async function foo(id: string | null) {
      const res = await fetch(
        `https://algouni-students.duckdns.org/api/product?name=${id}`
      );

      if (res.ok) {
        const data = await res.json();
        setSearched(data);
        setCheck(true);
      }
    }
    foo(inputValue);
  }, [inputValue]);
  const [searched, setSearched] = useState<Tproducts[]>([
    {
      id: 0,
      name: "",
      price: 0,
      description: "",
      inStock: 0,
      image: "",
      category: {
        name: "",
        id: 0,
        bg_picture: "",
      },
    },
  ]);
  return (
    <>
      {!check ? (
        <LoadingCon>
          <h1 style={{ fontSize: "32px", color: "#121212" }}>loading</h1>
        </LoadingCon>
      ) : (
        <Parent>
          <GridedCon>
            {searched.map((item, index) => {
              return (
                <ProductsCon key={index}>
                  <ImageCon
                    backImg={item.image}
                    onClick={() =>
                      navigate(`/${item.category.name}/${item.id}`)
                    }
                  >
                    <TextCon>
                      <ItemNameSpan
                        onClick={() =>
                          navigate(`/${item.category.name}/${item.id}`)
                        }
                      >
                        {item.name}
                      </ItemNameSpan>
                      <PriceSpan> price ${item.price}</PriceSpan>
                    </TextCon>
                  </ImageCon>
                </ProductsCon>
              );
            })}
            {searched.length === 0 ? <Parag>No Result</Parag> : null}
          </GridedCon>
        </Parent>
      )}
    </>
  );
}

const Parag = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`;
const LoadingCon = styled.div`
  margin: 0 auto;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #121212; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const GridedCon = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 100vh;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1440px) {
    width: 50%;
  }
`;
const ItemNameSpan = styled.span`
  color: var(--Black, #121212);
  text-align: center;
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const PriceSpan = styled.span`
  color: var(--Gray, #808080);
  text-align: center;
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const TextCon = styled.div`
  right: 37%;
  bottom: 5rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 2rem;
  width: 13rem;
`;
const ImageCon = styled.div<{ backImg: string }>`
  height: 48rem;
  background-image: url(${(props) => props.backImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100% 100%;
  cursor: pointer;
`;

const ProductsCon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  border-bottom: 1px solid #121212;
  height: fit-content;

  @media (min-width: 768px) {
    width: 100%;
    border: 1px solid #121212;
    height: fit-content;
  }
  @media (min-width: 1440px) {
    width: 100%;
    border: 1px solid #121212;
    /* height: fit-content; */
  }
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(211, 211, 211, 0.1);
  @media (min-width: 1440px) {
    flex-direction: row;
  }
`;
