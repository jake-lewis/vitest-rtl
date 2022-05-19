import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { increment, selectCount } from "./counterSlice";

const Counter = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <p>
            <button type="button" onClick={() => dispatch(increment())}>
                count is: {count}
            </button>
        </p>
    )
}

export default Counter;