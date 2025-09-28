import { useForm, type AnyFieldApi } from '@tanstack/react-form'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import Map from '../Map'



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
            const response = await fetch('http://localhost:5432/rpc/HikeSubmit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/layerndjson' },
                body: JSON.stringify({ name: value.name, email: value.email, hikeLocation: value.hikeLocation, hikeRating: value.hikeRating, hikeDifficulty: value.hikeDifficulty })
            })
        }
    })

    return (
        <div className="w-full max-w-xl p-4">
            <div className="rounded-lg border border-black bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-semibold">Log a Hike</h2>
                <p className="mb-6 text-sm text-gray-600">Tell us a bit about your hike. All fields are optional.</p>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }} className="space-y-4 cursor-pointer">
                    {/* Location picker */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted font-medium text-gray-700">Map location</label>
                        <Map
                            height={200}
                            onSelect={(lat, lng) => {
                                const value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
                                form.setFieldValue('hikeLocation' as any, value)
                            }}
                        />
                        <span className="text-xs text-gray-500">Click the map to set the hike location.</span>
                    </div>
                    {formFields.current.map((fieldName: string) => (
                        <div key={fieldName} className="flex flex-col gap-1">
                            <form.Field
                                name={fieldName as any}
                                validators={{ onChangeAsyncDebounceMs: 500 }}
                            >
                                {(field) => {
                                    const commonInputClasses = "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    const labelMap: Record<string, string> = {
                                        name: "Full name",
                                        email: "Email",
                                        hikeLocation: "Hike location",
                                        hikeRating: "Rating (1-5)",
                                        hikeDifficulty: "Difficulty",
                                    }

                                    return (
                                        <>
                                            <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                                {labelMap[field.name] ?? fieldName}
                                            </label>

                                            {field.name === 'hikeDifficulty' ? (
                                                <select
                                                    id={field.name}
                                                    className={commonInputClasses}
                                                    value={field.state.value ?? ''}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                >
                                                    <option value="">Select difficulty</option>
                                                    <option value="easy">Easy</option>
                                                    <option value="moderate">Moderate</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            ) : field.name === 'hikeRating' ? (
                                                <input
                                                    id={field.name}
                                                    type="number"
                                                    inputMode="numeric"
                                                    min={1}
                                                    max={5}
                                                    placeholder="1 to 5"
                                                    className={commonInputClasses}
                                                    value={field.state.value ?? ''}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            ) : field.name === 'email' ? (
                                                <input
                                                    id={field.name}
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    className={commonInputClasses}
                                                    value={field.state.value ?? ''}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    id={field.name}
                                                    type="text"
                                                    placeholder={field.name === 'name' ? 'John Doe' : ''}
                                                    className={commonInputClasses}
                                                    value={field.state.value ?? ''}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            )}

                                            <span className="text-xs text-gray-500">
                                                {field.name === 'hikeRating' && 'Pick a number from 1 (lowest) to 5 (best).'}
                                            </span>
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            </form.Field>
                        </div>
                    ))}

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}