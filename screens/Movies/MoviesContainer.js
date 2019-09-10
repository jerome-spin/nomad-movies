import React from 'react';
import MoviesPresenter from './MoviesPresenter';
import { movies } from '../../api';

export default class MoviesContainer extends React.Component {
  state = {
    loading: true,
    upcoming: null,
    popular: null,
    nowPlaying: null,
    error: null,
  };

  async componentDidMount() {
    let upcoming, popular, nowPlaying, error;

    try {
      ({
        data: { results: upcoming },
      } = await movies.getUpcoming());
      ({
        data: { results: popular },
      } = await movies.getPopular());
      ({
        data: { results: nowPlaying },
      } = await movies.getNowPlaying());
    } catch (error) {
      error = "Can't get Movies.";
    } finally {
      this.setState({ upcoming, popular, nowPlaying, error, loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    console.log('TCL: MoviesContainer -> render -> this.state', this.state);

    return <MoviesPresenter loading={loading} />;
  }
}
