import React from 'react';
import { render } from 'react-dom';
import { Element, Events, animateScroll as scroll } from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../../helpers/api";
import styled from "styled-components";
import { PixelButton, Row, RowContainer } from "../../profile/Assets/profileAssets";

const HandyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 730px;
  width: 400px;
`;

const PhoneScreen = styled.div`
    display: flex;
    flex-direction: column;
    width: 294px;
    height: 590px;
    margin-top: 54px;
    margin-left: 53px;
` 

const LargePhoneTitle = styled.div`
    margin-left: 0px;
    width: 100%;
    font-size: 50px;
    height: auto;
    background: #000000;
    border-bottom: 2px solid #c0c0c0;
    color: #c0c0c0;
    text-align: center;
`

class LobbyInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            friends: []
        }
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div>
                <HandyContainer className={'handyImageSmall'}>
                    <PhoneScreen>
                        <LargePhoneTitle>
                            ../Friends.js
                        </LargePhoneTitle>
                        <Element name="FriendsBox" className="element" id="containerElement" style={{
                            width:"100%",
                            height:"500px",
                            overflow: 'auto',
                        }}>
                            <Row>
                                <RowContainer
                                    width="200px">
                                    TestName
                                </RowContainer>
                                <RowContainer>
                                    <PixelButton
                                        marginTop="null"
                                        width="90px">
                                            Invite
                                    </PixelButton>
                                </RowContainer>
                            </Row>
                        </Element>
                    </PhoneScreen>
                </HandyContainer>
            </div>
        );
    }
};



render(<LobbyInvite />, document.getElementById('root'));

export default LobbyInvite;