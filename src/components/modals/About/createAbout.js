import {toast} from "react-toastify";
import { useState} from "react";

import { MdClose } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { api } from "../../../services/apiClient";

export default function CreateAbout({close}){
    const [disableButton, setDisableButton] = useState(false);
    const [nickInput, setNickInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [about1Input, setAbout1Input] = useState('');
    const [about2Input, setAbout2Input] = useState('');

    const [img, setImg] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    
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

    const handleCreate = async(e) =>{
        e.preventDefault();
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
            setDisableButton(true);
            await api.post('/about', data);
            close();
        }catch(err){
            toast.warning(err.response.data.error);
        }finally{
            setDisableButton(false)
        }
    }
    
    
    return(
        <article className="modalContainer">
            <div className="modalTop">
                <h2>About me</h2>
                <button onClick={close}><MdClose/></button>
            </div>

            <form onSubmit={handleCreate}>
                <div >
                    <label className="labelInput labelInputFile">
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} />
                        <FaImages className="svgimage"/>
                    </label>
                    
                    {imageSrc !== null?(
                    <img src={imageSrc} alt="profile preview" className="preview"/>
                    ):null}
                </div>
                
                <label className="labelInput">
                    <span>Nick</span>
                    <input value={nickInput} onChange={(e)=>setNickInput(e.target.value)}/>
                </label>
                
                <label className="labelInput">
                    <span>Name</span>
                    <input value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
                </label>

                <label className="labelInput">
                    <span>Title</span>
                    <input value={titleInput} onChange={(e)=>setTitleInput(e.target.value)}/>
                </label>

                <label className="labelInput">
                    <span>About1</span>
                    <textarea value={about1Input} onChange={(e)=>setAbout1Input(e.target.value)}/>
                </label>

                <label className="labelInput">
                    <span>About2</span>
                    <textarea value={about2Input} onChange={(e)=>setAbout2Input(e.target.value)}/>
                </label>

                <div className="buttonArea ">
                    <button disabled={disableButton} type="submit">Create</button>
                </div>
            </form>

        </article>
    )
}