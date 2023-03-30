import { CardContent } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import formationsData from './formationsData.json';
import newsData from './newsData.json';

const Wrapper = styled.div`
background-color: #fff; 
font-family: 'Alegreya Sans';
`;

const Title = styled.h2`
position: relative;
padding: 10px;
padding-left: 25px;
margin: 0;
display: block;
align-items: middle;

strong {
position: relative;
z-index: 2;
background-color: #1976d2;
padding: 4px 8px;
color:white;
display: inline-flex;
align-items: middle;
@media screen and (min-width: 1024px) {
    font-size: 1.2rem;  }
}

span {
font-size: 1.4em;
position: inherit;
background-color:white;
z-index: 2;
color: rgb(25, 118, 210);
margin-left: 20px;
display: content;
align-items: middle;
}

&:after {
content: '';
position: absolute;
z-index: 1;
bottom: 50%;
margin-bottom: -2px;
height: 2px;
left: 0;
right: 0;
background-color: #1976d2;
}
`;

const CardWrapper = styled.div `
display:flex;
margin-top: 1rem;
flex-flow:row wrap;`;

const Card = styled.a`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 20px;
  width: 19rem;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  transform-origin: center top;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: 0.3s;

  &:after {
    content: '';
    position: absolute;
    z-index: 10;
    width: 200%;
    height: 100%;
    top: -90%;
    left: -20px;
    opacity: 0.1;
    transform: rotate(45deg);
    background: linear-gradient(to top, transparent, #fff 15%, rgba(255, 255, 255, 0.5));
    transition: 0.3s;
  }

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 8px 16px 3px rgba(0, 0, 0, 0.6);
    transform: translateY(-1px) scale(1.001) rotateX(0deg);
    &:after {
      transform: rotate(25deg);
      opacity: 0.15;
    }
  }
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    &:hover {
      transform: none;
      &:after {
        transform: none;
      }
    }
  }
  @media screen and (min-width: 425px) {
    width: 22rem;
  }
  @media screen and (min-width: 768px) {
    width: 28rem;
  }
  @media screen and (min-width: 1024px) {
    width: 20.5rem;
  }
  @media screen and (min-width: 1440px){
    width: 21.5rem;
  }
`;


const CardImg = styled.img`
  width: 100%; 
  height: 50%;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;


const CardCaption = styled.div`
  display: flex;
  font-size: 14px;
  letter-spacing: 0px;
  background-color: transparent;
  color: black;
  transition: 0.3s;  
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h3 {
    color: #3792e3;
    font-size: 16px;
    margin-bottom: 0;
    font-weight: bold;
    visibility: hidden;
    transition: visibility 0.3s;
  }
`;

const NewsWrapper = styled.div`
display:flex;
justify-content: center;
flex-flow: row wrap;
@media screen and (min-width: 1440px) {
    justify-content: space-between;
  }`
;

const Article = styled.figure`
position: relative;
overflow: hidden;
width: 19rem;
height: 12rem;
margin: 20px;;
@media screen and (min-width: 425px) {
  width: 22rem;
  height: 15rem;
  }
@media screen and (min-width: 768px) {
    width: 28rem;
    height: 20rem;
  }
@media screen and (min-width: 1024px) {
    width: 20rem;
    height: 15rem;
  }
@media screen and (min-width: 1440px) {
    width: 21.5rem;
    height: 16rem;
  }
`;
const ArticleImg = styled.img`
width: 100%;
min-height: 100%;
transition: 0.2s;

&:hover, &:focus, &:active {
    filter: blur(3px);
    transform: scale(0.97);
}`;

const ArticleCaption = styled.div`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
padding: 40px;
box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
background: rgba(6, 18, 53, 0.6);
opacity: 0;
transform: scale(1.15);
transition: 0.2s;

h3 {
  color: #3792e3;
  font-size: 16px;
  margin-bottom: 0;
  font-weight: bold;
}

&:hover, &:focus, &:active {
  opacity: 1;
  transform: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}`;

const ArticleTitle = styled.h3`
font-size: 1.5rem;
font-weight: bold;
margin: 1rem 0;
`;

const ArticleContent = styled.p`
color:white;
font-size: 0.9rem;
line-height: 1.5;`;

const InputWrapper = styled.div`
  input {
    background-color: #eee;
    border: none;
    margin-top: 1rem;
    padding: 1rem;
    height: 2.5rem;
    font-size: 1rem;
    width: 15.438rem;;
    margin-right: 20px;
    color: grey;
    box-shadow: 0 0.3rem #dfd9d9;
    cursor: pointer;
    
    &:focus {
      outline-color: #1976d2;
    }
  }
  @media screen and (min-width: 1024px) {
    input {
      width: 20.438rem;
    }  
  }
  @media screen and (min-width: 1440px) {
    input {
      width: 21.438rem;
    }  
  }
`;
const SearchWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: end;
background-color: #fff;
border-radius: 1rem;
@media screen and (min-width: 768px) {
  flex-direction: row-reverse;
}
`;
const CardContentWrapper = styled.div`
padding: 10px;
`;

const TopContent = styled.div`
display:flex;
justify-content: space-between;`;

const TitleWrapper = styled.div`
display:flex;
flex-direction: column;
`;
const AuthorContent = styled.p`
color:grey;
font-size:0.7rem;
margin-bottom:10px;
`;

const SearchBar = ({ value, onChange }) => {
    return (
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    );
  };

  const formatDuration = (duration) => {
    if (duration < 60 * 60 * 1000) {
      const minutes = Math.floor(duration / (60 * 1000));
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(duration / (60 * 60 * 1000));
      const remainingMinutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));
      return `${hours} h ${remainingMinutes} min`;
    }
  };
  
  const List = () => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredFormations = formationsData.filter(
      (formation) =>
        formation.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        formation.duration
    );
  
    return (
      <Wrapper>
        <Title>
          <strong>Formations</strong>
          <span>({filteredFormations.length})</span>
        </Title>
        <SearchWrapper>
          <InputWrapper>
            <SearchBar value={searchTerm} onChange={handleSearch} />
          </InputWrapper>
        </SearchWrapper>
        <CardWrapper src='' >
          {filteredFormations.map((formation) => (
            <Card key={formation.id} className="card" onClick={() => {window.location.href = formation.url}}>
              <CardImg src={formation.image} />
                <CardContentWrapper>
                <TopContent>
                <TitleWrapper>
                <CardCaption>{formation.title}</CardCaption>
                <AuthorContent>{formation.author}</AuthorContent>
                </TitleWrapper>
                {formation.duration && (
                  <CardCaption>{formatDuration(formation.duration)}</CardCaption>
                )}
                </TopContent>
                <CardCaption className="description">{formation.description}</CardCaption>
              </CardContentWrapper>
            </Card>
          ))}
        </CardWrapper>
        <Title>
          <strong>Nouveauté</strong>
        </Title>
        <NewsWrapper className="news">
          {newsData.map((news) => (
            <Article key={news.id} className="article">
              <ArticleImg src={news.image} />
              <ArticleCaption>
                <ArticleTitle>{news.title}</ArticleTitle>
                <ArticleContent>{news.content}</ArticleContent>
              </ArticleCaption>
            </Article>
          ))}
        </NewsWrapper>
      </Wrapper>
    );
  };
  
  
  


export default List;

