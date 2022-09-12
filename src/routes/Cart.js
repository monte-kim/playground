import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch(); //send msg to store.js "pls change"

  return (
    <div>
      {state.user}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
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
                      dispatch(changeName());
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
