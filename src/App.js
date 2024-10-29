import Container from "./Container";
import "./styles.css";
import RightArrow from "./right-arrow.png";
import LeftArrow from "./left-arrow.png";
import { transferData } from "../src/data";
import { useEffect, useState } from "react";

export default function App() {
  const [firstContainerData, setFirstContainerData] = useState(transferData);
  const [secondContainerData, setSecondContainerData] = useState([]);

  const animateShift = (direction, callback) => {
    const container = direction === 'right' ? '.left-container' : '.right-container';
    const items = document.querySelectorAll(`${container} .item.true`);

    items.forEach(item => {
      direction === 'right' ? item.classList.add('item-exit') : item.classList.add('item-exit-right');
    });

    setTimeout(() => {
      callback();
      items.forEach(item => {
        direction === 'right' ? item.classList.remove('item-exit') : item.classList.remove('item-exit-right');
        item.classList.add('item-enter');
      });

      setTimeout(() => {
        items.forEach(item => {
          item.classList.remove('item-enter');
        });
      }, 500); // Match the duration of CSS transition
    }, 500); // Match the duration of CSS transition
  };

  const shiftToRight = () => {
    const itemsToTransfer = firstContainerData.filter(item => item.checked);
    if(itemsToTransfer.length > 0) {
      animateShift('right', () => {
        const updatedItemsToTransfer = itemsToTransfer.map(item => ({
          ...item,
          checked: false
        }));

        setSecondContainerData([...secondContainerData, ...updatedItemsToTransfer]);
        setFirstContainerData(firstContainerData.filter(item => !item.checked));
      });
    } 
  };

  const shiftToLeft = () => {
    const itemsToTransfer = secondContainerData.filter(item => item.checked);
    if(itemsToTransfer.length > 0) {
      animateShift('left', () => {
        const updatedItemsToTransfer = itemsToTransfer.map(item => ({
          ...item,
          checked: false
        }));
        setFirstContainerData([...firstContainerData, ...updatedItemsToTransfer]);
        setSecondContainerData(secondContainerData.filter(item => !item.checked));
      })
    } 
  };

  return (
    <div className="App">

      <div className="faq-accordion row">

        <div className="left-container">
          <Container type="first" firstContainerData={firstContainerData} secondContainerData={secondContainerData} setFirstContainerData={setFirstContainerData} />
        </div>

        <div className="controls-container">
          <div style={{margin: "1em"}}>
            <button onClick={shiftToRight}><img src={RightArrow} alt="right-arrow" width="50"/></button>
          </div>
          <div>
            <button onClick={shiftToLeft}><img src={LeftArrow} alt="left-arrow" width="50"/></button>
          </div>
        </div>

        <div className="right-container">
          <Container type="second" firstContainerData={firstContainerData} secondContainerData={secondContainerData} setSecondContainerData={setSecondContainerData} />
        </div>

      </div>
    </div>
  );
}

// Question From AlgoChurn
// https://www.algochurn.com/frontend/transfer-list
