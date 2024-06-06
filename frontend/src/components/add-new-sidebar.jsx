import { X } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import api from "../utils/axios.js";
import { useEffect, useState } from "react";

const schema = z.object({
    date: z.string().min(1, { message: 'Date is required' }),
    time_spent: z.string(),
    notes: z.string().optional()
});

export default function AddNewSidebar({ open, close, edit, callback, setEdit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: zodResolver(schema)
    });

    const [createData, setCreateData] = useState({});

    useEffect(() => {
        getCreateData();
    }, []);

    const getCreateData = async () => {
        try {
            const { data } = await api.get('/creation-data');
            setCreateData(data);

            if (data.types && data.types.length > 0) {
                setTypeValue(data.types[0].id);
            }
            if (data.categories && data.categories.length > 0) {
                setCategoryValue(data.categories[0].id);
            }
        } catch (e) {
            alert("Couldn't fetch creation data!");
        }
    };

    const submit = async (values) => {
        console.log('Form values:', values); // Debugging: Check form values
        try {
            const response = await api.post('/training-sessions', {
                date: values.date,
                type_id: typeValue,
                category_id: categoryValue,
                new_category: newCategoryText,
                new_type: newTypeText,
                time_spent: values.time_spent,
                notes: values.notes,
                tags: [1, 2] // Replace with actual tags if necessary
            });
            console.log('API Response:', response.data);
            callback();
            close();
        } catch (e) {
            console.log('Submission Error:', e);
            alert("Couldn't create/edit entry.");
        }
    };

    const [newType, setNewType] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [newTypeText, setNewTypeText] = useState('');
    const [newCategoryText, setNewCategoryText] = useState('');
    const [typeValue, setTypeValue] = useState(null);
    const [categoryValue, setCategoryValue] = useState(null);

    if (open)
        return (
            <>
                <div className={'fixed top-0 left-0 w-full h-screen bg-slate-900 bg-opacity-80 z-10'}></div>
                <div className={'fixed top-0 left-0 h-screen w-[350px] bg-slate-600 z-50 p-6'}>
                    <div className={'mb-6 flex items-center justify-between'}>
                        <p className={'text-xl font-semibold'}>{edit ? 'Edit entry' : 'Add new entry'}</p>
                        <button onClick={() => { close(); setEdit(null); }}><X /></button>
                    </div>

                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col gap-1 mb-2">
                            <label htmlFor="date" className="font-semibold">Date *</label>
                            <input type="date" name="date" id="date" placeholder="Date"
                                   className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('date')} />
                            {errors?.date && (<p className={'text-red-600'}>{errors.date.message}</p>)}
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <div className={'flex justify-between items-center'}>
                                <label htmlFor="type_id" className="font-semibold">Type *</label>
                                <button type={'button'} onClick={() => setNewType(!newType)}
                                        className={'text-blue-300 font-semibold'}>{newType ? 'Select type' : 'Create new'}</button>
                            </div>
                            {newType ? (
                                <>
                                    <input type="text" name="new_type" id="new_type" placeholder="Type name"
                                           className="text-black w-full p-2 rounded-md border-2 border-gray-500"  value={newTypeText} onChange={(event) => setNewTypeText(event.target.value)} />
                                    {errors?.new_type && (<p className={'text-red-600'}>{errors.new_type.message}</p>)}
                                </>
                            ) : (
                                <>
                                    <select id={'type_id'}
                                            className={'text-black w-full p-2 rounded-md border-2 border-gray-500'} value={typeValue} onChange={(event) => setTypeValue(event.target.value)} defaultValue={createData?.types?.[0]?.id}>
                                        {createData?.types?.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                    {errors?.type_id && (<p className={'text-red-600'}>{errors.type_id.message}</p>)}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <div className={'flex justify-between items-center'}>
                                <label htmlFor="category_id" className="font-semibold">Category *</label>
                                <button type={'button'} onClick={() => setNewCategory(!newCategory)}
                                        className={'text-blue-300 font-semibold'}>{newCategory ? 'Select category' : 'Create new'}</button>
                            </div>
                            {newCategory ? (
                                <>
                                    <input type="text" name="new_category" id="new_category" placeholder="Category name"
                                           className="text-black w-full p-2 rounded-md border-2 border-gray-500" value={newCategoryText} onChange={(event) => setNewCategoryText(event.target.value)} />
                                </>
                            ) : (
                                <>
                                    <select id={'category_id'}
                                            className={'text-black w-full p-2 rounded-md border-2 border-gray-500'}  value={categoryValue} onChange={(event) => setCategoryValue(event.target.value)} defaultValue={createData?.categories?.[0]?.id}>
                                        {createData?.categories?.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {errors?.category_id && (<p className={'text-red-600'}>{errors.category_id.message}</p>)}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <label htmlFor="time_spent" className="font-semibold">Spent time *</label>
                            <input type="number" name="time_spent" id="time_spent" step="0.1" placeholder="4 h"
                                   className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('time_spent')} />
                            {errors?.time_spent && (<p className={'text-red-600'}>{errors.time_spent.message}</p>)}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="notes" className="font-semibold">Notes</label>
                            <input type="text" name="notes" id="notes"
                                   className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('notes')} />
                            {errors?.notes && (<p className={'text-red-600'}>{errors.notes.message}</p>)}
                        </div>
                        <button type={'submit'}
                                className="w-full p-2 mt-4 rounded-md border-2 bg-blue-500 text-white font-semibold border-blue-500">ADD
                            ENTRY
                        </button>
                    </form>
                </div>
            </>
        );
}
