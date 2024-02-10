import "./index.css";
import {useContext, useState} from "react";
import {AuthContext} from "../../middleware/authLogin";
import { toast } from "react-toastify";

export default function Home(){
    const {Login} = useContext(AuthContext);
    const [pass, setPass] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!pass){
            toast.warning('Digite sua senha.');
            return;
        }
        await Login(pass);
    }
    return(
        <main className="homeContainer">
            <h1>Portfólio</h1>
            <form onSubmit={handleLogin}>
                <input type="password" placeholder="Digite a senha" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                <button type="submit">Entrar</button>
            </form>
        </main>
    )
}