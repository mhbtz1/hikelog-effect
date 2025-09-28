import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/loghike')({
    component: LogHikeComponent
})


function LogHikeComponent() {
    return <div>LogHikeComponent</div>
}