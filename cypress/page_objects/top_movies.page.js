/// <reference types="Cypress" />

export const selectors = {
  articleContainer: '.article',
  h1Header: 'h1.header',
  movieTableList: 'table[data-caller-name="chart-top250movie"]',
  tableRow: 'tr',
  posterColumn: '.posterColumn',
  titleColumn: '.titleColumn',
  secondaryInfo: '.secondaryInfo',
  ratingColumn: '.ratingColumn',
  imdbRatingColumn: '.imdbRating',
  watchListColumn: '.watchlistColumn',
  listSortReverser: '.lister-sort-reverse',
  inWatchList: '.inWL',
  notInWatchList: '.not-inWL'
}

export const shouldHaveHeaderTitle = (title) => {
  cy.get(selectors.articleContainer).eq(1).within($container => {
    cy.get(selectors.h1Header).invoke('text').should('equal', title)
  })
}

export const movieTableListShouldBePresent = () => {
  cy.get(selectors.articleContainer).eq(1).within($container => {
    cy.get(selectors.movieTableList).should('be.visible')
    cy.get(selectors.tableRow).should('have.length', 251)
  })
}

export const tableRowShouldContainMoviePoster = () => {
  cy.get(selectors.posterColumn).should('have.length', 250)
}

export const tableRowShouldContainMovieTitle = () => {
  cy.get(selectors.titleColumn).should('have.length', 250)
}

export const tableRowShouldContainReleaseDate = () => {
  cy.get(selectors.secondaryInfo).should('have.length', 250)
}

export const tableRowShouldContainIMDbRating = () => {
  cy.get(selectors.imdbRatingColumn).should('have.length', 250)
}

export const tableRowShouldContainUserRatingColumn = () => {
  cy.get(selectors.ratingColumn).should('have.length', 500)
}

export const tableRowShouldContainAddToWatchlistColumn = () => {
  cy.get(selectors.watchListColumn).should('have.length', 250)
}

export const movieRowsShouldContainColumns = () => {
  cy.get(selectors.movieTableList).within($table => {
    tableRowShouldContainMoviePoster()
    tableRowShouldContainMovieTitle()
    tableRowShouldContainReleaseDate()
    tableRowShouldContainIMDbRating()
    tableRowShouldContainUserRatingColumn()
    tableRowShouldContainAddToWatchlistColumn()
  })
}

export const reverseSortingOrder = () => {
  cy.get(selectors.listSortReverser).click()
}

const nThElementOfTheListRankShouldBe = (nthElement, rank) => {
  cy.get(selectors.movieTableList).within($table => {
    cy.get(selectors.tableRow).eq(nthElement).within($row => {
      cy.get(selectors.titleColumn).invoke('text').then(titleString => {
        const movieRank = titleString.split('.')[0].trim()
        expect(movieRank).to.eq(rank)
      })
    })
  })
}

export const topOfTheListRankShouldBe = (rank) => {
  nThElementOfTheListRankShouldBe(1, rank)
}

export const bottomOfTheListRankShouldBe = (rank) => {
  nThElementOfTheListRankShouldBe(250, rank)
}

export const addMovieToWatchList = (moviePosition) => {
  cy.server()
  cy.route('PUT', '/watchlist/*').as('changeWatchList')

  cy.get(selectors.movieTableList).within($table => {
    cy.get(selectors.tableRow).eq(moviePosition).within($row => {
      cy.get(selectors.notInWatchList).click().wait('@changeWatchList').then(xhr => {
        expect(xhr.status).to.eql(200)
      })
      cy.get(selectors.inWatchList).should('be.visible')
    })
  })
}

export const removeMovieFromWatchList = (moviePosition) => {
  cy.server()
  cy.route('PUT', '/watchlist/*').as('changeWatchList')

  cy.get(selectors.movieTableList).within($table => {
    cy.get(selectors.tableRow).eq(moviePosition).within($row => {
      cy.get(selectors.inWatchList).click().wait('@changeWatchList').then(xhr => {
        expect(xhr.status).to.eql(200)
      })
      cy.get(selectors.notInWatchList).should('be.visible')
    })
  })
}