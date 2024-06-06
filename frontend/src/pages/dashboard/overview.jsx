import {useAuth} from "../../contexts/authContext.jsx";
import {useNavigate} from "react-router";
import update from 'immutability-helper'
import {useCallback, useEffect, useState} from "react";
import api from "../../utils/axios.js";
import Last12Months from "../../components/charts/last-12-months.jsx";
import WorkingHoursCard from "../../components/working-hours-card.jsx";
import UsedTechnologiesCard from "../../components/used-technologies-card.jsx";

export default function OverviewPage() {
    const [statistics, setStatistics] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [cardOrder, setCardOrder] = useState();

    useEffect(() => {
        getStatistics()
    }, []);

    const getStatistics = async () => {
        setIsLoading(true)
        try {
            const { data } = await api.get('/statistics');
            console.log(data);
            setStatistics(data);
        } catch (e) {
            console.log(e);
            alert("Couldn't fetch statistics.")
        }
        setIsLoading(false)
    }

    if(isLoading) {
        return (<p>Loading...</p>)
    }


    return (
        <div className={'grid grid-cols-4 gap-12'}>
            {cardOrder}
            <div className={'space-y-4'}>
                <WorkingHoursCard statistics={statistics}></WorkingHoursCard>
                <Last12Months last_12_months={statistics?.last_12_months} />
                <UsedTechnologiesCard statistics={statistics}></UsedTechnologiesCard>
            </div>
            <div className={'col-span-3'}>sd</div>
        </div>
    )
}
