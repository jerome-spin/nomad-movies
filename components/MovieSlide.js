import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import MoviePoster from './MoviePoster';
import MovieRating from './MovieRating';
import makePhotoUrl from '../utils/makePhotoUrl';
import Layout from '../constants/Layout';
import { TINT_COLOR } from '../constants/Colors';

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const BgImage = styled.Image`
  width: ${Layout.width};
  height: ${Layout.height / 3};
  opacity: 0.3;
  position: absolute;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 30px;
  justify-content: space-between;
`;

const Column = styled.View`
  width: 60%;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: ${TINT_COLOR};
  font-size: 14px;
  font-weight: 600;
`;

const Overview = styled.Text`
  color: ${TINT_COLOR};
  font-size: 12px;
  margin-bottom: 10px;
`;

const VoteContainer = styled.View`
  margin: 10px 0px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #e74c3c;
  padding: 5px;
  border-radius: 2.5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const MovieSlide = ({
  id,
  posterPhoto,
  backgroundPhoto,
  title,
  voteAvg,
  overview,
  navigation,
}) => (
  <Container>
    <BgImage source={{ uri: makePhotoUrl(backgroundPhoto) }} />
    <Content>
      <MoviePoster path={posterPhoto} />
      <Column>
        <Title>{title}</Title>
        {voteAvg ? (
          <VoteContainer>
            <MovieRating votes={voteAvg} inSlide={true} />
          </VoteContainer>
        ) : null}
        {overview ? (
          <Overview>
            {overview.length > 117
              ? `${overview.substring(0, 120)}...`
              : overview}
          </Overview>
        ) : null}
        <ButtonContainer
          onPress={() =>
            navigation.navigate({
              routeName: 'Detail',
              params: {
                isMovie: true,
                id,
                posterPhoto,
                backgroundPhoto,
                title,
                voteAvg,
                overview,
              },
            })
          }
        >
          <ButtonText>More details</ButtonText>
        </ButtonContainer>
      </Column>
    </Content>
  </Container>
);

MovieSlide.propTypes = {
  id: PropTypes.number.isRequired,
  posterPhoto: PropTypes.string.isRequired,
  backgroundPhoto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  voteAvg: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

export default withNavigation(MovieSlide);
