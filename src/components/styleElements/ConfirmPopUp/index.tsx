import * as React from 'react';
import styled from 'styled-components';

interface Props {
  show: boolean;
  updateFriend: ()=> void;
  text: string;
}

// eslint-disable-next-line no-undef
const StyledConfirmPopUp = styled.div<{display: string}>`
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  position: fixed;
  background: var(--dark-900-50);
  z-index: 5;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

const PopUpContainer = styled.div`
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 180px;
  border-radius: 20px;
  padding: 10px;
  background: var(--prime-500-25);
  margin-top: 10vh;`;

const PopUp = styled.div`
  width: 180px;
  height: 160px;
  background: var(--prime-900);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
padding: 10px;
font-size: 30px;
font-weight: 600;`;

const SubText = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 50px;`;

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
padding: 5px;
background: var(--dark-300);
width: 60px;
cursor: pointer;`;

const ButtonChoices = styled.div`
margin-top: 20px;
display: flex;
flex-direction: row;
justify-content: space-evenly;`;


export const ConfirmPopUp = (props: Props) => {
  const [display, setDisplay] = React.useState('false');

  const confirmHandler = () => {
   props.updateFriend;
    setDisplay('false');}

  
React.useEffect(() => {
  if(props.show) {
    setDisplay('true');
  }
}, [props.show])

  return (
    <StyledConfirmPopUp display={display}>
      <PopUpContainer>
      <PopUp>
        <Text>Confirm</Text>
        <SubText>{props.text}</SubText>
        <ButtonChoices>
          <Button onClick={confirmHandler}>Yes</Button>
          <Button onClick={() => setDisplay('false')}>Cancel</Button>
        </ButtonChoices>
      </PopUp>
      </PopUpContainer>
    </StyledConfirmPopUp>
  );
};
