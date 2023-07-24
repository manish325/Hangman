import { IGifts, ITournaments } from "./admin.model"

export interface INotification {
    notificationId ? : string,
    player : {
        playerId : string,
        playerName : string
    },
    tournament ? : ITournaments,
    gift ? : IGifts[],
    notificationStatus : -1 | 1 | 0
}

export const mockNotifications : INotification[] = [
    {
        notificationId : '1',
        player : {
            playerId : '1',
            playerName : 'Shikha J'
        },
        notificationStatus : -1,
        tournament : {
            tournamentName : 'Clash of Champions',
            tournamentCategory : 'some category',
            tournamentDetails : 'some details',
            tournamentPrizes : [1,2,3]
        }
    },
    {
        notificationId : '1',
        player : {
            playerId : '1',
            playerName : 'Sagar K'
        },
        notificationStatus : -1,
        gift : [
            {
                giftId : '1',
                giftName : 'some gift',
                giftValue : '400',
                quantity : '2'
            }
        ]
    },

    {
        notificationId : '1',
        player : {
            playerId : '1',
            playerName : 'Tejas L'
        },
        notificationStatus : -1,
        gift : [
            {
                giftId : '1',
                giftName : 'some gift',
                giftValue : '400',
                quantity : '2'
            },
            {
                giftId : '1',
                giftName : 'some gift',
                giftValue : '400',
                quantity : '2'
            }
        ]
    }


]