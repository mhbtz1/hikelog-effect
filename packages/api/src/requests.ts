import { Rpc, RpcGroup } from '@effect/rpc';
import { Schema as S } from 'effect';

const Hike = S.Struct({
    name: S.String,
    email: S.String,
    hikeLocation: S.String,
    hikeRating: S.Number,
    hikeDifficulty: S.String,
})

const HikeSuccess = S.Struct({
    hikeId: S.UUID
})

const HikeHeaders = S.Struct({
    authorization: S.String,
})

const HikeError = S.Struct({
    message: S.String,
})

export class HikeRpc extends RpcGroup.make(
    Rpc.make("HikeSubmit", {
        success: HikeSuccess,
        payload: Hike,
        error: HikeError,
    })
) { }