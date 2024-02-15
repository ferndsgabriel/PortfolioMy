import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import Loading from "../../loading";

export default function DeleteSkills({close, getIndex, skills}) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState();
    const [id, setId] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(()=>{
        try{
            setName(skills[getIndex].Name);
            setId(skills[getIndex].Id);
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


    const handleDelete = async (e) =>{
        e.preventDefault();
        if (!id){
            toast.warning('Digite todos os campos.')
        }
        try{
            setDisableButton(true);
            await api.delete('skills',{
                data:{
                    Id:id
                }
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
                <h2>Delete skill</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleDelete}> 
                <span className="legendDelete">Do you want to delete {name} ?</span>

                <div className="buttonArea">
                    <button disabled={disableButton} type="submit">Delete</button>
                </div>
            </form>

        </article>
    )
}