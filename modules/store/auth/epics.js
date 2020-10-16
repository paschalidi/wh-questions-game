import { ofType } from 'redux-observable'
import {
    setAuthenticated,
    setUnauthenticated,
    startAuthListener,
} from './actions'
import { map, flatMap } from 'rxjs/operators'
import { authState } from 'rxfire/auth'

export const startAuthListenerEpic = (action$, _, { firebase$ }) =>
    action$.pipe(
        ofType(startAuthListener),
        flatMap(() => {
            return authState(firebase$.auth()).pipe(
                map(user => {
                    if (user) {
                        const { uuid, displayName } = user
                        return setAuthenticated({ uuid, displayName })
                    } else {
                        return setUnauthenticated()
                    }
                })
            )
        })
    )
