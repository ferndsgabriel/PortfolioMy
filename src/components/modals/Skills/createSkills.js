import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";

export default function CreateSkills ({close}) {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    
    const handleImage = (e) =>{
        let file = e.target.files[0];
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg"){
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
            setIcon(file);
        }else{
            toast.warning('Formato inválido.');
            return;
        }
    }

    const handleCreate = async (e) =>{
        e.preventDefault();
        if (!icon || !name){
            toast.warning('Preencha todos os campos.');
            return;
        }
        try{
            setDisableButton(true);
            const data = new FormData();
            data.append('image', icon);
            data.append('Name', name);         
            await api.post('skills', data);
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
                <h2>Create Skill</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleCreate}> 
                <label className="labelInput">
                    <span>Name</span>
                    <input placeholder="Ex: JavaScript" value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <div style={{display:'flex', alignItems:'start '}}>
                    <label className="labelInput labelInputFile">
                        <span>Icon</span>
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} />
                        <FaImages className="svgimage"/>
                    </label>
                    
                    {imageSrc !== null?(
                    <img src={imageSrc} alt="icon preview" className="preview"/>
                    ):null}
                </div>
                <div className="buttonArea ">
                    <button disabled={disableButton} type="submit">Create</button>
                </div>
                
            </form>

        </article>
    )
}