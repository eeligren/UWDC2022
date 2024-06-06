export default function UsedTechnologiesCard({statistics}) {
    return (
        <div className={'bg-slate-700 p-4 rounded'}>
            <p>Used technologies</p>
            <div className={'py-5 flex flex-wrap gap-2'}>
                {statistics?.used_technologies?.map((tech) => (
                    <p key={tech[0]} className={'bg-blue-700 px-2 py-1 text-sm rounded inline'}>{tech[0]}<span
                        className={'font-bold'}> {tech[1]}</span></p>
                ))}
            </div>
        </div>
    );
}
