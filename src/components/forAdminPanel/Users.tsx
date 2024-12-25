import { useEffect, useState } from "react";
import styled from "styled-components";
import { Tusers } from "../../types/AddCategories";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Tusers[]>([
    {
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
    },
  ]);
  useEffect(() => {
    async function fetchUsers() {
      let token: string | { access: string; refresh: string } | null =
        localStorage.getItem("token");
      if (token) {
        token = JSON.parse(token as string);
        const response = await fetch(
          "https://algouni-students.duckdns.org/auth/signup",
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
          setUsers(data);
          console.log(data);
        }
      }
    }
    fetchUsers();
  }, []);
  async function deleteUser(userId: number) {
    let token: string | { access: string; refresh: string } | null =
      localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token as string);
      const responce = await fetch(
        `https://algouni-students.duckdns.org/auth/signup/${userId}`,
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
        setUsers(users.filter((item) => item.id !== userId));
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
        <h2>List of Users</h2>
        <div className="titleContainer">
          <div className="descr">
            <p style={{ width: "45px" }} className="userName">
              Picture
            </p>
            <p style={{ width: "30px" }} className="userName">
              User Name
            </p>
            <p style={{ width: "120px" }} className="userName">
              e-mail
            </p>
            <p style={{ width: "50px" }} className="userName">
              Last name
            </p>
            <p style={{ width: "50px" }} className="userName">
              First name
            </p>
            <p style={{ width: "60px" }} className="userName">
              Password
            </p>
            <p style={{ width: "20px" }} className="userName">
              phone Number
            </p>
          </div>
        </div>
        <div className="listUsers">
          {users?.map((item, index) => (
            <div className="container" key={index}>
              <div className="descr">
                <img className="userImg" src={item.profilePicture} alt="" />
                <p style={{ width: "30px" }} className="userName">
                  {item.username}
                </p>
                <p style={{ width: "120px" }} className="userName">
                  {item.email}
                </p>
                <p style={{ width: "50px" }} className="userName">
                  {item.last_name}
                </p>
                <p style={{ width: "50px" }} className="userName">
                  {item.first_name}
                </p>
                <p style={{ width: "50px" }} className="userName">
                  {item.password}
                </p>
                <p style={{ width: "70px" }} className="userName">
                  {item.phoneNumber}
                </p>
              </div>
              <div className="editDelete">
                <button
                  onClick={() => {
                    deleteUser(item.id);
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

  .listUsers {
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
    gap: 10px;
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
