import React, {useState} from 'react';
import {BiPlus} from "react-icons/bi";
import {Task} from "gantt-task-react";

export interface ModalNuovoTaskProps{
    tasks: Task[],
    setTasks: Function
}

const ModalNuovoTask: React.FC<ModalNuovoTaskProps> = ({tasks, setTasks}) => {

    const [nome, setNome] = useState<string>("")
    const [categoria, setCategoria] = useState<string>("")
    const [colore, setColore] = useState<string>("")
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")

    return(
        <>
            <label htmlFor="my_modal_6" className="btn btn-sm bg-[#B5C5E7] text-white hover:opacity-80 hover:bg-[#B5C5E7]">
                <BiPlus size={20}/>
                Aggiungi Task
            </label>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Aggiungi un nuovo task</h3>
                    <div className="flex flex-col py-3">
                        <div className="flex flex-row items-center justify-between">
                            <span>Nome:</span>
                            <input type="text" placeholder="Nome" className="input input-sm input-bordered w-full max-w-xs"
                                   value={nome} onChange={(e) => setNome(e.currentTarget.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Categoria:</span>
                            <input type="text" placeholder="Categoria" className="input input-sm input-bordered w-full max-w-xs"
                                   value={categoria} onChange={(e) => setCategoria(e.currentTarget.value)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span>Colore:</span>
                            <input type="color" placeholder="Colore" className="input input-sm input-bordered w-[50px] rounded-full max-w-xs"
                                   value={colore} onChange={(e) => setColore(e.currentTarget.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-10 mt-2">
                            <div className="flex flex-col">
                                <span>From</span>
                                <input type="date" placeholder="From" className="input input-sm input-bordered w-full"
                                       value={from} onChange={(e) => setFrom(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span>To</span>
                                <input type="date" placeholder="To" className="input input-sm input-bordered w-full"
                                       value={to} onChange={(e) => setTo(e.currentTarget.value)}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Annulla</label>
                        <label htmlFor="my_modal_6" className="btn" onClick={() => {
                            let fromDate: Date = new Date(from)
                            let toDate:Date = new Date(to)
                            let task: Task = {
                                name: nome,
                                type: 'task',
                                start: new Date(
                                    fromDate.getFullYear(),
                                    fromDate.getMonth(),
                                    fromDate.getDate()
                                ),
                                end: new Date(
                                    toDate.getFullYear(),
                                    toDate.getMonth(),
                                    toDate.getDate()
                                ),
                                styles: {
                                    backgroundColor: "#bac0ce",
                                    progressColor: colore,
                                    backgroundSelectedColor: "#bac0ce",
                                    progressSelectedColor: colore
                                },
                                displayOrder: tasks.length,
                                id: `Task ${tasks.length-1}`,
                                progress: 100
                            }
                            setTasks((oldTasks: Task[]) => [...oldTasks, task])
                        }}>Aggiungi</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalNuovoTask