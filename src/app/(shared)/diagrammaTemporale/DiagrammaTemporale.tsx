import React, {useEffect, useState} from 'react';
import {Gantt, Task, ViewMode} from "gantt-task-react";
import {ViewSwitcher} from "@/app/(shared)/diagrammaTemporale/components/ViewSwitcher";
import Legend from "@/app/(shared)/diagrammaTemporale/components/Legend";
import ModalNuovoTask from "@/app/(shared)/diagrammaTemporale/components/ModalNuovoTask";
import BottomLegend from "@/app/(shared)/diagrammaTemporale/components/BottomLegend";
import {useCreateTaskMutation, useDeleteTaskMutation, useGetTasks, useUpdateTaskMutation} from "@/store/rtkqApi";

export interface DiagrammaTemporaleProps {
    editabile: boolean
}

const DiagrammaTemporale: React.FC<DiagrammaTemporaleProps> = ({editabile}) => {

    const [view, setView] = useState<ViewMode>(ViewMode.Month);
    const [tasks, setTasks] = useState<(Task & {faunaDocumentId: string})[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

    const [showModalUpdateTask, setShowModalUpdateTask] = useState<boolean>(false)

    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 450;
    } else if (view === ViewMode.Month) {
        columnWidth = 116;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const resTasks = useGetTasks()
    const [updateTask, resUpdateTask] = useUpdateTaskMutation()
    const [deleteTask, resDeleteTask] = useDeleteTaskMutation()
    const [createTask, resCreateTask] = useCreateTaskMutation()

    useEffect(() => {
        if (resTasks.data) {
            setTasks([])
            resTasks.data.forEach(d => {
                let taskObj: (Task & {faunaDocumentId: string}) = {...d, start: new Date(d.start), end: new Date(d.end)}
                setTasks((prev) => ([...prev, taskObj]))
            })
        }
    }, [resTasks]);


    const handleTaskChange = (task: Task) => {
        updateTask(task)
    };

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Sei sicuro di cancellare " + task.name + " ?");
        if (conf) {
            //setTasks(tasks.filter(t => t.id !== task.id));
            deleteTask(task)
        }
        return conf;
    };

    /*const handleProgressChange = async (task: Task) => {
        //setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };*/

    const handleDblClick = (task: Task) => {
        setSelectedTask(task)
        setShowModalUpdateTask(true)
    };

    /*const handleClick = (task: Task) => {
        console.log("On Click event Id:" + task.id);
    };*/

    /*const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };*/

    /*const handleExpanderClick = (task: Task) => {
        //setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };*/

    return (
        <>
            {editabile ?
                <>
                    {(resUpdateTask.isLoading || resCreateTask.isLoading || resDeleteTask.isLoading || resTasks.isLoading) &&
                        <div className="absolute top-1/2 left-1/2">
                            <span className="loading loading-bars loading-lg text-[#B5C5E7]"></span>
                        </div>
                    }
                    <div
                        className={`overflow-scroll ${(resUpdateTask.isLoading || resCreateTask.isLoading || resDeleteTask.isLoading || resTasks.isLoading) && 'opacity-10'} ${isChecked || view === 'Week' ? 'max-w-[90%]' : 'max-w-[100%]'} max-h-[95vh] relative`}>
                        <Legend/>
                        <div className="flex flex-row mb-3 items-center justify-between pr-5">
                            <ViewSwitcher
                                onViewModeChange={viewMode => setView(viewMode)}
                                onViewListChange={setIsChecked}
                                isChecked={isChecked}
                            />
                            <ModalNuovoTask tasks={tasks} createTask={createTask}/>

                        </div>
                        {tasks.length > 0 &&
                            <Gantt
                                tasks={tasks}
                                viewMode={view}
                                onDateChange={handleTaskChange}
                                onDelete={handleTaskDelete}
                                onDoubleClick={handleDblClick}
                                listCellWidth={isChecked ? "270px" : ""}
                                columnWidth={columnWidth}
                                barCornerRadius={10}
                                locale="it-IT"
                                fontSize={"12px"}
                                rowHeight={30}
                            />
                        }
                        {showModalUpdateTask &&
                            <div className="bg-white border-2 border-[#B5C5E7] rounded-3xl w-1/2 shadow-2xl p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <h3 className="font-bold text-lg">Modifica {selectedTask?.name}</h3>
                                <div className="flex flex-col py-3">
                                    <div className="flex flex-row items-center justify-between">
                                        <span>Nome:</span>
                                        <input type="text" placeholder="Nome" className="input input-sm input-bordered w-full max-w-xs"
                                               value={selectedTask?.name}
                                               onChange={(e) => {
                                                   setSelectedTask(prev => prev && ({...prev, name: e.target.value}))
                                               }}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center justify-between mt-2">
                                        <span>Task Numero:</span>
                                        <input type="number" placeholder="Task Numero" className="input input-sm input-bordered w-full max-w-xs"
                                               value={selectedTask?.displayOrder}
                                               onChange={(e) => {
                                                   setSelectedTask(prev => prev && ({...prev, displayOrder: parseInt(e.target.value)}))
                                               }}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center justify-between mt-2">
                                        <span>Colore:</span>
                                        <input type="color" placeholder="Colore" className="input input-sm input-bordered w-[50px] rounded-full max-w-xs"
                                               value={selectedTask?.styles?.progressColor}
                                               onChange={(e) => {
                                                   setSelectedTask(prev => prev && ({...prev, styles: {
                                                           ...prev.styles,
                                                           progressColor: e.target.value,
                                                           progressSelectedColor: e.target.value
                                                       }}))
                                               }}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-4 justify-between">
                                        <button className="btn btn-sm btn-active hover:border-2 hover:border-gray-500 mt-10 w-1/3"
                                                onClick={() => {setShowModalUpdateTask(false)}
                                        }
                                        >Annulla</button>
                                        <button className="btn btn-sm btn-active hover:border-2 hover:border-green-500 mt-10 w-1/3"
                                                onClick={() => {
                                                    updateTask(selectedTask)
                                                    setShowModalUpdateTask(false)
                                                }}
                                        >Modifica Task</button>
                                    </div>
                                    <button className="btn btn-error btn-sm mt-3"
                                        onClick={() => {
                                            handleTaskDelete(selectedTask as Task)
                                            setShowModalUpdateTask(false)
                                        }}
                                    >Elimina Task</button>
                                </div>
                            </div>
                        }

                        <BottomLegend/>
                    </div>

                </>
                :
                <div
                    className={`overflow-scroll ${isChecked || view === 'Week' ? 'max-w-[90%]' : 'max-w-[100%]'} max-h-[95vh]`}>
                    <Legend/>
                    <ViewSwitcher
                        onViewModeChange={viewMode => setView(viewMode)}
                        onViewListChange={setIsChecked}
                        isChecked={isChecked}
                    />
                    {tasks.length > 0 &&
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
                    }
                    <BottomLegend/>
                </div>
            }
        </>
    )
}

/*export function initTasks() {
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
}*/

export default DiagrammaTemporale