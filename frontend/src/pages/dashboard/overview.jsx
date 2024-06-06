import {useAuth} from "../../contexts/authContext.jsx";
import {Outlet, useNavigate} from "react-router";
import update from 'immutability-helper'
import {useCallback, useEffect, useState} from "react";
import api from "../../utils/axios.js";
import Last12Months from "../../components/charts/last-12-months.jsx";
import WorkingHoursCard from "../../components/working-hours-card.jsx";
import UsedTechnologiesCard from "../../components/used-technologies-card.jsx";
import Card from "../../components/card.jsx";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import DataTable from 'react-data-table-component';
import TrainingSessionsTable from "../../components/datatables/training-sessions-table.jsx";
import AddNewSidebar from "../../components/add-new-sidebar.jsx";
import {Plus} from "lucide-react";
import Alert from "../../components/alert.jsx";

export default function OverviewPage() {
    const [statistics, setStatistics] = useState({});
    const [addNew, setAddNew] = useState(true);
    const [sessions, setSessions] = useState([]);
    const { user, logout } = useAuth();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([
        { id: '1', content: 'WorkingHoursCard' },
        { id: '2', content: 'Last12Months' },
        { id: '3', content: 'UsedTechnologiesCard' },
    ]);

    useEffect(() => {
        getStatistics();
        getSessions();
        const savedOrder = localStorage.getItem('cardOrder');
        if (savedOrder) {
            setCards(JSON.parse(savedOrder));
        }
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

    const getSessions = async () => {
        setIsLoading(true)
        try {
            const { data } = await api.get('/training-sessions');
            console.log(data);
            setSessions(data);
        } catch (e) {
            console.log(e);
            alert("Couldn't fetch sessions.")
        }
        setIsLoading(false)
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedCards = Array.from(cards);
        const [movedCard] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, movedCard);

        setCards(reorderedCards);
        localStorage.setItem('cardOrder', JSON.stringify(reorderedCards));
    };

    if(isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <>
            <Alert message={message} setMessage={setMessage} />
            <header className="p-4 bg-slate-700 flex items-center justify-between">
                <div>
                    <button
                        className="py-2 px-4 border rounded-md uppercase font-semibold text-sm flex items-center gap-2"
                        onClick={() => setAddNew(true)}><Plus/> ADD NEW
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm">competitor</p>
                    </div>
                    <button className="py-2 px-4 border rounded-md uppercase font-semibold text-sm"
                            onClick={logout}>Sign
                        Out
                    </button>
                </div>
            </header>
            <main className={'p-12'}>
                <div className={'grid grid-cols-4 gap-12'}>
                    <AddNewSidebar open={addNew} close={() => setAddNew(false)} callback={() => {  getSessions(); getStatistics(); setMessage('Entry added successfully') }}/>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="cards">
                            {(provided) => (
                                <div className={'space-y-4'} {...provided.droppableProps} ref={provided.innerRef}>
                                    {cards.map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Card>
                                                        {card.content === 'WorkingHoursCard' &&
                                                            <WorkingHoursCard statistics={statistics}/>}
                                                        {card.content === 'Last12Months' &&
                                                            <Last12Months last_12_months={statistics?.last_12_months}/>}
                                                        {card.content === 'UsedTechnologiesCard' &&
                                                            <UsedTechnologiesCard statistics={statistics}/>}
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className={'col-span-3'}><TrainingSessionsTable sessions={sessions}/></div>
                </div>
            </main>
        </>
    )
}
