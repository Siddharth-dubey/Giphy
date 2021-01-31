import styled from "styled-components";
import react, { useState } from "react";
import { makePost, makeGet } from "./services/api.service";
import URL from "./constants/url.constants";
import { Link } from "react-router-dom";

const token = "";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [offset, setoffset] = useState(0);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearchClick = (e) => {
    makeGet(URL.search + `?api_key=${token}&q=${searchValue}`)
      .then((response) => response.json())
      .then(
        (res) => {
          console.log(res);
          setListItems(res.data);
          setoffset(res.pagination.count);
        },
        (err) => {
          console.log("Error");
        }
      );
  };

  return (
    <HomeWrapper>
      <Title>GIFphy</Title>
      <FormWrapper>
        <InputField
          value={searchValue}
          onChange={handleInputChange}
          placeholder={"Type keyword"}
          type="text"
        ></InputField>
        <SearchBtn onClick={onSearchClick}>Search</SearchBtn>
      </FormWrapper>
      <Trending to={"/trending"}>Trending</Trending>
      <ListWrapper>
        {listItems && listItems.length
          ? listItems.map((item, index) => {
              return (
                <ListItem key={index}>
                  <GIF src={item.images.fixed_height_small.url}></GIF>
                </ListItem>
              );
            })
          : null}
      </ListWrapper>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(0 0 0 / 85%);
`;

const Title = styled.div`
  font-size: 24px;
  color: #fff;
  margin: 20px 0;
`;
const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InputField = styled.input`
  flex-basis: 60%;
  width: 200px;
  /* height: 28px; */
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
`;
const SearchBtn = styled.button`
  flex-basis: 40%;
  cursor: pointer;
  margin-left: 10px;

  width: 200px;
  /* height: 28px; */
  padding: 6px;
  border: none;
  outline: none;
  border-radius: 4px;
  background: #fd3e3e;
  color: #fff;
  font-size: 18px;
`;
const Trending = styled(Link)`
  margin: 20px 0;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 90vh;
  overflow-y: scroll;
`;
const ListItem = styled.div`
  max-width: 200px;
`;
const GIF = styled.img``;
