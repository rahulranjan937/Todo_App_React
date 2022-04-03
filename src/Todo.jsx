import { useState , useEffect} from "react";

const itemsData = [
  {
    id: 1,
    name: "Shopping",
    isCompleted: true
  },
  {
    id: 2,
    name: "Movie",
    isCompleted: false
  },
  {
    id: 3,
    name: "ColdDrink",
    isCompleted: true
  },
];

export default function TodoApp() {
  const [name, setName] = useState("");

  const [items, setItem] = useState(itemsData);

  useEffect(() => {
    document.title = "Todo App"
  }, [])
  
  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOnAdd = () => {
    console.log(name)

    if (!name){
      return;
    }

    const newTodo = {
      id: items.length + 1,
      name,
      isCompleted: false,
    };

    const newItemsList = [...items, newTodo];

    setItem(newItemsList);
    setName("");
  };

  const removeTodo = (id) => {
    const itemList = items.filter((e) => e.id !== id);
    setItem(itemList);
  };

  const markCompleted = (e, id) => {
    console.log(e.target.checked, id);

    const val = e.target.checked;

    const itemList = items.map((e) => {
      if (e.id === id) {
        const updateTodo = {
          ...e,
          isCompleted: val,
        };
        return updateTodo;
      } else {
        return e;
      }
    });

    setItem(itemList);
  };

  

  return (
    <div>
      <div className="my-2 add">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="form-group w-50">
            <input
              type="text"
              className="form-control mb-2"
              value={name}
              onChange={handleOnNameChange}
            />
            <button className="btn btn-primary" onClick={handleOnAdd}>
              Add Items
            </button>
          </div>
        </div>
      </div>

      {items.map((item) => (
        <div className="mb-2" key={item.id}>
          <input
            type="checkbox"
            className="mx-2"
            onChange={(e) => markCompleted(e, item.id)}
          />
          {item.isCompleted === true ? (
            <s>{item.name}</s>
          ) : (
            <span>{item.name}</span>
          )}
          <button
          className="btn btn-danger"
          onClick={() => removeTodo(item.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
