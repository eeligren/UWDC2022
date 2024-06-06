export default function WorkingHoursCard({statistics}) {
    return (
        <div className={'bg-slate-700 p-4 rounded'}>
            <p>Logged working hours</p>
            <div className={'flex justify-between px-12 py-6'}>
                <div className={'text-center'}>
                    <p className={'font-semibold text-3xl'}>{statistics?.working_hours?.total} h</p>
                    <p className={'font-semibold text-gray-400'}>Total</p>
                </div>
                <div className={'text-center'}>
                    <p className={'font-semibold text-3xl'}>{statistics?.working_hours?.last_month} h</p>
                    <p className={'font-semibold text-gray-400'}>Last month</p>
                </div>
            </div>
        </div>
    );
}
