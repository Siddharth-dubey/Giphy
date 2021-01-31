import styled from "styled-components";
import react, { useState, useEffect, useRef } from "react";
import { makePost, makeGet } from "./services/api.service";
import URL from "./constants/url.constants";
import { getNodeText } from "@testing-library/react";

const token = "5pz3ijoel9TP8PVJPb0SDND5kdXihPyc";

const Trending = () => {
  const [listItems, setListItems] = useState([]);
  const [offset, setoffset] = useState(0);
  const itemRef = useRef(null);

  useEffect(() => {
    getTrendingGifs();
    return () => {
      itemRef.current && observer.unobserve(itemRef.current);
    };
  }, []);

  const getTrendingGifs = () => {
    makeGet(URL.trending + `?api_key=${token}&offset=${offset}`)
      .then((response) => response.json())
      .then(
        (res) => {
          console.log(res);
          setListItems(res.data);
          setoffset(offset + 50);
          itemRef.current && observer.observe(itemRef.current);
        },
        (err) => {
          console.log("Error");
        }
      );
  };

  const observer = new IntersectionObserver(getTrendingGifs, {
    threshold: 0.1,
  });

  const getNext = () => {
    setListItems([]);
    getTrendingGifs();
  };

  return (
    <HomeWrapper>
      <Title>Trending</Title>
      <PaginationWrap>
        <Next onClick={getNext}>Next</Next>
      </PaginationWrap>
      <ListWrapper>
        {listItems && listItems.length ? (
          listItems.map((item, index) => {
            return (
              <ListItem
                ref={index.length === listItems.length ? itemRef : null}
                key={index}
              >
                <GIF src={item.images.fixed_height_small.url}></GIF>
              </ListItem>
            );
          })
        ) : (
          <ListItem ref={itemRef}></ListItem>
        )}
      </ListWrapper>
    </HomeWrapper>
  );
};

export default Trending;

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
const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 90vh;
  min-height: 90vh;
  overflow-y: scroll;
`;
const ListItem = styled.div`
  max-width: 200px;
  min-height: 100px;
`;
const GIF = styled.img``;
const PaginationWrap = styled.div`
  display: flex;
  margin: 10px;
`;
const Next = styled.button`
  display: flex;
  margin: 10px;
`;
