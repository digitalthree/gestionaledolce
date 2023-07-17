import React, {useEffect} from 'react';
import {Gantt, Task, ViewMode} from "gantt-task-react";
import {ViewSwitcher} from "@/app/(shared)/diagrammaTemporale/components/ViewSwitcher";
import Profile from "@/app/(user)/marketing/components/UserProfile";
import {StandardTooltipContent} from "gantt-task-react/dist/components/other/tooltip";
import {BsFillCircleFill} from "react-icons/bs";
import Legend from "@/app/(shared)/diagrammaTemporale/components/Legend";
import {BiPlus} from "react-icons/bi";
import ModalNuovoTask from "@/app/(shared)/diagrammaTemporale/components/ModalNuovoTask";

export interface DiagrammaTemporaleProps {
    editabile: boolean
}

const DiagrammaTemporale: React.FC<DiagrammaTemporaleProps> = ({editabile}) => {

    const [view, setView] = React.useState<ViewMode>(ViewMode.Month);
    const [tasks, setTasks] = React.useState<Task[]>(initTasks());
    const [isChecked, setIsChecked] = React.useState(false);
    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 450;
    } else if (view === ViewMode.Month) {
        columnWidth = 116;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }


    const handleTaskChange = (task: Task) => {
        console.log("On date change Id:" + task.id);
        let newTasks = tasks.map(t => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = {...project, start, end};
                newTasks = newTasks.map(t =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Sei sicuro di cancellare " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter(t => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };

    const handleDblClick = (task: Task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleClick = (task: Task) => {
        console.log("On Click event Id:" + task.id);
    };

    const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };

    return (
        <>
            {editabile ?
                <div className="overflow-y-scroll max-h-[800px]">
                    <Legend/>
                    <div className="flex flex-row mb-3 items-center justify-between pr-5">
                        <ViewSwitcher
                            onViewModeChange={viewMode => setView(viewMode)}
                            onViewListChange={setIsChecked}
                            isChecked={isChecked}
                        />
                        <ModalNuovoTask tasks={tasks} setTasks={setTasks}/>
                    </div>
                    <Gantt
                        tasks={tasks}
                        viewMode={view}
                        onDateChange={handleTaskChange}
                        onDelete={handleTaskDelete}
                        onProgressChange={handleProgressChange}
                        onDoubleClick={handleDblClick}
                        onClick={handleClick}
                        onSelect={handleSelect}
                        onExpanderClick={handleExpanderClick}
                        listCellWidth={isChecked ? "270px" : ""}
                        columnWidth={columnWidth}
                        barCornerRadius={10}
                        locale="it-IT"
                        fontSize={"12px"}
                        rowHeight={30}
                    />
                    <div className="flex flex-row justify-center mt-20">
                        <div className="grid grid-cols-3 gap-20">
                            <div className="flex flex-col">
                                <h3 className="text-[#0040b8] font-semibold">COMUNICAZIONE ISTITUZIONALE</h3>
                                <span className="font-semibold">Eventi e attività:</span>
                                <ul className="list-disc">
                                    <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                    <li className="italic">News su www.grupposocietadolce.it</li>
                                    <li className="italic">Coinvolgimento partners strategici</li>
                                    <li className="italic">Post ripetuti su social network</li>
                                    <li className="italic">Comunicato stampa ed eventuale conferenza stampa</li>
                                    <li className="italic">Coinvolgimento organi di stampa</li>
                                    <li className="italic">Pubblicazione su portale Zucchetti e mailing list Presidenza</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h3 className="text-[#39b54a] font-semibold">POSIZIONAMENTO TERRITORIALE</h3>
                                    <span className="font-semibold">Iniziativa territoriale di settore:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                        <li className="italic">News su www.societadolce.it</li>
                                        <li className="italic">Coinvolgimento partners/enti</li>
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Comunicato stampa</li>
                                        <li className="italic">Coinvolgimento organi di stampa locali</li>
                                        <li className="italic">Pubblicazione su portale Zucchetti</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h3 className="text-[#f7931e] font-semibold">PROMOZIONE COMMERCIALE</h3>
                                    <span className="font-semibold">Piccola iniziativa locale:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Eventuale news su www.societadolce.it</li>
                                    </ul>
                                    <span className="font-semibold">Campagna Pubblicitaria:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Pianificazione concept, strumenti, tempistica, budget</li>
                                        <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Eventuale advertising su social network</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="overflow-y-scroll max-h-[800px]">
                    <Legend/>
                    <ViewSwitcher
                        onViewModeChange={viewMode => setView(viewMode)}
                        onViewListChange={setIsChecked}
                        isChecked={isChecked}
                    />
                    <Gantt
                        tasks={tasks}
                        viewMode={view}
                        listCellWidth={isChecked ? "250px" : ""}
                        columnWidth={columnWidth}
                        barCornerRadius={10}
                        locale="it-IT"
                        fontSize={"12px"}
                        rowHeight={30}
                    />
                    <div className="flex flex-row justify-center mt-20">
                        <div className="grid grid-cols-3 gap-20">
                            <div className="flex flex-col">
                                <h3 className="text-[#0040b8] font-semibold">COMUNICAZIONE ISTITUZIONALE</h3>
                                <span className="font-semibold">Eventi e attività:</span>
                                <ul className="list-disc">
                                    <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                    <li className="italic">News su www.grupposocietadolce.it</li>
                                    <li className="italic">Coinvolgimento partners strategici</li>
                                    <li className="italic">Post ripetuti su social network</li>
                                    <li className="italic">Comunicato stampa ed eventuale conferenza stampa</li>
                                    <li className="italic">Coinvolgimento organi di stampa</li>
                                    <li className="italic">Pubblicazione su portale Zucchetti e mailing list Presidenza</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h3 className="text-[#39b54a] font-semibold">POSIZIONAMENTO TERRITORIALE</h3>
                                    <span className="font-semibold">Iniziativa territoriale di settore:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                        <li className="italic">News su www.societadolce.it</li>
                                        <li className="italic">Coinvolgimento partners/enti</li>
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Comunicato stampa</li>
                                        <li className="italic">Coinvolgimento organi di stampa locali</li>
                                        <li className="italic">Pubblicazione su portale Zucchetti</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h3 className="text-[#f7931e] font-semibold">PROMOZIONE COMMERCIALE</h3>
                                    <span className="font-semibold">Piccola iniziativa locale:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Eventuale news su www.societadolce.it</li>
                                    </ul>
                                    <span className="font-semibold">Campagna Pubblicitaria:</span>
                                    <ul className="list-disc">
                                        <li className="italic">Pianificazione concept, strumenti, tempistica, budget</li>
                                        <li className="italic">Realizzazione materiale e diffusione con vari strumenti</li>
                                        <li className="italic">Post su social network</li>
                                        <li className="italic">Eventuale advertising su social network</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </>
    )
}

export function initTasks() {
    const currentDate = new Date();
    const tasks: Task[] = [
        {
            start: new Date(2023, 0, 1),
            end: new Date(
                currentDate.getFullYear(),
                2,
                31
            ),
            name: "Rilevazione CUSTOMER SATISFACTION",
            id: "Task 1",
            progress: 100,
            type: "task",
            displayOrder: 1,
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },

        },
        {
            start: new Date(2023, 0, 1),
            end: new Date(
                currentDate.getFullYear(),
                9,
                31
            ),
            name: "Seminario RAPPORTI CORTI",
            id: "Task 2",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 2,
        },
        {
            start: new Date(2023, 1, 1),
            end: new Date(
                currentDate.getFullYear(),
                2,
                31
            ),
            name: "Campagna 5x1000",
            id: "Task 3",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 3,
        },
        {
            start: new Date(2023, 1, 1),
            end: new Date(
                currentDate.getFullYear(),
                4,
                31
            ),
            name: "Evento UN DOLCE INVITO",
            id: "Task 4",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 4,
        },
        {
            start: new Date(2023, 2, 1),
            end: new Date(
                currentDate.getFullYear(),
                2,
                31
            ),
            name: "Materiali per CENTRI ESTIVI 3-6 E 6-11",
            id: "Task 5",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 5,
        },
        {
            start: new Date(2023, 2, 1),
            end: new Date(
                currentDate.getFullYear(),
                2,
                31
            ),
            name: "Incontri TANTE STORIE PER CRESCERE",
            id: "Task 6",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 6,
        },
        {
            start: new Date(2023, 2, 1),
            end: new Date(
                currentDate.getFullYear(),
                4,
                31
            ),
            name: "Evento VISITA MINISTRO DISABILITA'",
            id: "Task 7",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 7,
        },
        {
            start: new Date(2023, 2, 1),
            end: new Date(
                currentDate.getFullYear(),
                4,
                31
            ),
            name: "Materiali per SPAZIO TENGO",
            id: "Task 8",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 8,
        },
        {
            start: new Date(2023, 2, 1),
            end: new Date(
                currentDate.getFullYear(),
                11,
                31
            ),
            name: "Comunicare SISTEMI DI GESTIONE",
            id: "Task 9",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 9,
        },
        {
            start: new Date(2023, 3, 1),
            end: new Date(
                currentDate.getFullYear(),
                6,
                31
            ),
            name: "Promo estiva RSA DUCALE",
            id: "Task 10",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 10,
        },
        {
            start: new Date(2023, 4, 1),
            end: new Date(
                currentDate.getFullYear(),
                4,
                31
            ),
            name: "Materiali per SERVIZI SCOLASTICI UTC",
            id: "Task 11",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 11,
        },
        {
            start: new Date(2023, 5, 1),
            end: new Date(
                currentDate.getFullYear(),
                6,
                31
            ),
            name: "Intergenerazionalità NIDO POZZO",
            id: "Task 12",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 12,
        },
        {
            start: new Date(2023, 5, 1),
            end: new Date(
                currentDate.getFullYear(),
                6,
                31
            ),
            name: "Campagna SERVIZI 0-6 ROMAGNA",
            id: "Task 13",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 13,
        },
        {
            start: new Date(2023, 5, 1),
            end: new Date(
                currentDate.getFullYear(),
                8,
                30
            ),
            name: "Campagna SERVIZI 0-6 SD",
            id: "Task 14",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 14,
        },
        {
            start: new Date(2023, 5, 1),
            end: new Date(
                currentDate.getFullYear(),
                8,
                30
            ),
            name: "Posti privati NIDO GLI ELFI",
            id: "Task 15",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 15,
        },
        {
            start: new Date(2023, 6, 1),
            end: new Date(
                currentDate.getFullYear(),
                8,
                30
            ),
            name: "Doposcuola AID PARMA",
            id: "Task 16",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#f7931e",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#f7931e'
            },
            progress: 100,
            type: "task",
            displayOrder: 16,
        },
        {
            start: new Date(2023, 6, 1),
            end: new Date(
                currentDate.getFullYear(),
                8,
                30
            ),
            name: "Decennale HOSPICE VILLA ADALGISA",
            id: "Task 17",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 17,
        },
        {
            start: new Date(2023, 8, 1),
            end: new Date(
                currentDate.getFullYear(),
                9,
                31
            ),
            name: "Evento Concessione RSA ZIROTTI",
            id: "Task 18",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 18,
        },
        {
            start: new Date(2023, 8, 1),
            end: new Date(
                currentDate.getFullYear(),
                10,
                30
            ),
            name: "Incontro LAB E&G + LAB FRAGILITA'",
            id: "Task 19",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 19,
        },
        {
            start: new Date(2023, 8, 1),
            end: new Date(
                currentDate.getFullYear(),
                11,
                31
            ),
            name: "Siti web KARABAK 3/4/7 + VIGNOLA06",
            id: "Task 20",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#0040b8",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#0040b8'
            },
            progress: 100,
            type: "task",
            displayOrder: 20,
        },
        {
            start: new Date(2023, 9, 1),
            end: new Date(
                currentDate.getFullYear(),
                10,
                30
            ),
            name: "Inaugurazione CED L'ABBRACCIO",
            id: "Task 21",
            styles: {
                backgroundColor: "#bac0ce",
                progressColor: "#39b54a",
                backgroundSelectedColor: "#bac0ce",
                progressSelectedColor: '#39b54a'
            },
            progress: 100,
            type: "task",
            displayOrder: 21,
        },
    ];
    return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
        const task = projectTasks[i];
        if (start.getTime() > task.start.getTime()) {
            start = task.start;
        }
        if (end.getTime() < task.end.getTime()) {
            end = task.end;
        }
    }
    return [start, end];
}

export default DiagrammaTemporale