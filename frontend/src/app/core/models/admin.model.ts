import { IPagination } from "./paginator"

export interface INavigationItem {
    name : string,
    icon : string,
    routerPath : string
}

export interface IPlayer {
    playerId ?: number,
    playerName : string,
    playedTournaments : number,
    totalScore : number,
    earnedCoins : number,
    password?: string,
    actions? : string[]
}

export interface IDisplayedColumns {
    displayName : string,
    useName : string
}

export interface ICategories {
    categoryId ? : number,
    categoryName : string,
    categoryDetails : string
}


export interface IAddUser {
    username ?: string,
    password : string,
    about : {
        contactNumber : number | string,
        address : string
    } | null,
    playerName ? : string
}

export interface ITournaments {
    tournamentId ? : number,
    tournamentName : string,
    tournamentDetails : string,
    tournamentCategory : string,
    tournamentPrizes : number[];
    words ? : {
        word : string,
        hint : string
    }[],
    playerId ? : string | any,
    played ?: boolean,
    score ? : number
}

export interface IGetTournaments extends IPagination {
    tournamentStatus : 0|1|-1,
    filter : {
        category : string,
        player : string
    },
    self ? : boolean
}

export interface IGifts {
    giftId ? : string,
    giftName : string,
    giftValue : string,
    quantity : string
}

export interface ILeaderboard {
    player : {
        playerId : string,
        playerName : string
    },
    tournament : {
        tournamentId : string,
        tournamentName : string
    },
    category : {
        categoryId : string,
        categoryName : string
    },
    score : number,
    tournamentsPlayed : number
}

export interface IGetLeaderboard extends IPagination {
    filter : {
        category : string,
        tournament : string
    }
}