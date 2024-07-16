import { DEPOSIT, WITHDRAW } from "../actionTypes.js";

export function withdraw(amount) {
  return {
    type: WITHDRAW,
    payload: {
      amount: amount,
    },
  };
}

export function desposit(amount) {
  return async (dispatch, getState) => {
    console.log(`account.action: `,getState());
    const data = await api(amount);
    dispatch({ type: DEPOSIT, payload: { amount: data } });
  };
}

export function api(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}
