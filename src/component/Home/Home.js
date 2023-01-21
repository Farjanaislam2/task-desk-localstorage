import React, { useEffect } from "react";
import { useState } from "react";
import List from "../List/List";
import Lists from "../List/Lists";

const getLocalStorage = () =>{
let list = localStorage.getItem("list");
if(list){
    return(list =JSON.parse(localStorage.getItem("list")))

}
else{
    return[]
}
}

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isedit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });


  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list));
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
        showAlert(true, "danger", "Please enter value");
    }
    else if(name && isedit){
        setList(
            list.map((item)=>{
                if(item.id ==edit){
                    return {...item,title:name, description:description}
                }
              
                return item
            })
           
        );
  
        setName('');
        setDescription("")
        setEdit(null)
        setIsEdit(false)
        showAlert(true, "success", "value changed");
    }
    else{
        showAlert(true, "success", "Item added the list");
        const newItem ={id: new Date().getTime().toString(), title:name}
        setList([...list,newItem])
        setName("");
    }
  };
  const showAlert = (show =false, type ="", msg="") => {
    setAlert({show,type,msg});
    
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id ===id)
    setIsEdit(true)
    setEdit(id)
    setName(editItem.title);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {alert.show && (
          <Lists {...alert} removeAlert={showAlert} list={list}></Lists>
        )}
        <h1 className="text-3xl font-bold text-center mb-10">Task Desk</h1>
        <div className="mb-3 justify-center items-center bg-blue-200 border-2 m-10 p-10 form">
          <div>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs mb-5"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            
          </div>

          <div>
            <textarea
              className="textarea w-96  textarea-bordered"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            ></textarea>
          </div>
          <button type="submit" className="btn">
            {isedit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List items={list} removeItem={removeItem} editItem={editItem}></List>
        </div>
      )}
    </div>
  );
};

export default Home;
