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
    player : number | string | null
}

export interface ILoginResponse {
    token : string,
    userDetails : ICreatePlayer
}

export interface IResponse<T> {
    totalCount : number,
    data : T[]
}