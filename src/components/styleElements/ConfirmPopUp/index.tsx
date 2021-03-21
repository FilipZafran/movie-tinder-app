import * as React from 'react';
import styled from 'styled-components';
import {CirclesBg} from '../icons';

interface Props {
  show: boolean;
  statusChange: (confirm: boolean) => void;
  text: string;
  friendId: { id: string; username: string };
  closePopUp: (open: boolean) => void;
}

// eslint-disable-next-line no-undef
const StyledConfirmPopUp = styled.div<{ display: string }>`
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  position: fixed;
  background: var(--dark-900-50);
  z-index: 5;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  color: var(--dark-900);
`;

const CirclesBackground = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;

const PopUp = styled.div`
  width: 240px;
  height: 140px;
  padding: 30px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  padding: 10px;
  font-size: 20px;
`;

// eslint-disable-next-line no-undef
const Button = styled.div<{yes: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  background: ${(props) => (props.yes && 'var(--dark-900)')};
  color: ${(props) => (props.yes && 'var(--light-100)')};
  border: 1px solid var(--dark-900);
  width: 60px;
  cursor: pointer;
`;

const ButtonChoices = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ConfirmPopUp = (props: Props) => {
  const [display, setDisplay] = React.useState('false');

  const textToDisplay = props.text === 'accept friend request' ? 'accept friend request from ' : props.text === 'unfriend' ? 'unfriend ' :
      props.text === 'cancel friend request' ? 'cancel friend request to ' : 'send friend request to ';

  const confirmHandler = () => {
    // console.log('friend: ', props.friendId.username);
    props.statusChange(true);
    props.closePopUp(false);
    setDisplay('false');
  };

  React.useEffect(() => {
    if (props.show) {
      setDisplay('true');
    }
  }, [props.show]);

  return (
    <StyledConfirmPopUp display={display}>
        <PopUp>
          <Text>{textToDisplay}{`"${props.friendId.username}"?`}</Text>
          <ButtonChoices>
            <Button
              yes={false}
              onClick={() => {
                setDisplay('false');
                props.closePopUp(false);
              }}
            >
              Cancel
            </Button>
            <Button yes onClick={confirmHandler}>Yes</Button>
          </ButtonChoices>
        </PopUp>
        <CirclesBackground>
          <CirclesBg size="small" color="gold" />
        </CirclesBackground>
    </StyledConfirmPopUp>
  );
};
