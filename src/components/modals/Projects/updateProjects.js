import {toast} from "react-toastify";
import { useState, useEffect} from "react";
import Loading from "../../loading";
import { MdClose } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { api } from "../../../services/apiClient";

export default function UpdateProjects({close, getIndex, projects}){

    const [disableButton, setDisableButton] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [gitInput, setGitInput] = useState('');
    const [deployInput, setDeployInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);

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

    const handleUpdate = async(e) =>{
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
        data.append('Id', id);
        try{
            setDisableButton(true);
            await api.put('/project', data);
            close();
        }catch(err){
            toast.warning(err.response.data.error);
        }finally{
            setDisableButton(false)
        }
    }
    
    useEffect(()=>{
        try{
            setGitInput(projects[getIndex].GitHub);
            setDeployInput(projects[getIndex].Deploy);
            setImg(projects[getIndex].Image);
            setDescriptionInput(projects[getIndex].Description);
            setId(projects[getIndex].Id);
            setNameInput(projects[getIndex].Name);
            setImageSrc(projects[getIndex].Image);
        }catch(err){
            close();
        }finally{
            setLoading(false)
        }
    },[]);

    if (loading){
        return (
        <Loading/>
        )
    }

    return(
        <article className="modalContainer">
            <div className="modalTop">
                <h2>Projects</h2>
                <button onClick={close}><MdClose/></button>
            </div>

            <form onSubmit={handleUpdate}>
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
                    <button disabled={disableButton} type="submit">Update</button>
                </div>
            </form>

        </article>
    )
}