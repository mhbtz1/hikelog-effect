import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@radix-ui/themes'
import Map from '../Map';
export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {

    return (<aside>
        <Map />
    </aside>)
}
