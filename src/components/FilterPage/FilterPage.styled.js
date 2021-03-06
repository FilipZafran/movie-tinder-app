import styled from 'styled-components';

export const StyledFilterPage = styled.div`
  z-index: 5;
  position: ${(props) => (props.hidden || props.seeFilters) && 'absolute'};
  bottom: ${(props) => props.hidden && props.seeFilters && '100px'};
  opacity: ${(props) => props.hidden && '%50'};
  cursor: ${(props) => !props.hidden && !props.seeFilters && 'pointer'};

  :active {
    transform: ${(props) =>
      !props.hidden && !props.seeFilters && 'scale(0.95)'};
  }

  .letsStart__border {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--prime-500-25);
    border-radius: 20px;
    width: 261px;
    height: 80px;
  }

  .letsStart__border[data-isopen='true'] {
    height: 418px;
    width: 348px;
  }

  .letsStart__card {
    background: var(--prime-500);
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 237px;
    height: 56px;
    border-radius: 8px;
  }

  .letsStart__card[data-isopen='true'] {
    height: 370px;
    width: 300px;
    padding: 12px;
  }

  .letsStart__title {
    color: var(--dark-900);
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    padding-top: 12px;
    margin-bottom: 16px;
  }

  .letsStart__content {
    position: relative;
  }

  .filterPage__buttons {
    padding: 16px;
    font-size: 13px;
    font-weight: 400;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .filterPage__cancel {
    padding: 8px 16px;
    border: 1px solid var(--dark-900);
    color: var(--dark-900);
    border-radius: 8px;
    cursor: pointer;
  }

  .filterPage__ok {
    padding: 8px 16px;
    color: var(--light-100);
    font-weight: 300;
    background-color: var(--dark-900);
    border: 1px solid var(--dark-900);
    border-radius: 8px;
    cursor: pointer;
  }

  .filterPage__cancel:active {
    transform: scale(0.9);
  }

  .filterPage__ok:active {
    transform: scale(0.9);
  }
`;
