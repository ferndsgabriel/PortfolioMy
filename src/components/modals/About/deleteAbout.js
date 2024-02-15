import { MdClose } from "react-icons/md";
import { api } from "../../../services/apiClient";
import { toast } from "react-toastify";
import { useState } from "react";

export default function DeleteAbout({close}) {
    const [disableButton, setDisableButton] = useState(false);
    const handleDelete = async (e) =>{
        e.preventDefault();
        try{
            setDisableButton(true);
            await api.delete('about');
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
                <h2>Delete about</h2>
                <button onClick={close}><MdClose/></button>
            </div>
            <form onSubmit={handleDelete}> 
                <span className="legendDelete">Do you want to delete about?</span>
                <div className="buttonArea">
                    <button disabled={disableButton} type="submit">Delete</button>
                </div>
            </form>

        </article>
    )
}