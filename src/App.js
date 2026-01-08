import React, { useState, useRef, createContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./App.css";
import Form from "./components/Form";
import generateValues from "./generateValues";
import Modal from "./components/Modal";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  animation: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number",
      },
    },
    x: {
      title: {
        display: true,
        text: "Iteration",
      },
    },
  },
  title: {
    display: true,
    text: "Collatz Conjecture Visualisation",
  },

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        // labelColor: function (context) {
        //   return {
        //     borderColor: "rgb(0, 0, 255)",
        //     backgroundColor: "rgb(255, 0, 0)",
        //     borderWidth: 2,
        //     borderDash: [2, 2],
        //     borderRadius: 2,
        //   };
        // },
        labelTextColor: function (context) {
          return "#ffff";
        },
      },
    },
  },
};

function App() {
  let [formData, setFormData] = useState(null);
  let isNegative = false;
  const modal = useRef();

  

  const handleInputChange = (num) => {
    let values = generateValues(num);
    let preferences = {
      negative: false,
      numGraphs : 1
    }
    setFormData(() => {
      let eType = null
      
      if (num < 0) {
        eType = 'negative'
        if (!preferences.negative) {
          modal.current.open(eType)
        }
        
      }
      return {
        isNegative: num < 0,
        number: num,
        errorType: eType,
        data: {
          labels: values.map((number, index) => index),
          datasets: [
            {
              label: "Collatz Conjecture Visualisation",
              data: values,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
      };
    });
    console.log('input')
    console.log(formData)
  };

  return (
    <>
      <Modal ref={modal} errorNum={formData && formData.data.number}/>
      <Form onChange={handleInputChange} />
      {formData != null && (
        <Line data={formData.data} options={options} className="graph" />
      )}
    </>
  );
}

export default App;
