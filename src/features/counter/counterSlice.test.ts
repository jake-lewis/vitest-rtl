import counterReducer, { CounterState, decrement, increment, incrementByAmount } from './counterSlice';

describe('counter reducer', () => {
    const initialState: CounterState = {
        value: 1
    };

    test('count defaults to 0', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual({ value: 0 });
    });

    test('uses initialState', () => {
        expect(counterReducer(initialState, { type: 'unknown' })).toEqual({ value: 1 });
    });

    test('increment adds 1 to state', () => {
        expect(counterReducer(initialState, increment())).toEqual({ value: 2 });
    });

    test('decrement subtracts 1 from state', () => {
        expect(counterReducer(initialState, decrement())).toEqual({ value: 0 });
    });

    test('incrementByAmount(6) adds that amount to state', () => {
        expect(counterReducer(initialState, incrementByAmount(6)).value).toBe(7);
    });

    test('random value for incrementByAmount() adds that amount to state', () => {
        const amount = Math.floor(Math.random() * 101);
        expect(counterReducer(initialState, incrementByAmount(amount)).value).toBe(1 + amount);
    });
})