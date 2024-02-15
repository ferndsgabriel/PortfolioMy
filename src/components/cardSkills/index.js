import { MdModeEdit } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import "./index.css"

export default function CardSkills ({url, name, deleteSkill, updateSkill}){
    return(
        <article className="skillsContainer">
            <div className="left">
                <div className="imgMask">
                    <img src={url} alt={`${name} logo`}/>
                </div>
                <h2 translate="no">{name}</h2>
            </div>
            <div className="right">
                <button onClick={updateSkill}><MdModeEdit/></button>
                <button onClick={deleteSkill}><BiTrashAlt /></button>
            </div>
        </article>
    )
}