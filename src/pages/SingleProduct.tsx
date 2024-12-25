import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Quantity from "../components/Quantity";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import Carusel from "../components/Carusel";
import PriceOptions from "../components/PriceOptions";
import { TsingleCategory } from "../types/SingleCategoryType";
export default function SingleProduct() {
  const { singleProduct } = useParams();
  const [singlePorudctState, setSingleProductState] = useState<TsingleCategory>(
    {
      id: 1,
      name: "",
      price: 0,
      category: {
        name: "",
        id: 0,
        image: "",
      },
      description: "",
      inStock: 0,
      image: "",
    }
  );

  useEffect(() => {
    async function fetchSingleProduct(id: string | undefined) {
      const response = await fetch(
        `https://algouni-students.duckdns.org/api/product/${id}`
      );
      const data = await response.json();
      setSingleProductState(data);
    }
    fetchSingleProduct(singleProduct);
  }, [singleProduct]);

  return (
    <Parent>
      <SingleProductCon>
        <ImageCon>
          <Image src={singlePorudctState.image} alt="" />
        </ImageCon>
        <TextSCon>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ItemCategoryName>
              {singlePorudctState.category.name} /{" "}
            </ItemCategoryName>
            <ItemByeType>{singlePorudctState.name}</ItemByeType>
          </div>
          <div style={{ display: "flex" }}>
            <NameAndPriceP>{singlePorudctState.name}</NameAndPriceP>
            <NameAndPriceP>-${singlePorudctState.price}</NameAndPriceP>
          </div>
          <DescriptionP>{singlePorudctState.description}</DescriptionP>
          <Quantity />
          <Carusel />
          <PriceOptions
            price={singlePorudctState.price}
            singleProduct={singleProduct}
          />
        </TextSCon>
      </SingleProductCon>

      <YouMayAlsoLike />
    </Parent>
  );
}

const DescriptionP = styled.p`
  color: var(--black-brightness-90, rgba(18, 18, 18, 0.9));
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;
const NameAndPriceP = styled.p`
  color: var(--Black, #121212);

  font-family: Gilroy;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  @media (min-width: 1200px) {
    font-size: 28px;
  }
`;
const ItemByeType = styled.div`
  color: var(--Black, #121212);
  font-family: Gilroy;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: uppercase;
  opacity: 0.5;
  letter-spacing: 1px;
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;
const ItemCategoryName = styled.div`
  letter-spacing: 1px;
  color: var(--Black, #121212);
  font-family: Gilroy;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: uppercase;
  @media (min-width: 1200px) {
    font-size: 15px;
  }
`;
const TextSCon = styled.div`
  padding: 2.4rem 2.4rem 4.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  @media (min-width: 1200px) {
    padding: 4rem;
    gap: 3.2rem;
    width: 50%;
  }
`;
const SingleProductCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 36rem;
  @media (min-width: 768px) {
    height: 46rem;
  }
  @media (min-width: 1200px) {
    min-height: 100vh;
  }
`;
const ImageCon = styled.div`
  width: 100%;
  height: 36rem;
  border-bottom: 1px solid #121212;
  @media (min-width: 768px) {
    height: 46rem;
  }
  @media (min-width: 1200px) {
    min-height: 100vh;
    width: 50%;
  }
`;
const Parent = styled.div`
  display: flex;
  flex-direction: column;
`;
