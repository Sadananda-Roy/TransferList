import "./styles.css";

export default function Checkbox(props) {
    const {title, id, checked, onClick} = props;
    return (
        <div className={`item checkbox ${checked}`} onClick={onClick}>
            {title} {checked ? 'T' : 'F'}
        </div>
    );
}

// Question From AlgoChurn
// https://www.algochurn.com/frontend/transfer-list
