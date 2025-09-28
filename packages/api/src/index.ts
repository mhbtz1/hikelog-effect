import { Effect, Schema as S, Layer, Context } from 'effect';
import { HttpApiGroup, HttpApi, HttpApiEndpoint } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { createServer } from 'node:http';
import { createSupabase } from '@supabase/supabase-js'

const supabase = createSupabase(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

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


const makeHikeServiceRepo = Effect.gen(function* () {
    function submitHike() {
        return Effect.gen(function* () {
            return {
                hikeId: '123'
            }
        }).pipe(Effect.catchAll(() => Effect.fail({ message: 'Failed to submit hike' })))
    }

    return {
        submitHike
    }
})

const HikeApi = HttpApi.make("HttpApi").add(
    HttpApiGroup.make("submitHike").add(
        HttpApiEndpoint.post("submitHike")`/submitHike`.setPayload(Hike).setHeaders(HikeHeaders).addSuccess(HikeSuccess).addError(HikeError, { status: 400 })
    )
)

class HikeService extends Effect.Tag("HikeService")<
    HikeService,
    {
        submitHike: Effect.Effect<typeof HikeSuccess.Type, typeof HikeError.Type>
    }
>() {
    static readonly Live = Layer.effect(this, makeHikeServiceRepo)
}

