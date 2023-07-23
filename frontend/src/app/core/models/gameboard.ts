export interface ITournamentDetails {
    tournamentName : string,
    tournamentDetails : string,
    tournamentCategory : {
        categoryId : string,
        categoryName : string
    },
    wordsCount : number,
    tournamentPrizes : Array<number>,
    words : {
        wordId : string,
        word : string,
        hint : string
    }[]
}

export interface IScore {
    playerId : string,
    tournamentId : string,
    categoryId : string,
    score : number
}