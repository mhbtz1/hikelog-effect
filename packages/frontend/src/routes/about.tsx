import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@radix-ui/themes'
import Map from '../Map';
export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {

    return (<aside>
        <div>
            <p className="text-muted text-sm text-gray-500 font-medium"> This is Hikelog, an application for storing and sharing hikes with your
                friends. </p>
        </div>
    </aside>)
}
