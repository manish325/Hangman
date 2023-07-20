export interface ITournamentDetails {
    tournamentName : string,
    tournamentDetails : string,
    tournamentCategory : string,
    wordsCount : number,
    tournamentPrizes : Array<number>,
    words : {
        wordId : string,
        word : string,
        hint : string
    }[]
}