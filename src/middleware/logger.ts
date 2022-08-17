const logger =
  (store: { getState: () => any }) =>
  (next: (arg0: any) => any) =>
  (action: { type: any }) => {
    console.group(action.type);
    console.log("The action: ", action);
    const returnValue = next(action);
    console.log("The new state: ", store.getState());
    console.groupEnd();
    return returnValue;
  };

export default logger;
