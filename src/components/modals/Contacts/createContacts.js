import { useState } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";

export default function CreateContacts ({close}) {
    const [check, setChecked] = useState(false);
    const [plataform, setPlataform] = useState('');
    const [url, setUrl] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    
    const handleCreate = async (e) =>{
        e.preventDefault();
        if (!url || !plataform){
            toast.warning('Digite todos os campos.')
        }
        try{
            setDisableButton(true);
            await api.post('contact',{
                TypePhone:check,
                Direction:url,
                Plataform:plataform
            });
            close()
        }catch(err){
            toast.warning(err.response.data.error);
        }finally{
            setDisableButton(false)
        }
    }

    return(
        <article className="modalContainer">
            <div className="modalTop">
                <h2>Create Contact</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleCreate}> 
                <label className="labelInput">
                    <span>Platform</span>
                    <input placeholder="Ex: Instagram" value={plataform} onChange={(e)=>setPlataform(e.target.value)}/>
                </label>
                <label className="labelInput">
                    <span>Address</span>
                    <input placeholder="Ex: www.gabriel.com" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </label>

                <label className="modalCheckArea">
                    <input type="checkbox" checked={check} onChange={(e)=>setChecked(e.target.checked)} />
                    <span className="styleInput"></span>
                    <span>Phone</span>
                </label>

                <div className="buttonArea">
                    <button disabled={disableButton} type="submit">Create</button>
                </div>
            </form>

        </article>
    )
}