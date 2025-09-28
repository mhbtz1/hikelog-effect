import { createFileRoute } from '@tanstack/react-router'
import HikeForm from '../components/CoreHikeForm'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
export const Route = createFileRoute('/loghike')({
    component: LogHikeComponent
})

const queryClient = new QueryClient()

function LogHikeComponent() {

    return <QueryClientProvider client={queryClient}>
        <HikeForm />
    </QueryClientProvider>
}