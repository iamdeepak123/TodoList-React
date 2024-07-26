import React, { useEffect, useReducer, useState } from 'react'
import reducer from "../Reducer/Reducer"
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';


const Todolist = () => {
    const [active, setActive] = useState(true);

    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");

    const getlist1 = () => {

        let locallistData = localStorage.getItem("mylist");
        if (locallistData === null) {

            return [];
        } else
            return JSON.parse(locallistData);

    }


    const getlist2 = () => {

        let locallistData = localStorage.getItem("mylist2");
        if (locallistData === null) {

            return [];
        } else
            return JSON.parse(locallistData);

    }


    const initialState = {
        list: getlist1(),
        list2: getlist2(),

    }
    const [state, dispatch] = useReducer(reducer, initialState);


    const addtask = () => {
        if (title === "" || des === "") return
        dispatch({ type: "ADD", payload: { value1: title, value2: des } })

        setTitle("")
        setDes("");
    }
    const remove = (id) => {
        dispatch({ type: "REMOVE", payload: id })

    }

    const move = (id) => {
        dispatch({ type: "MOVE", payload: id })
    }
    const removeAll = () => {
        dispatch({ type: "REMOVEALL" })
    }

    useEffect(() => {

        localStorage.setItem("mylist", JSON.stringify(state.list));
        localStorage.setItem("mylist2", JSON.stringify(state.list2));


    }, [state])

    return (
        <>
            <div className='list_container'>
                <div className="input_task">

                    <div className='box_card'>
                        <h1 className='title_heading'>Title:</h1>
                        <input className='title_input' type="text" name="" id="" placeholder='Title of task' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='box_card'>

                        <h1 className='title_heading'>Description:</h1>
                        <input className='title_input' type="text" name="" id="" placeholder='Description of task' value={des} onChange={(e) => setDes(e.target.value)} />

                    </div>
                    <div className='input_btn'>
                        <button onClick={addtask}>Add</button>
                    </div>
                    
                </div>
                
                <div className="task_list_section">
                <hr />
                    <div className="menu">
                        <div className="menu_icon">
                            <button className= { active ? 'menu_btn active' : 'menu_btn' } onClick={() => setActive(true)}> {state.list.length ? `To Do (${state.list.length}) ` : "To Do"}    </button>
                            <button className= { active ? 'menu_btn' : 'menu_btn active' } onClick={() => setActive(false)}>{state.list2.length ? `Completed (${state.list2.length})` : "Completed"}</button>
                        </div>
                        <div className="remove">
                            <button onClick={removeAll}>Remove All</button>
                        </div>
                    </div>

                    {

                        active ?
                            <div className="task_list">
                                <ul className='ul_list'>

                                    {
                                        state.list.map((curElem) => {
                                            return (
                                                < li className='list_items' key={curElem.id} >
                                                    <div className='content'>
                                                        <h3>{curElem.title}:</h3>
                                                        <p>{curElem.description}</p>
                                                    </div>
                                                    <div className='Icons'>
                                                        <DeleteIcon fontSize="large" style={{ color: 'red', cursor: "pointer" }} onClick={() => remove(curElem.id)} />
                                                        <DoneIcon fontSize="large" style={{ color: 'green' ,cursor: "pointer" }} onClick={() => move(curElem.id)} />
                                                    </div>
                                                </li>
                                            )

                                        })
                                    }

                                </ul>
                            </div>
                            :
                            <div className="task_list">
                                <ul className='ul_list'>
                                    {state.list2.map((elem) => {
                                        return (
                                            < li className='list_items' key={elem.id} >
                                                <div className='content'>
                                                    <h3>{elem.title}:</h3>
                                                    <p className='p2_tag'>{elem.description}</p>
                                                    <p className='p_tag'>Created at: {elem.id}</p>
                                                </div>
                                                <div className='Icons'>
                                                    <DeleteIcon fontSize="large" style={{ color: 'red' , cursor: "pointer"}} onClick={() => remove(elem.id)} />
                                                </div>

                                            </li>
                                        )
                                    })}


                                </ul>
                            </div>
                    }

                </div>




            </div >


        </>
    )
}

export default Todolist