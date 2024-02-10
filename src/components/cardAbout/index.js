import "./index.css";
import { useState, useEffect, useRef } from "react";

import { RiMore2Fill } from "react-icons/ri";
import {FaXmark,FaCheck} from "react-icons/fa6";

export default function CardAbout({url, name, nick, title, about1, about2}){
    const [disabledInput, setDisabledInput] = useState(true);
    const [openMore, setOpenMore] = useState(false);
    const refOptions = useRef (null);
    const refButton = useRef (null);
    const [nickInput, setNickInput] = useState(nick || '');
    const [nameInput, setNameInput] = useState(name || '');
    const [titleInput, setTitleInput] = useState(title || '');
    const [about1Input, setAbout1Input] = useState(about1 || '');
    const [about2Input, setAbout2Input] = useState(about2 || '');

    function openMoreFunction (){
        setOpenMore(true);
    }
    
    function changeDisabled () {
        setOpenMore(false);
        setDisabledInput(false)
    }

    function cancelChanges(){
        setDisabledInput(true);
        setOpenMore(false);
        setNickInput(nick);
        setNameInput(name);
        setTitleInput(title);
        setAbout1Input(about1);
        setAbout2Input(about2);    
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
        <article className="AboutContainer">
            <div className="legend">
                <h1>About me</h1>
                {disabledInput? (
                    <button onClick={openMoreFunction} ref={refButton}>
                    <RiMore2Fill/>
                    </button>
                ):(
                    <div className="options">
                        <button onClick={cancelChanges}><FaXmark/></button>
                        <button><FaCheck/></button>
                    </div>
                )}

                {openMore?(
                    <span className="moreOption" ref={refOptions}>
                        <button>Deletar</button>
                        <button onClick={changeDisabled}>Editar</button>
                        <button onClick={()=>setOpenMore(false)}>Cancelar</button>
                    </span>
                ):null}

            </div>

            <img src={url} alt={name}/>

            <div className="infos">
                <h3>Nick</h3>
                <input disabled={disabledInput} value={nickInput} onChange={(e)=>setNickInput(e.target.value)}/>
            </div>

            <div className="infos">
                <h3>Name</h3>
                <input disabled={disabledInput} value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
            </div>

            <div className="infos">
                <h3>Title</h3>
                <input disabled={disabledInput} value={titleInput} onChange={(e)=>setTitleInput(e.target.value)}/>
            </div>

            <div className="infos">
                <h3>About1</h3>
                <textarea disabled={disabledInput} value={about1Input} onChange={(e)=>setAbout1Input(e.target.value)}/>
            </div>

            <div className="infos">
                <h3>About2</h3>
                <textarea style={{height:'160px'}}
                disabled={disabledInput} value={about2Input} onChange={(e)=>setAbout2Input(e.target.value)}/>
            </div>
        </article>
    )
}