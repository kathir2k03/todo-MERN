import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, editTodo, getTodos } from "../actions/todoAction"

function ListsItem() {
    const { todos, isTodoDeleted, error: apiError, isTodoUpdated } = useSelector((state) => state.todoState)
    const [editItem, setEditItem] = useState(null)
    const [error, setError] = useState("")
    const [title, setTitle] = useState("")
    const [updated, setUpdated] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const [dataRemoved, setDataRemoved] = useState("")
    useEffect(() => {
        dispatch(getTodos())
        if (isTodoUpdated) {
            setUpdated("Item Successfully Updated!")
            const timer = setTimeout(() => {
                setUpdated(null)
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [dispatch])

    // handle Delete
    function handleDelete(id, title) {
        if (confirm(`Are you sure want to remove ${title}`)) {
            dispatch(deleteTodo(id))
            setDataRemoved(isTodoDeleted)
            setTimeout(() => {
                setDataRemoved("")
            }, 3000)

        } else { }
    }

    // handle Edit
    function handleEdit(id, title, description) {
        setEditItem(id)
        setTitle(title)
        setDescription(description)
    }

    function handleSubmit() {
        setError("");

        if (!title.trim() || !description.trim()) {
            setError("Please fill all fields");

            setTimeout(() => {
                setError("");
            }, 3000);

            return;
        }

        dispatch(editTodo(editItem, {
            title,
            description,
        }));

        setTitle("");
        setDescription("");
        setEditItem(null)
    }

    return (
        <section className="w-full p-3">
            <h1 className="text-[20px] md:text-3xl">Tasks</h1>
            {isTodoDeleted && <p className="bg-white rounded-[5px] px-2 text-green-600 fixed top-15 right-10">{dataRemoved}</p>}
            {updated && <p className="bg-white rounded-[5px] px-2 text-green-600 fixed top-15 right-10">{updated}</p>}
            {todos.map((data) => (
                <div key={data._id} className="bg-blue-400 mt-3 p-2 px-3 rounded-[5px]">
                    {editItem === data._id ? (
                        <div className="w-full gap-2 flex justify-between items-center">
                            <div className="w-[80%] lg:w-[85%] gap-2 flex flex-col md:flex-row ">
                                <input className="md:w-1/2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none" placeholder="Title" value={title}
                                    onChange={(e) => { setTitle(e.target.value) }} />
                                <input className="md:w-1/2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none" placeholder="Decription" value={description}
                                    onChange={(e) => { setDescription(e.target.value) }} />
                                {error && <p>{error}</p>}
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:min-w-[120px]">
                                <button
                                    className="px-1 sm:px-2 sm:py-1 bg-yellow-400 cursor-pointer rounded-[5px]"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>

                                <button
                                    className="bg-white px-1 sm:px-2 sm:py-1 cursor-pointer text-black rounded-[5px]"
                                    onClick={() => setEditItem(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (

                        <div className="flex justify-between items-center">
                            <div className="max-w-[80%] sm:max-w-[70%]">
                                <h1 className="font-bold  mb-2 wrap-break-word">{data.title}</h1>
                                <p className="mb-2 wrap-break-word">{data.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:min-w-[120px]">
                                <button
                                    className="px-1 sm:px-2 sm:py-1 bg-yellow-400 cursor-pointer rounded-[5px]"
                                    onClick={() => handleEdit(data._id, data.title, data.description)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="bg-red-500 px-1 sm:px-2 sm:py-1 cursor-pointer text-white rounded-[5px]"
                                    onClick={() => handleDelete(data._id, data.title)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {todos.length === 0 && <p className="text-1xl md:text-2xl flex mt-15 justify-center">No Data Avalaible</p>}
        </section>
    )
}
export default ListsItem