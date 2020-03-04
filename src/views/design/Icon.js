import styled from "styled-components";
import {ReactComponent as UserSVG} from "../../components/login/assets/person-24px.svg";
import {ReactComponent as LockSVG} from "../../components/login/assets/lock-24px.svg";
import {ReactComponent as OnlineSVG} from "../../components/login/assets/check_circle-24px.svg";
import {ReactComponent as OfflineSVG} from "../../components/login/assets/remove_circle-24px.svg";
import {ReactComponent as BirthdaySVG} from "../../components/login/assets/cake-24px.svg";
import {ReactComponent as creationSVG} from "../../components/login/assets/how_to_reg-24px.svg";
import {ReactComponent as visibilitySVG} from "../../components/login/assets/visibility-24px.svg";
import {ReactComponent as visibilityOffSVG} from "../../components/login/assets/visibility_off-24px.svg";

export const UserIcon = styled(UserSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const LockIcon = styled(LockSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const OnlineIcon = styled(OnlineSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const OfflineIcon = styled(OfflineSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const CakeIcon = styled(BirthdaySVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const CreationIcon = styled(creationSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const EyeIcon = styled(visibilitySVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;

export const EyeStrokeIcon = styled(visibilityOffSVG)`
  fill: ${props => (props.fill || "#9aa5b1")};
  width: 1.6rem;
  height: 1.6rem;
  margin-left: ${props => props.marginLeft || "1.2rem"};
  margin-right ${props => props.marginRight || "1rem"};
  margin-bottom ${props => props.marginBottom || "1rem"};
`;