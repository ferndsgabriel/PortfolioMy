import "./index.css";
import { useState, useEffect, useRef } from "react";

import { RiMore2Fill } from "react-icons/ri";

export default function CardProjets({name, url,description, git, deploy, deleteProjects, editProjects}){
    const [disabledInput, setDisabledInput] = useState(true);
    const [openMore, setOpenMore] = useState(false);
    const refOptions = useRef (null);
    const refButton = useRef (null);

    function openMoreFunction (){
        setOpenMore(true);
    }
    

    useEffect(() => {
        const thereClick = (e) => {
            if (!refOptions.current.contains(e.target) && !refButton.current.contains(e.target)) {
                setOpenMore(false); 
            }
        }
        if (openMore) {
            window.addEventListener("click", thereClick);
        } else {
            window.removeEventListener("click", thereClick);
        }
        return () => {
            window.removeEventListener("click", thereClick);
        };
    }, [openMore, setOpenMore, refOptions]);

    
    return(
        <article className="ProjectContainer">
            <div className="legend">
                <h1>{name}</h1>
                {disabledInput? (
                    <button onClick={openMoreFunction} ref={refButton}>
                    <RiMore2Fill />
                    </button>
                ):(
                    null
                )}

                {openMore?(
                    <span className="moreOption" ref={refOptions}>
                        <button><a href={git} target="_blank">GitHub</a></button>
                        <button><a href={deploy} target="_blank">Deploy</a></button>
                        <button onClick={deleteProjects}>Delete</button>
                        <button onClick={editProjects}>Edit</button>
                    </span>
                ):null}
            </div>

            <img src={url} alt={name}/>
            <p >{description}</p>
        </article>
    )
}