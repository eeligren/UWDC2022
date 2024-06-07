import {useEffect, useState} from "react";
import api from "../../utils/axios.js";
import WorkingHoursCard from "../../components/working-hours-card.jsx";
import Last12Months from "../../components/charts/last-12-months.jsx";
import UsedTechnologiesCard from "../../components/used-technologies-card.jsx";
import TrainingSessionsTable from "../../components/datatables/training-sessions-table.jsx";

export default function ExpertView() {
    const [competitors, setCompetitors] = useState([]);
    const [competitor, setCompetitor] = useState(null);

    useEffect(() => {
        getCompetitors();
    }, []);

    const getCompetitors = async () => {
        try {
            const { data } = await api.get('/competitors');
            setCompetitors(data.competitors);
        } catch (e) {
            alert("Couldn't fetch competitors")
        }
    }

    return (
        <>
        {competitor ? (
            <div className={'w-full'}>
                <button className={'mb-6 p-2 bg-blue-500 rounded px-4'} onClick={() => setCompetitor(null)}>Back</button>
                <div className={'grid w-full grid-cols-4 gap-4'}>
                    <div className={'text-left'}>
                        <div className={'p-4 bg-slate-800 text-white font-semibold text-xl'}>
                            {competitor.name}
                        </div>
                        <div>
                            <WorkingHoursCard statistics={competitor}/>
                        </div>
                        <div>
                            <Last12Months last_12_months={competitor?.last_12_months}/>
                        </div>
                        <div>
                            <UsedTechnologiesCard statistics={competitor}/>
                        </div>
                    </div>
                    <div className={'w-full col-span-3'}>
                        <TrainingSessionsTable sessions={competitor.sessions} disableEdit={true}/>
                    </div>
                </div>
            </div>
        ) : (
            <div className={'flex gap-4'}>
                {competitors.map((competitor, index) => (
                    <button key={index} onClick={() => setCompetitor(competitor)} className={'text-left w-[400px]'}>
                        <div className={'p-4 bg-slate-800 text-white font-semibold text-xl'}>
                            {competitor.name}
                        </div>
                        <div>
                            <WorkingHoursCard statistics={competitor}/>
                        </div>
                        <div>
                        <Last12Months last_12_months={competitor?.last_12_months}/>
                        </div>
                        <div>
                                <UsedTechnologiesCard statistics={competitor}/>
                            </div>
                        </button>
                    ))}
                </div>
            )
        }
        </>
    );
}
