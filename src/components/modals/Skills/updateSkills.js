import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import Loading from "../../loading";

export default function UpdateSkills ({close, getIndex, skills}) {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(()=>{
        try{
            setName(skills[getIndex].Name);
            setIcon(skills[getIndex].Icon);
            setId(skills[getIndex].Id);
            setImageSrc(skills[getIndex].Icon);
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

    const handleUpdate = async (e) =>{
        e.preventDefault();
        if (!icon || !name || !id){
            toast.warning('Preencha todos os campos.');
            return;
        }
        try{
            setDisableButton(true);
            const data = new FormData();
            data.append('image', icon);
            data.append('Name', name);  
            data.append('Id', id);       
            await api.put('skills', data);
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
                <h2>Update Skill</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleUpdate}> 
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
                <div className="buttonArea">
                    <button disabled={disableButton} type="submit">Update</button>
                </div>
                
            </form>

        </article>
    )
}