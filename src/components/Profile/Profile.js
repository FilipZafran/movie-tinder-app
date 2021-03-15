import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { ChevronRight } from '../styleElements/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/userSlice';
import { selectLikes } from '../../Redux/likeTrackerSlice';
import Avatar from '../styleElements/avatar/Avatar.js';
import { ProfileTile } from './ProfileTile';
import { ProfileTopNav } from './ProfileTopNav';
import { ProfileLists } from './ProfileLists';

const Container = styled.div`
  position: relative;
  padding-bottom: 140px;
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: 0px;
  z-index: -1;
`;

const Footer = styled.div`
  width: 100vw;
  hr {
    color: var(--dark-300);
  }
`;

const FooterEntry = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
  div {
    margin-right: 20px;
  }
  h1 {
    font-size: 18px;
    font-weight: 400;
    color: var(--light-300);
    margin-left: 20px;
  }
`;

export function Profile() {
  const dispatch = useDispatch();

  const likesArray = useSelector(selectLikes);

  const topMatches = [
    {
      film: {
        id: 'tt0468569',
        rank: '4',
        title: 'The Dark Knight',
        fullTitle: 'The Dark Knight (2008)',
        year: '2008',
        image:
          'https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Christopher Nolan (dir.), Christian Bale, Heath Ledger',
        imDbRating: '9.0',
        imDbRatingCount: '2269138',
      },
    },
    {
      film: {
        id: 'tt0050083',
        rank: '5',
        title: '12 Angry Men',
        fullTitle: '12 Angry Men (1957)',
        year: '1957',
        image:
          'https://imdb-api.com/images/original/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Sidney Lumet (dir.), Henry Fonda, Lee J. Cobb',
        imDbRating: '8.9',
        imDbRatingCount: '677818',
      },
    },
    {
      film: {
        id: 'tt0108052',
        rank: '6',
        title: 'Schindlers List',
        fullTitle: 'Schindlers List (1993)',
        year: '1993',
        image:
          'https://imdb-api.com/images/original/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Steven Spielberg (dir.), Liam Neeson, Ralph Fiennes',
        imDbRating: '8.9',
        imDbRatingCount: '1196343',
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Container>
      <AvatarContainer>
        <Avatar />
      </AvatarContainer>

      <ProfileTopNav />

      <ProfileTile />

      <ProfileLists filmArray={likesArray} listTitle={'Likes'} />
      <ProfileLists filmArray={topMatches} listTitle={'Top Matches'} />

      <Footer>
        <Link to="/dashboard/users">
          <FooterEntry>
            <h1>Friends</h1>
            <div>
              <ChevronRight />
            </div>
          </FooterEntry>
          <hr />
        </Link>

        <Link to="/dashboard/chat">
          <FooterEntry>
            <h1>My Black List</h1>
            <div>
              <ChevronRight />
            </div>
          </FooterEntry>
          <hr />
        </Link>
      </Footer>
    </Container>
  );
}
