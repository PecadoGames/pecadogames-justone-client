import styled from "styled-components";

export const PhoneContainer = styled.div`
    margin-top: 10em;
    display: flex;
    flex-direction: column;
    height: 438px;
    width: 800px;
    border-radius: 20px;
    align-items: flex-start;  
    padding-left: 20px;
`;

export const TextContainer = styled.div`
  background: #bfbfbf;
  column-count: 2;
  margin-top: 0px;
  margin-bottom: 15px;
  padding-top:0px;
  width: 350px;
  float: left;
  margin-left: 0px;
`;

export const TextLeft = styled.body`
  background: transparent;
  margin: 0px;
  margin-left: 5px;
  text-align: left;
  font-size:25px;
`;

export const TextRight = styled(TextLeft)`
  margin-right: 5px;
  text-align: right;
`;

export const ProfileContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
  margin-left: 96px;
  width: 575px;
  height:303px;
  background: #f0f0f0;
  padding: 10px;
`;

export const One = styled.div`
    width: 30%;
    float: left;
    
`;

export const Two = styled.div`
    margin-left: 32%;
`;

export const ProfilePicContainer = styled.div`
    border: 2px solid black;
    width: 150px;
    height: 150px;
    margin-left: 0px;
    background: #ffffff;
`;

export const PixelButton = styled.button`
    border: 2px solid black;
    margin-left: 0px;
    width: 150px;
    height: 50px;
    color: black;
    background: #b3b3b3;
    text-overflow: clip;
    margin-top: 15px;
    &:hover {
    background: #c9c9c9;
    }
`;

export const EditProfileButton = styled(PixelButton)`
    background: #AE3C3C;
    width: 350px;
    margin-left:0px;
    margin-top: -8px;
    &:hover {
    background: #cf4e4e;
    }
`;