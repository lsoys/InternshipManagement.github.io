import "../../css/common.css";

export default function PageTitle(props) {
    return <div className="pageTitle">
        {props.children}
        <span>{props.title}</span>
    </div>
}