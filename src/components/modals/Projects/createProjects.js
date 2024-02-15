import {toast} from "react-toastify";
import { useState} from "react";

import { MdClose } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { api } from "../../../services/apiClient";

export default function CreateProjects({close}){
    const [disableButton, setDisableButton] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [gitInput, setGitInput] = useState('');
    const [deployInput, setDeployInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');

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
        if (!gitInput || !nameInput || !deployInput || !descriptionInput || !img){
            toast.warning('Envie todos os dados.');
        }
        const data = new FormData();
        data.append('image', img);
        data.append('GitHub', gitInput);
        data.append('Deploy', deployInput);
        data.append('Description', descriptionInput);
        data.append('Name', nameInput);
        try{
            setDisableButton(true);
            await api.post('/project', data);
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
                <h2>Projects</h2>
                <button onClick={close}><MdClose/></button>
            </div>

            <form onSubmit={handleCreate}>
                <div >
                    <label className="labelInput labelInputFile">
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} />
                        <FaImages className="svgimage"/>
                    </label>
                    
                    {imageSrc !== null?(
                    <img src={imageSrc} alt="profile preview" className="previewProjects"/>
                    ):null}
                </div>
                
                <label className="labelInput">
                    <span>Name</span>
                    <input value={nameInput} onChange={(e)=>setNameInput(e.target.value)}/>
                </label>
                
                <label className="labelInput">
                    <span>GitHub</span>
                    <input value={gitInput} onChange={(e)=>setGitInput(e.target.value)}/>
                </label>

                <label className="labelInput">
                    <span>Deploy</span>
                    <input value={deployInput} onChange={(e)=>setDeployInput(e.target.value)}/>
                </label>

                <label className="labelInput">
                    <span>Description</span>
                    <textarea value={descriptionInput} onChange={(e)=>setDescriptionInput(e.target.value)}/>
                </label>

                <div className="buttonArea ">
                    <button disabled={disableButton} type="submit">Create</button>
                </div>
            </form>

        </article>
    )
}