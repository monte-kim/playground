import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "../store/userSlice";
import { addCount } from "../store/itemsSlice";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch(); //send msg to store.js "pls change"

  return (
    <div>
      <h5>{state.user.name}'s Cart</h5>
      <h6>
        {state.user.name}'s Age is {state.user.age}
      </h6>
      <button
        onClick={() => {
          dispatch(changeAge(10));
        }}
      >
        BUTTON
      </button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PRODUCT</th>
            <th>COUNT</th>
            <th>ADD</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map((a, i) => {
            return (
              <tr key={i}>
                <td>{state.items[i].id}</td>
                <td>{state.items[i].name}</td>
                <td>{state.items[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(1));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
