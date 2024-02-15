import "./index.css";
import { useState, useEffect, useRef } from "react";

import { RiMore2Fill } from "react-icons/ri";
import {FaXmark,FaCheck, FaImages} from "react-icons/fa6";
import {toast} from "react-toastify";
import { api } from "../../services/apiClient";

export default function CardAbout({url, name, nick, title, about1, about2, deleteAbout}){
    const [disabledInput, setDisabledInput] = useState(true);
    const [openMore, setOpenMore] = useState(false);
    const refOptions = useRef (null);
    const refButton = useRef (null);
    const [nickInput, setNickInput] = useState(nick || '');
    const [nameInput, setNameInput] = useState(name || '');
    const [titleInput, setTitleInput] = useState(title || '');
    const [about1Input, setAbout1Input] = useState(about1 || '');
    const [about2Input, setAbout2Input] = useState(about2 || '');
    const [img, setImg] = useState(url);
    const [imageSrc, setImageSrc] = useState(url);

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
    
    const svgIcon = () =>{
        if (!disabledInput){
            return (
                <FaImages className="svgimage" style={{cursor:'pointer'}}/>
            )
        }
        else{
            return;
        }
    }

    const handleImage = (e) =>{
        let file = e.target.files[0];
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg"){
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
            setImg(file);
        }else{
            toast.warning('Formato inválido.');
            return;
        }
    }

    const handleUpdate = async () =>{
        if (!nickInput || !nameInput || !titleInput || !about1Input || !about2Input ||!img){
            toast.warning('Envie todos os dados.');
        }
        const data = new FormData();
        data.append('image', img);
        data.append('Nick', nickInput);
        data.append('Title', titleInput);
        data.append('About1', about1Input);
        data.append('About2', about2Input);
        data.append('Name', nameInput);
        try{
            await api.put('/about', data);
        }catch(err){
            toast.warning(err.response.data.error);
        }
    }

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
                        <button onClick={handleUpdate}><FaCheck/></button>
                    </div>
                )}

                {openMore?(
                    <span className="moreOption" ref={refOptions}>
                        <button onClick={deleteAbout}>Delete</button>
                        <button onClick={changeDisabled}>Edit</button>
                    </span>
                ):null}

            </div>

            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <label className="labelInput labelInputFile">
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} style={{display:'none'}}/>
                    {svgIcon()}
                </label>
                
                {imageSrc !== null?(
                <img src={imageSrc} alt="profile preview" className="preview"/>
                ):null}
            </div>

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