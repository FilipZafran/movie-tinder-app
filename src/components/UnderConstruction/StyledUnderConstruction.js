import styled from 'styled-components';

export const ConstructionContainer = styled.div`
  display: ${(props) => (props.display ? 'flex' : 'none')};
  position: fixed;
  width: 100vw;
  height: 65vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ConstructionBox = styled.div`
  position: relative;
  background: var(--dark-900-50);
  width: 380px;
  height: 200px;
  border: 2px solid var(--dar-700);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
`;

export const ConstructionImage = styled.div`
  display: flex;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  justify-content: center;
  overflow: hidden;
  width: 160px;
  height: 200px;
  img {
    max-height: 100%;
  }
`;

export const ConstructionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const ConstructionTitle = styled.div`
  text-align: left;
  font-size: 25px;
  margin-bottom: 10px;
  color: var(--light-100);
`;

export const ConstructionText = styled.div`
  text-align: left;
  width: 220px;
  font-size: 12px;
  margin-bottom: 10px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const DemoButton = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 10px;
  background: var(--dark-300);
  :hover {
    padding: 11px;
    border: 0.25px solid var(--light-300);
  }
`;

export const ConstructionClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--dark-300);
  border-radius: 10px;
  width: 18px;
  height: 18px;
  :hover {
    border: 1px solid var(--light-300);
  }
`;

export const CloseContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
