import { Effect, Schema as S, Layer, Context } from 'effect';
import { HttpRouter } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { createServer } from 'node:http';
// import { createSupabase } from '@supabase/supabase-js'
import { Rpc, RpcServer, RpcSerialization } from '@effect/rpc'
import { HikeRpc } from './requests.js'


//const supabase = createSupabase(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)



const makeHikeServiceRepo = Effect.gen(function* () {
    return {
        submitHike: (name: string, email: string, hikeLocation: string, hikeRating: number, hikeDifficulty: string) => Effect.gen(function* () {
            return {
                hikeId: '123'
            }
        }).pipe(Effect.catchAll(() => Effect.fail({ message: 'Failed to submit hike' })))
    }
})


class HikeRepo extends Effect.Service<HikeRepo>()(
    "HikeRepo",
    {
        effect: makeHikeServiceRepo
    }
) { }

export const HikeLive: Layer.Layer<Rpc.Handler<"HikeSubmit">, never, never> = HikeRpc.toLayer(
    Effect.gen(function* () {
        const hikeRepo = yield* HikeRepo;
        return {
            HikeSubmit: ({ name, email, hikeLocation, hikeRating, hikeDifficulty }) => hikeRepo.submitHike(name, email, hikeLocation, hikeRating, hikeDifficulty)
        }
    })
).pipe(Layer.provide(HikeRepo.Default))

const RpcLayer = RpcServer.layer(HikeRpc).pipe(Layer.provide(HikeLive))
const HttpProtocol = RpcServer.layerProtocolHttp({
    path: '/rpc'
}).pipe(Layer.provide(RpcSerialization.layerNdjson))

const Main = HttpRouter.Default.serve().pipe(
    Layer.provide(RpcLayer),
    Layer.provide(HttpProtocol),
    Layer.provide(NodeHttpServer.layer(createServer, { port: 5445 }))
)

Layer.launch(Main).pipe(NodeRuntime.runMain)
