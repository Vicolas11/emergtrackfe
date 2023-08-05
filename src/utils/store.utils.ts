import { setUserData } from "../store/slices/auth.slice";
import store from "../store/store";

const handlePersistence = () => {
  // Manually trigger the persistence process
  store.getState()._persist.rehydrated = false;
  store.dispatch({ type: "persist/REHYDRATE" });
};

// Subscribe to store changes
export const manualPersistor = (newUserData: any) =>
  store.subscribe(() => {
    // Check if the relevant data has changed
    const previousUserData = store.getState().auth.userData;

    if (previousUserData !== newUserData) {
      store.dispatch(setUserData(newUserData));
      handlePersistence();
    }
  });
