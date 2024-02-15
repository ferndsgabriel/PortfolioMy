import { MdModeEdit } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import "./index.css"

export default function CardContacts ({redirect, name, boolean, deleteContacts, updateContacts}){
    return(
        <article className="contactsContainer">
            <div className="left">
                <h2 translate="no">{name}</h2>
                {boolean ? (
                    <span>Phone: yes</span>
                ):(
                    <span>Phone: no</span>

                )}
                {boolean?(
                    <a href={`tel:${redirect}`} target="_blank">{redirect}</a>
                ):(
                    <a href={redirect} target="_blank">{redirect}</a>
                )}
            </div>
            <div className="right">
                <button onClick={updateContacts}><MdModeEdit/></button>
                <button onClick={deleteContacts}><BiTrashAlt /></button>
            </div>
        </article>
    )
}