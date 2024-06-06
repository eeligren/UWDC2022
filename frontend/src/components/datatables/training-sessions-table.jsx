import DataTable, {createTheme} from "react-data-table-component";
import {Pencil} from "lucide-react";

createTheme('solarized', {
    text: {
        primary: '#fff',
        secondary: '#2aa198',
    },
    background: {
        default: '#334155',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');

export default function TrainingSessionsTable({sessions, edit}) {
    const columns = [
        {
            name: 'DATE',
            selector: row => (
                new Date(row.created_at).toLocaleDateString()
            ),
            sortable: true,
            width: '150px'
        },
        {
            name: 'TYPE',
            selector: row => row.type.name,
            sortable: true,
            width: '150px'
        },
        {
            name: 'CATEGORY',
            selector: row => row.category.name,
            sortable: true,
            width: '150px'
        },
        {
            name: 'TIME',
            selector: row => row.time_spent + ' h',
            sortable: true,
            width: '80px'
        },
        {
            name: 'NOTES',
            selector: row => row.notes
        },
        {
            name: 'TAGS',
            selector: row => (
                <div className={'flex gap-1'}>
                    {row.tags.map((tag, index) => (
                        <p key={index} className={'bg-blue-700 px-2 py-1 text-sm rounded inline'}>
                            {tag.tag}
                        </p>
                    ))}
                </div>
            )
        },
        {
            name: 'ACTIONS',
            selector: row => (
                <button className={'px-4'} onClick={() => edit(row)}><Pencil className={'w-5 h-5'}/></button>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            responsive={true}
            data={sessions}
            theme="solarized"
        />
    );
}
