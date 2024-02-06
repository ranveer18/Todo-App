import React, { useEffect, useState, useRef } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import "./style.css";
const getLSItem = () => {
  const list = localStorage.getItem("item");
  if (list) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(getLSItem());
  const [remove, setRemove] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const focus = useRef();
  useEffect(() => {
    if (focus.current.value.length > 0) {
      setIsFocused(true);
    }
  }, [isFocused]);

  const addItem = (e) => {
    if (input) {
      setItem([...item, input]);
      setInput("");
      setRemove(true);
    }
    setIsFocused(false);
  };

  const deleteItem = (id) => {
    const updateItem = item.filter((e, ind) => {
      return ind !== id;
    });
    setItem(updateItem);
  };
  const removeAll = () => {
    setItem([]);
  };
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
    if (item.length === 0) {
      setRemove(false);
    } else {
      setRemove(true);
    }
  }, [item]);

  return (
    <>
      <section>
        <h1 style={{ color: "#12372A" }}>Todo List App</h1>
        <div className="input_conatiner">
          <label htmlFor="input" className={isFocused ? "focus" : "move"}>
            Enter Item
          </label>
          <input
            type="text"
            name=""
            id="input"
            ref={focus}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addItem}>
            <BiSolidAddToQueue />
          </button>
        </div>
        <div className="list_body">
          {item.map((e, index) => {
            return (
              <div key={index} className="item_list">
                <p className="itmes">{e}</p>
                <button
                  onClick={() => {
                    deleteItem(index);
                  }}
                >
                  <IoIosRemoveCircle />
                </button>
              </div>
            );
          })}
          {remove ? (
            <button onClick={removeAll} className="remove">
              Clear List
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default Todo;
