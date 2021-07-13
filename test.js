import React, { useContext, useState, useEffect } from "react";
import Chart from "../components/Chart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CryptoContext from "../context/crypto/cryptoContext";
import ParameterContext from "../context/parameter/parameterContext";
import moment from "moment";
const SingleCryptoChart = ({ symbol }) => {
  const [price, setPrice] = useState([]);
  const [dates, setDates] = useState([]);
 
  const {
    cryptoStr,
    getSparklines,
    sparklineData,
    setCryptostr,
    clearSparklines,
    singleSparklineData,
  } = useContext(CryptoContext);
  const { setTimeInChart, timeInChart } = useContext(ParameterContext);
  useEffect(() => {
    setTimeInChart("ytd");
  }, []);
  useEffect(() => {
    // clearSparklines();
    // if(!sparklineData||!sparklineData.length>0)
    if (cryptoStr) {
      console.log(cryptoStr, sparklineData);
      setTimeout(() => getSparklines(symbol), 1000);
    }
 
    if (symbol) {
      setCryptostr(symbol);
    }
  }, [timeInChart, cryptoStr]);
  const options = {
    title: {
      text: "My chart",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        second: "%H:%M:%S",
        minute: "%H:%M",
        hour: "%H:%M",
        day: "%e %b",
        week: "%e %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    caption: {
      text: "CoinStorey",
    },
 
    series: [
      {
        data:
          singleSparklineData &&
          singleSparklineData[0]?.currency === symbol &&
          singleSparklineData[0].timestamps.map((i, index) => {
            return [
              new Date(i).getTime(),
              Number(Number(singleSparklineData[0]?.prices[index]).toFixed(2)),
            ];
          }),
      },
    ],
  };
 
  return (
    <div className="SingleCryptoChart">
      <div className="SingleCryptoChart__container">
        <header>
          <section className="SingleCryptoChart__header__left"></section>
          <section className="SingleCryptoChart__header__right">
            <div onClick={() => setTimeInChart("1d")}>1d</div>
            <div onClick={() => setTimeInChart("7d")}>7d</div>
            <div onClick={() => setTimeInChart("1m")}>1m</div>
            <div onClick={() => setTimeInChart("3m")}>3m</div>
            <div onClick={() => setTimeInChart("1y")}>1y</div>
            <div onClick={() => setTimeInChart("ytd")}>YTD</div>
          </section>
        </header>
        <section>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </section>
      </div>
    </div>
  );
};
 
export default SingleCryptoChart;