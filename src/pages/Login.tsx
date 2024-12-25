import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { schemaLogin } from "../Scema/LoginYup";
import { Tlogin } from "../types/Login";
import loginBg from "/image/loginBg.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaLogin) });
  const inputsData: SubmitHandler<Tlogin> = (data) => {
    loginUser(data);
  };

  async function loginUser(userinfo: { username: string; password: string }) {
    const res = await fetch(
      "https://algouni-students.duckdns.org/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userinfo),
      }
    );

    const info = await res.json();
    localStorage.setItem("token", JSON.stringify(info));
    if (res.ok) {
      navigate("/");
    } else {
      throw alert("incorect password or username");
    }
  }

  return (
    <Outside>
      <form
        onSubmit={handleSubmit(inputsData)}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Parent>
          <InputsCon>
            <UsernameInput
              type="text"
              placeholder="userName"
              {...register("username")}
              eror={errors.username?.message}
            />
            {errors.username ? (
              <UsernameErorSpan>{errors.username?.message}</UsernameErorSpan>
            ) : null}
            <PasswordInput
              type="password"
              placeholder="password"
              {...register("password")}
              eror={errors.password?.message}
            />
            {errors.password ? (
              <PaswordErorSpan>{errors.password?.message}</PaswordErorSpan>
            ) : null}
            <Btn>Login</Btn>
          </InputsCon>

          <TexstCon>
            <ForgotAndRestoreCon>
              <ForgotPassworsSpan>forgot password?</ForgotPassworsSpan>
              <RestorePasswordSpan onClick={() => navigate("/restore")}>
                restore now
              </RestorePasswordSpan>
            </ForgotAndRestoreCon>
            <DonotHaveAcountCon>
              <DonotHaveAcountP>Do not have an account?</DonotHaveAcountP>
              <SignUpSpan onClick={() => navigate("/signUp")}>
                Sign up
              </SignUpSpan>
            </DonotHaveAcountCon>
          </TexstCon>
        </Parent>
      </form>
    </Outside>
  );
}

const PaswordErorSpan = styled.span`
  color: red;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  right: 4rem;
  top: 9rem;
`;
const UsernameErorSpan = styled.span`
  color: red;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  right: 4rem;
  top: 4rem;
`;
const Btn = styled.button`
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  color: #fff;
  border-radius: 8px;
  padding: 1.5rem 0;
  border: none;
  background-color: #121212;
  margin-top: 2.4rem;
  &:hover {
    cursor: pointer;
    background-color: purple;
  }
`;
const DonotHaveAcountCon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3%;
`;
const ForgotAndRestoreCon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3%;
`;
const SignUpSpan = styled.span`
  color: red;
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
const DonotHaveAcountP = styled.p`
  color: var(--Gray, #808080);

  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

const RestorePasswordSpan = styled.span`
  text-decoration: underline;
  color: red;
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  &:hover {
    cursor: pointer;
  }
`;
const ForgotPassworsSpan = styled.span`
  color: var(--Gray, #808080);
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
const TexstCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2rem;
  background-color: #f5f5f7;
`;
const PasswordInput = styled.input<{ eror?: string }>`
  color: var(--Gray, #808080);
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 1.5rem 0 1.5rem 2rem;
  border: none;
  border-bottom: 1px solid ${(props) => (props.eror ? " red" : "#121212")};
  outline: none;
  &::placeholder {
    opacity: 0.5;
  }
`;
const UsernameInput = styled.input<{ eror?: string }>`
  color: var(--Gray, #808080);
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  padding: 1.5rem 0 1.5rem 2rem;
  border: none;
  border-bottom: 1px solid ${(props) => (props.eror ? " red" : "#121212")};
  outline: none;

  &::placeholder {
    opacity: 0.5;
  }
`;
const InputsCon = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f5f5f7;
`;
const Parent = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: #f5f5f7;
`;
const Outside = styled.div`
  padding: 15rem 2.4rem;
  background-color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  @media (min-width: 1440px) {
    background-image: url(${loginBg});
    background-repeat: no-repeat;
    background-size: 100%;
  }
`;
