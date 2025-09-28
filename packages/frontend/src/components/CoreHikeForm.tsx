import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'

const queryClient = new QueryClient()

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(',')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export default function HikeForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [hikeLocation, setHikeLocation] = useState('')
    const [hikeRating, setHikeRating] = useState('')
    const [hikeDifficulty, setHikeDifficulty] = useState('')

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['hike', { name, email, hikeLocation, hikeRating, hikeDifficulty }],
        queryFn: async () => {
            const response = await fetch('/api/hike', {
                method: 'POST',
                body: JSON.stringify({ name, email, hikeLocation, hikeRating, hikeDifficulty })
            })
        }
    })
    const formFields = useRef(['name', 'email', 'hikeLocation', 'hikeRating', 'hikeDifficulty']
    )

    const form = useForm({
        defaultValues: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            hikeLocation: '',
            hikeRating: '',
            hikeDifficulty: '',
        },
        onSubmit: async ({ formApi, value }) => {

        }
    })

    return <form onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit()
    }}>
        <div className="flex flex-col gap-2 w-full">
            {formFields.current.map((x: string) => {
                return <div>
                    <form.Field name={x as any} validators={{
                        onChangeAsyncDebounceMs: 500,
                    }}
                        children={(field) => {
                            return (
                                <>
                                    <label htmlFor={field.name}> {x} </label>
                                    <input type="text" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                                </>
                            )
                        }}
                    />
                </div>
            })}
        </div>
    </form>
}