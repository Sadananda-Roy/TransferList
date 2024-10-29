import "./styles.css";
import Checkbox from "./Checkbox";

export default function Container(props) {
  const {type, firstContainerData, secondContainerData, setFirstContainerData, setSecondContainerData} = props;

  const onClickCheckbox = (containerNo, checkboxIndex) => {
    let temp_firstContainerData = [...firstContainerData];
    let temp_secondContainerData = [...secondContainerData];

    if(containerNo === 1) {
      temp_firstContainerData.map((item, index) => {
        if(index === checkboxIndex) {
          return item.checked = !item.checked;
        }
      });
      setFirstContainerData(temp_firstContainerData);
    }
    else {
      temp_secondContainerData.map((item, index) => {
        if(index === checkboxIndex) {
          return item.checked = !item.checked;
        }
      });
      setSecondContainerData(temp_secondContainerData);
    }
  };

  return (
    <>
      {
        type === 'first' ? (
          <div className="container">
            {firstContainerData.map((item, index) => {
              return <Checkbox key={item.title} title={item.title} id={item.id} checked={item.checked} onClick={() => onClickCheckbox(1, index)} />
            })}
          </div>
        ) : (
          <div className="container">
            {secondContainerData.map((item, index) => {
              return <Checkbox key={item.title} title={item.title} id={item.id} checked={item.checked} onClick={() => onClickCheckbox(2, index)}/>
            })}
          </div>
        )
      }
    </>
  );
}

// Question From AlgoChurn
// https://www.algochurn.com/frontend/transfer-list
