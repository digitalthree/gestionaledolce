import React, {useEffect, useState} from 'react';
import {RiSettings5Fill} from "react-icons/ri";
import {BsTrash2Fill} from "react-icons/bs";
import {
    useCreateNewsMutation,
    useDeleteNewsMutation,
    useGetNews,
    useUpdateGaraMutation,
    useUpdateNewsMutation
} from "@/store/rtkqApi";
import {News} from "@/model/News";

export interface NewsProps {
    editabile: boolean
}

const News: React.FC<NewsProps> = ({editabile}) => {

    const res = useGetNews()
    const [inputNews, setInputNews] = useState<News[]>([])
    const [newNews, setNewNews] = useState<News>({} as News)
    useEffect(() => {
        if (res.data) {
            setInputNews(res.data)
            setNewNews(
                {
                    id: res.data.length,
                    data: new Date().toLocaleDateString(),
                    titolo: "",
                    testo: ""
                }
            )
        }
    }, [res]);


    const [updateNews] = useUpdateNewsMutation()
    const [createNews] = useCreateNewsMutation()
    const [deleteNews] = useDeleteNewsMutation()


    return (
        <div className="flex flex-col">
            <div className="flex justify-end">
                <h3 className="text-white text-xl font-semibold mb-3">Ultime News</h3>
            </div>
            <div className="flex flex-col items-end overflow-y-auto max-h-[250px]">
                <ul>
                    {inputNews.map((n, index) => {
                        let dat = n.data.split("-")
                        return (
                            <>

                                <li key={n.faunaDocumentId} className="mb-3">
                                    <div className="grid grid-cols-5 items-center gap-4">
                                        <label htmlFor={`my_modal_${n.id}`}
                                               className="px-4 col-span-4 py-2 bg-white rounded-3xl text-[14px] text-[#2866CC] uppercase font-semibold hover:cursor-pointer hover:opacity-70">{dat[2]}/{dat[1]} | {n.titolo.length <= 50 ? n.titolo : n.titolo.substring(0, 50) + '...'}</label>
                                        {editabile &&
                                            <div className="flex flex-row">
                                                <label htmlFor={`my_modal_${n.id}`}
                                                       className="hover:cursor-pointer hover:text-[#2866CC] text-white">
                                                    <RiSettings5Fill size={22}/>
                                                </label>

                                                <BsTrash2Fill size={22}
                                                              className="hover:cursor-pointer hover:text-[#2866CC] hover:opacity-70 text-white"
                                                              onClick={() => {
                                                                  let confirm = window.confirm("sei sicuri di voler eliminare la news dal titolo: " + n.titolo)
                                                                  if (confirm) {
                                                                      deleteNews(n.faunaDocumentId)
                                                                      setInputNews(inputNews.filter(inpn => inpn.id !== n.id))
                                                                  }
                                                              }}/>
                                            </div>
                                        }
                                    </div>

                                    <input type="checkbox" id={`my_modal_${n.id}`} className="modal-toggle"/>
                                    <div className="modal">
                                        <div
                                            className="modal-box max-w-2xl h-[600px] border-[5px] border-[#B5C5E7]">
                                            {editabile ?
                                                <input type="text"
                                                       className="hover:cursor-pointer p-2 font-bold text-2xl text-[#B5C5E7] uppercase w-full"
                                                       placeholder="Inserisci Titolo"
                                                       value={n.titolo}
                                                       onChange={(e) => {
                                                           setInputNews(
                                                               inputNews.map(item =>
                                                                   item.id === n.id ? {
                                                                       ...item,
                                                                       titolo: e.currentTarget.value
                                                                   } : item
                                                               )
                                                           )
                                                       }
                                                       }
                                                />
                                                :
                                                <h3 className="font-bold text-2xl text-[#B5C5E7] uppercase">{n.titolo}</h3>
                                            }

                                            <hr className="border border-[#B5C5E7] mt-2"/>
                                            {editabile ?
                                                <input type="date"
                                                       className="hover:cursor-pointer p-2 text-[#B5C5E7] font-semibold"
                                                       defaultValue={n.data}
                                                       value={n.data}
                                                       onChange={(e) => {
                                                           setInputNews(
                                                               inputNews.map(item =>
                                                                   item.id === n.id ? {
                                                                       ...item,
                                                                       data: e.currentTarget.value
                                                                   } : item
                                                               )
                                                           )
                                                       }
                                                       }
                                                />
                                                :
                                                <p className="py-4 text-[#B5C5E7] font-semibold">{n.data}</p>
                                            }
                                            {!editabile && <hr className="border border-[#B5C5E7]"/>}
                                            {editabile ?
                                                <textarea
                                                    className="hover:cursor-pointer text-[#B5C5E7] w-full h-[60%] p-2 border-2 border-[#B5C5E7] rounded"
                                                    value={n.testo}
                                                    id="textAreaNews"
                                                    onChange={(e) => {
                                                        setInputNews(
                                                            inputNews.map(item =>
                                                                item.id === n.id ? {
                                                                    ...item,
                                                                    testo: e.currentTarget.value
                                                                } : item
                                                            )
                                                        )
                                                    }
                                                    }
                                                >Inserisci testo</textarea>
                                                :
                                                <p className="py-4 text-[#B5C5E7]">{n.testo}</p>
                                            }

                                            {editabile ?
                                                <div
                                                    className="modal-action absolute right-0 left-0 p-3 bottom-5 flex justify-around w-full">
                                                    <label htmlFor={`my_modal_${n.id}`}
                                                           className="btn w-1/2">Annulla</label>
                                                    <label htmlFor={`my_modal_${n.id}`}
                                                           className="btn bg-[#B5C5E7] hover:bg-[#B5C5E7] hover:opacity-70 text-white w-1/2"
                                                           onClick={() => updateNews(n)}
                                                    >Aggiorna
                                                        News</label>
                                                </div> :
                                                <div
                                                    className="modal-action absolute right-0 left-0 p-3 bottom-5 w-full">
                                                    <label htmlFor={`my_modal_${n.id}`}
                                                           className="btn bg-[#B5C5E7] text-white w-full">Chiudi</label>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </li>


                            </>

                        )
                    })}
                </ul>
            </div>
            {editabile &&
                <>
                    <div className="flex flex-row justify-start">
                        <label htmlFor={`my_modal_add`}
                               className="px-4 py-2 bg-[white] rounded-3xl text-[13px] text-[#2866CC] uppercase font-semibold hover:cursor-pointer hover:opacity-70">+
                            News</label>
                    </div>
                    <input type="checkbox" id={`my_modal_add`} className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box max-w-2xl h-[600px] border-[5px] border-[#B5C5E7]">
                            <input type="text"
                                   className="hover:cursor-pointer p-2 font-bold text-2xl text-[#B5C5E7] uppercase w-full"
                                   placeholder="Inserisci Titolo"
                                   value={newNews.titolo}
                                   onChange={(e) => {
                                       setNewNews({...newNews, titolo: e.currentTarget.value})
                                   }}
                            />
                            <hr className="border border-[#B5C5E7] mt-2"/>
                            <input type="date" className="hover:cursor-pointer p-2 text-[#B5C5E7] font-semibold"
                                   placeholder="Inserisci data"
                                   value={newNews.data}
                                   onChange={(e) => {
                                       setNewNews({...newNews, data: e.currentTarget.value})
                                   }}
                            />
                            <textarea
                                className="hover:cursor-pointer text-[#B5C5E7] w-full h-[60%] p-2 border-2 border-[#B5C5E7] rounded"
                                id={"textAreaNews"}
                                value={newNews.testo}
                                placeholder="Inserisci testo"
                                onChange={(e) => {
                                    setNewNews({...newNews, testo: e.currentTarget.value})
                                }}
                            >Inserisci testo</textarea>
                            <div
                                className="modal-action absolute right-0 left-0 p-3 bottom-5 flex justify-around w-full">
                                <label htmlFor={`my_modal_add`} className="btn w-1/2">Annulla</label>
                                <label htmlFor={`my_modal_add`}
                                       className="btn bg-[#B5C5E7] hover:bg-[#B5C5E7] hover:opacity-70 text-white w-1/2"
                                       onClick={() => {
                                           createNews(newNews).then((res: any) => {
                                               setInputNews((oldNews) => [...oldNews, {...newNews, faunaDocumentId: res.data }])
                                           })

                                           setNewNews(
                                               {
                                                   id: newNews.id + 1,
                                                   data: new Date().toLocaleDateString(),
                                                   titolo: "",
                                                   testo: ""
                                               }
                                           )
                                       }}
                                >Pubblica News</label>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default News