export interface ICredentials {
    username : string,
    password : string
}

export interface ICreatePlayer {
    _id? : number,
    username : string,
    roles : string[],
    password? : string,
    about : {
        contactNumber : string,
        address : string
    },
    player ? : {
        playerId : string,
        playerName : string,
        earnedCoins : number,
        createdTournaments : number,
        playedTournaments : number,
        gifts : number

    }
}

export interface ILoginResponse {
    token : string,
    userDetails : ICreatePlayer
}


export interface ICoins {
    availableCoins? : number
}
export interface IResponse<T> extends ICoins {
    totalCount : number,
    data : T[],
}