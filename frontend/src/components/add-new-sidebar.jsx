import { X } from 'lucide-react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import api from "../utils/axios.js";

const schema = z.object({
    date: z.string().min(1, { message: 'Date is required' })
})

export default function AddNewSidebar({open, close, edit, callback}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    });

    const submit = async (values) => {
        try {
            await api.post('/training-sessions', {
                date: values.date,
                type_id: 1,
                category_id: 1,
                time_spent: 1,
                notes: 'sdds',
                tags: [1, 2]
            });
            callback();
            close();
        } catch (e) {
            console.log(e)
            alert("Couldn't create/edit entry.")
        }
    }

    if(open)
        return (
            <>
                <div className={'fixed top-0 left-0 w-full h-screen bg-slate-900 bg-opacity-80 z-10'}></div>
                <div className={'fixed top-0 left-0 h-screen w-[350px] bg-slate-600 z-50 p-6'}>
                    <div className={'mb-6 flex items-center justify-between'}>
                        <p className={'text-xl font-semibold'}>{edit ? 'Edit entry' : 'Add new entry'}</p>
                        <button onClick={close}><X /></button>
                    </div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col gap-1 mb-2">
                            <label htmlFor="date" className="font-semibold">Date *</label>
                            <input type="date" name="date" id="date" placeholder="Date"
                                   className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('date')}/>
                            {errors?.date && (<p className={'text-red-600'}>{errors.date.message}</p>)}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="type" className="font-semibold">Notes</label>
                            <input type="text" name="notes" id="notes"
                                   className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('notes')}/>
                            {errors?.notes && (<p className={'text-red-600'}>{errors.notes.message}</p>)}
                        </div>
                        <button
                            className="w-full p-2 mt-4 rounded-md border-2 bg-blue-500 text-white font-semibold border-blue-500">ADD ENTRY
                        </button>
                    </form>
                </div>
            </>

        );
}
