import { Link, useSearchParams } from "react-router-dom";

export default function Paginator({pages})
{
    const [, setParams] = useSearchParams();
    const renderedItems = [];
    for (let i=1; i <= pages; i++) renderedItems.push(<li key={i}><button onClick={()=>{setParams(`?page=${i}`)}}>{i}</button></li>);
    return <div><ul>{renderedItems}</ul></div>
}