import {Check, X} from 'lucide-react';
import {useEffect} from "react";

/*
Alert message, dissapears automaticly after 5 seconds or X button press
 */
export default function Alert({message, setMessage}) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage('');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [message]);

    if(message)
        return (
            <div className={'fixed right-0 top-12 bg-slate-950 p-4 px-6 rounded-l-md z-50 flex items-center gap-4'}>
                <Check />
                <p>{message}</p>
                <button onClick={() => setMessage('')}>
                    <X />
                </button>
            </div>
        );
}
