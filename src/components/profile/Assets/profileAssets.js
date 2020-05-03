import styled from "styled-components";

export const PhoneContainer = styled.div`
    margin-top: 10em;
    display: flex;
    flex-direction: column;
    height: 600px; 
    width: 1150px;
    border-radius: 20px;
    align-items: flex-start;  
    padding-left: 20px;
`;

export const TextContainer = styled.div`
  background: #000000;
  color: #c0c0c0;
  column-count: 2;
  margin-top: 0px;
  margin-bottom: 15px;
  padding-top:0px;
  width: 500px;
  float: left;
  border-bottom: 2px solid #c0c0c0;
  margin-left: 0px;
`;

export const TextLeft = styled.body`
  background: transparent;
  color: #c0c0c0;
  margin: 0px;
  margin-left: 5px;
  text-align: left;
  font-size:25px;
`;

export const TextRight = styled(TextLeft)`
  color: #c0c0c0;
  margin-right: 5px;
  text-align: right;
`;

export const ProfileContainer = styled.div`

  margin-left: 140px;
  width: 840px;
  height:360px;
  background: #000000;
  padding: 10px;
`;

export const Banner = styled.div`
  height: 70px
  width: 840px
  margin-top: null;
  margin-left: 140px;
  background: #f0f0f0`


export const One = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 30%;
    float: left;
    margin-left: 0px
`;

export const Two = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-left: 32%;
`;

export const ProfilePicContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto; 
    border: 2px solid white;
    width: 150px;
    height: 150px;
    color: #ffffff;
    background: #000000;
`;

export const PixelButton = styled.button`
    border: 2px solid black;
    margin-top: ${props => props.marginTop || "15px"};
    margin-left: ${props => props.marginLeft || "5px" };
    margin-right: ${props => props.marginRight || "5px" };
    outline: ${props => props.outline || "2px solid #32CD32"};
    outline-offset: -7px;
    width: ${props => props.width || "150px" };
    height: ${props => props.height || "50px" };
    color: ${props => props.color || "#32CD32"};
    background: #000000;
    text-overflow: clip;
    &:hover {
      outline: ${props => props.hoverOutline || "2px solid #000000"};
      background: ${props => props.hoverBackground || "#32CD32"};
      color: ${props => props.hoverColor || "#000000"};
    }
`;

export const FriendsButton = styled(PixelButton)`
    outline: 2px solid #32CD32;
    margin: auto;
    margin-top: 20px;
    color: #32CD32;
    &:hover {
        outline: 2px solid #000000;
        background: #32CD32;
        color: #000000;
    }
`;

export const BlinkingPixelButton = styled(PixelButton)`
    outline: 2px solid #ffff00;
    margin: auto;
    width: ${props => props.width || "180px" };
    height: ${props => props.height || "80px" };
    margin-top: ${props => props.marginTop || "10px"};
    color: #ffff00;
    &:hover {
        background: #ffff00;
        animation: ${props => props.blinkingAnimationInverted || "blinkingAnimationInverted 2s infinite"};
    }
    animation: ${props => props.blinkingAnimation || "blinkingAnimation 2s infinite"};
`;

export const EditProfileButton = styled(PixelButton)`
    background: #000000;
    outline: 2px solid #32CD32;
    outline-offset: -7px;
    width: 150px;
    margin-left: 50px;
    margin-right: 38px;
    float: right;
    color: #32CD32;
    &:hover {
    background: #32CD32;
    }
`;

export const FriendRequestBanner = styled.button`
  height: 70px
  width: 840px
  margin-left: 140px;
  background: #AE3C3C
`
export const WindowHeader = styled.div`
  height: 70px
  width: 840px
  margin-top: 83px;
  margin-left: 140px;
  border-bottom: solid 2px #c0c0c0;
  background: #000000;
  text-align: center;
  font-size: 50px;
  color: #c0c0c0;
`

export const ButtonWrapper = styled.div`
  height: auto;
  width: auto;
`
export const Row = styled.div`
    display: flex;
    flexDirection: row;
`;

export const RowContainer = styled.div`
    background: transparent;
    color: ${props => (props.color || "#c0c0c0")};
    width: ${props => (props.width || "40%")};
    text-decoration: ${props => (props.textDecoration || null)};
    font-size:25px;
    text-align: center;
    margin: auto;
    margin-left: null;
`;
export const ButtonRow = styled.div`
    margin-top: ${props => props.marginTop || "0px"};
    display: flex;
    flexDirection: row;
    width: 100%;
    justify-content: space-evenly;
`;