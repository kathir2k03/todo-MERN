import { useEffect, useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getTodos } from "../actions/todoAction";
import ListsItem from "./ListsItem";

const Todo = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState(null)
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { loading, error: reduxError, successMessage, clearSuccessMsg } = useSelector((state) => state.todoState);

  useEffect(() => {
    if(successMessage){
      setSuccess(successMessage)
      const timer = setTimeout(() => {
        setSuccess(null)
      }, 3000);
      
      return () => clearTimeout(timer);      
    }
    if (reduxError) {
      setError(reduxError);
      
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reduxError, successMessage]);

   function handleSubmit() {
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError("Please fill all fields");

      setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }

    dispatch(createTodo({
      title,
      description,
    }));
  setTitle("");
  setDescription("");
  }

  return (
    <section className="">
      <div className="p-3 text-center bg-green-500 text-white font-medium">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Todo Project with MERN stack</h1>
      </div >
      <div className="p-3">
        <h3 className="text-[20px] md:text-2xl mt-3 mb-1">Add Item</h3>
        {success && (
          <p className="text-green-500">{success}</p>
        )}
        <div className="w-full form-group flex gap-2 items-center">
          <div className=" w-full flex flex-col gap-2 md:flex-row">
          <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none" placeholder="Title" value={title}
            onChange={(e) => { setTitle(e.target.value) }}/>
          <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none" placeholder="Decription" value={description}
            onChange={(e) => { setDescription(e.target.value) }} />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit" onClick={handleSubmit}>
            Submit</button>

        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <ListsItem/>
    </section>
  )
}

export default Todo