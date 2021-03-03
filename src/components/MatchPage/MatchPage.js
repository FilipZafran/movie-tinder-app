import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './MatchPage.css';
import { MatchCard } from './MatchCard';
import { ShotsButton, SkipButton } from '../styleElements/buttons';
import { TopNav } from '../TopNav';
import { CirclesBackground } from '../styleElements/CirclesBackground';
import { FilterPage } from '../FilterPage';
import { MatchNotification } from '../MatchNotification';
import { selectCurrent } from '../../Redux/moviesSlice';

export function MatchPage() {
  //verdict indicates which button is active
  const [verdict, setVerdict] = useState('neutral');

  //decision indicates the final decision of the user
  const [decision, setDecision] = useState('neutral');

  //whether filterMenu is displayed or not
  const [displayFilters, setDisplayFilters] = useState(false);

  const toggleDisplayFilters = () => setDisplayFilters(!displayFilters);

  //sets buttons from neutral to inactive based on if the opposite button is selected
  const likeActive = verdict === 'like' ? true : false;
  const dislikeActive = verdict === 'dislike' ? true : false;

  //on mouseDown sets verdict
  const clickHandler = (input) => () => setVerdict(input);

  //on mouseUp sets decision
  const otherClickHandler = (input) => () => setDecision(input);

  //the final decision is reset to neutral when a new card is displayed
  const reset = () => {
    setDecision('neutral');
    setVerdict('neutral');
  };

  //sets the verdict to 'neutral' when the click is released
  const onMouseUp = () => {
    setVerdict('neutral');
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  //check if currentFilm is empty
  const currentFilm = useSelector(selectCurrent);

  const selectButtons = currentFilm['title'] ? (
    <div className="matchPage__buttons">
      <ShotsButton
        inactive={likeActive}
        active={dislikeActive}
        clickHandler={clickHandler}
        otherClickHandler={otherClickHandler}
      />
      <div className="matchPage__skipButton">
        <SkipButton inactive={!currentFilm['title']} />
      </div>
      <ShotsButton
        like
        active={likeActive}
        inactive={dislikeActive}
        clickHandler={clickHandler}
        otherClickHandler={otherClickHandler}
      />
    </div>
  ) : (
    <div className="matchPage__buttons">
      <ShotsButton
        active={false}
        inactive={true}
        clickHandler={() => {}}
        otherClickHandler={() => {}}
      />
      <div className="matchPage__skipButton">
        <SkipButton inactive={!currentFilm['title']} />
      </div>
      <ShotsButton
        like
        active={false}
        inactive={true}
        clickHandler={() => {}}
        otherClickHandler={() => {}}
      />
    </div>
  );

  //create useEffect that finds the location of the buttons on mount
  //when the mouse or touch is no longer over the button, the verdict changes to 'neutral'
  //decision is only set when a mouseUp or touchEnd event happens while over a button

  return (
    <div className="matchPage">
      <CirclesBackground />
      <FilterPage
        hidden={!displayFilters}
        seeFilters={displayFilters}
        toggle={toggleDisplayFilters}
      />
      <MatchNotification decision={decision} />
      <TopNav backIcon dark filterIcon displayFilters={toggleDisplayFilters} />
      <div className="matchPage__content">
        <MatchCard reset={reset} decision={decision} />
        {selectButtons}
      </div>
    </div>
  );
}
