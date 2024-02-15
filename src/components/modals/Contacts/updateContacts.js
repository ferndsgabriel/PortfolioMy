import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import Loading from "../../loading";

export default function UpdateContacts ({close, getIndex, contacts}) {
    const [loading, setLoading] = useState(true);
    const [check, setChecked] = useState(false);
    const [plataform, setPlataform] = useState();
    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(()=>{
        try{
            setChecked(contacts[getIndex].TypePhone);
            setPlataform(contacts[getIndex].Plataform);
            setId(contacts[getIndex].Id);
            setUrl(contacts[getIndex].Direction);
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


    const handleUpdate = async (e) =>{
        e.preventDefault();
        if (!url || !plataform || !id){
            toast.warning('Digite todos os campos.')
        }
        try{
            setDisableButton(true);
            await api.put('contact',{
                TypePhone:check,
                Direction:url,
                Plataform:plataform,
                Id:id
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
                <h2>Update Contact</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleUpdate}> 
                <label className="labelInput">
                    <span>Platform</span>
                    <input placeholder="Ex: Instagram" value={plataform} onChange={(e)=>setPlataform(e.target.value)}/>
                </label>
                <label className="labelInput">
                    <span>Address</span>
                    <input placeholder="Ex: www.gabriel.com" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                </label>

                <label className="modalCheckArea">
                    <input type="checkbox" checked={check} onChange={(e)=>setChecked(e.target.checked)}/>
                    <span className="styleInput"></span>
                    <span>Phone</span>
                </label>

                <div className="buttonArea">
                    <button disabled={disableButton} type="submit">Update</button>
                </div>
            </form>

        </article>
    )
}