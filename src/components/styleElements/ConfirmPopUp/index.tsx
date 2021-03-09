import * as React from 'react';
import styled from 'styled-components';

interface Props {
  display: string;
}

const StyledConfirmPopUp = styled.div`
  position: fixed;
  background: var(--dark-900-50);
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Text = styled.div``;

const Button = styled.div``;

const ButtonChoices = styled.div``;

const PopUp = styled.div<Props>`
  display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
  width: 150px;
  height: 150px;
  background: var(--prime-900);
  margin-top: 10vh;
`;

export const ConfirmPopUp = (props: Props) => {
  return (
    <StyledConfirmPopUp>
      <PopUp display={props.display}>
        <Text>Confirm</Text>
        <ButtonChoices>
          <Button>Yes</Button>
          <Button>Cancel</Button>
        </ButtonChoices>
      </PopUp>
    </StyledConfirmPopUp>
  );
};
