/// <reference types="Cypress" />

import * as signIn from '../page_objects/sign_in.page'
import * as topMovies from '../page_objects/top_movies.page'

context('The IMDb top movies list', () => {
  before(() => {
    // logs in to IMDb with test user
    cy.visit('/registration/signin')
    signIn.clickSignInWWithIMDbButton()
    cy.fixture('user').then(json => {
      signIn.signInUser(json.userEmail, json.password, json.userName)
    })
    cy.visit('/chart/top?ref_=nv_mv_250_6')
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sess-at-main')
  });

  it('Top rated movies list should be present', () => {
    topMovies.shouldHaveHeaderTitle('Top Rated Movies')
    topMovies.movieTableListShouldBePresent()
  });

  it('Each entry of movie list should have rank number, movie poster, movie title, release year, imdb rating, user rating, and add to watchlist button', () => {
    topMovies.movieRowsShouldContainColumns()
  });

  it('Switches sorting order from aascending to desscending order and vice-versa', () => {
    topMovies.reverseSortingOrder()
    topMovies.topOfTheListRankShouldBe('250')
    topMovies.bottomOfTheListRankShouldBe('1')
    topMovies.reverseSortingOrder()
    topMovies.topOfTheListRankShouldBe('1')
    topMovies.bottomOfTheListRankShouldBe('250')
  });

  it('Adds and removes a movie from the watchlist', () => {
    topMovies.addMovieToWatchList(1)
    topMovies.removeMovieFromWatchList(1)
  });
});