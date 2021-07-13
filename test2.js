import React, { useReducer } from "react";
import ParameterContext from "./parameterContext";
import ParameterReducer from "./parameterReducer";
import {
  TOGGLE_MODAL,
  SET_PAGE,
  SET_COLUMN_NAME,
  SET_FAVOURITE_TAB,
  SET_TRADATHON_LISTINGS_TAB,
  SET_TIME_IN_CHART,
} from "../types";
const ParameterState = ({ children }) => {
  const initialState = {
    modal: false,
    page: 0,
    columnName: null,
    favouriteTab: "coins",
    listingTab: "upcoming",
    timeInChart: "ytd",
  };
  const [state, dispatch] = useReducer(ParameterReducer, initialState);
  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };
  const setPage = (p) => {
    dispatch({ type: SET_PAGE, payload: p });
  };
  const setColumnName = (name) => {
    dispatch({ type: SET_COLUMN_NAME, payload: name });
  };
  const setFavouriteTab = (tabName) => {
    dispatch({ type: SET_FAVOURITE_TAB, payload: tabName });
  };
  const setTradathonListingTab = (tabName) => {
    dispatch({ type: SET_TRADATHON_LISTINGS_TAB, payload: tabName });
  };
  const setTimeInChart = (time) => {
    dispatch({ type: SET_TIME_IN_CHART, payload: time });
  };
  return (
    <ParameterContext.Provider
      value={{
        toggleModal,
        setPage,
        setColumnName,
        setFavouriteTab,
        setTradathonListingTab,
        setTimeInChart,
        modal: state.modal,
        columnName: state.columnName,
        page: state.page,
        favouriteTab: state.favouriteTab,
        listingTab: state.listingTab,
        timeInChart: state.timeInChart,
      }}
    >
      {children}
    </ParameterContext.Provider>
  );
};
 
export default ParameterState;

const getSparklines = async (coinString, interval = "ytd") => {
    console.log(new Date().getTime() + "getSpark");
    const currentDate = formatDate(1, timeInChart, interval);
    const backDate = formatDate(2, timeInChart, interval);
    console.log(currentDate, backDate);
    let url = `https://api.nomics.com/v1/currencies/sparkline?key=4f124a33438b875c8df1bb38cb8e809f76c45ecb&ids=${
      coinString ? coinString : "1"
    }&start=${backDate}&end=${currentDate}`;
    console.log(url);
    try {
      const { data } = await axios.get(url);
 
      coinString.length > 8
        ? dispatch({ type: GET_CRYPTO_COINS_SPARKLINES, payload: data })
        : dispatch({ type: GET_SINGLE_CRYPTO_COINS_SPARKLINES, payload: data });
      return data;
    } catch (err) {
      dispatch({
        type: GET_GLOBAL_TICKER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };