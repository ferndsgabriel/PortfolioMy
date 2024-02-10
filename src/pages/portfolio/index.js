import "./index.css"
import Header from "../../components/header";
import {useState, useEffect, useRef} from "react";
import {api} from "../../services/apiClient";
import CardSkills from "../../components/cardSkills";
import CardContacts from "../../components/cardContacts";
import CardAbout from "../../components/cardAbout";
import CardProjets from "../../components/cardProjects";
import Loading from "../../components/loading";

import { FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";


export default function Portfolio(){
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState({});
    const [skills, setSkills] = useState([{}]);
    const [contacts, setContacts] = useState([{}]);
    const [projects, setProjects] = useState([{}]);

    const containerRef = useRef(null);
    const projectsRef = useRef(null);

    const [needButton, setNeedButton] = useState(false);

    async function getDates (){
        await api.get('/date').then((res)=>{
            try{
                setAbout(res.data.About);
                setSkills(res.data.Skills);
                setContacts(res.data.Contacts);
                setProjects(res.data.Projects);
            }
            catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        })
    };

    useEffect(()=>{
        getDates ();
    },[]);

    useEffect(() => {
        function handleResize() {
            if (containerRef.current?.clientWidth < projectsRef.current?.clientWidth) {
                console.log('é');
            } else {
                console.log('não é');
            }
        }
    
        // Adiciona um ouvinte de evento de redimensionamento à janela
        window.addEventListener('resize', handleResize);
    
        // Executa a verificação inicial quando o componente é montado
        handleResize();
    
        // Executado quando o componente é desmontado para remover o ouvinte de evento
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef, projectsRef]); // Certifique-se de passar quaisquer dependências que você está usando dentro do useEffect
    
    

    async function handleDeleteSkill(){

    }
    
    async function handleUpdateSkill(){

    }
    async function handleDeleteContacts(){

    }
    
    async function handleUpdateContacts(){

    }
    if (loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <>  
            <Header value={about.Nick}/>
            <main className="container">
                <section className="sectionCard">
                    <div className="legend">
                        <h1>Skills</h1>
                        <button><FaPlus/></button>
                    </div>
                    {skills.length > 0 ? (
                        <div className="cards">
                            {skills.map((item, index)=>{
                                return(
                                    <CardSkills key={index} url={item.Icon} name={item.Name} deleteSkill={handleDeleteSkill} updateSkill={handleUpdateSkill}/>
                                )
                            })}
                        </div>
                    ):(
                        <span>
                            You did not create skills.
                        </span>
                    )}
                </section>

                <section className="sectionCard">
                    <div className="legend">
                        <h1>Contacts</h1>
                        <button><FaPlus/></button>
                    </div>
                    {contacts.length > 0 ? (
                        <div className="cards">
                            {contacts.map((item, index)=>{
                                return(
                                    <CardContacts key={index} redirect={item.Direction} name={item.Plataform} boolean={item.TypePhone}
                                    deleteContacts={handleDeleteContacts} updateContacts={handleUpdateContacts}/>
                                )
                            })}
                        </div>
                    ):(
                        <span>
                            You did not create contacts.
                        </span>
                    )}
                </section>

                <section className="sectionAbout">
                    {about ?(
                        <CardAbout url={about.ProfilePhoto} name={about.Name} nick={about.Nick} title={about.Title}
                        about1={about.About1} about2={about.About2}/>
                    ):(
                        <></>
                    )}
                </section>

                
                <section className="sectionCard">
                    <div className="legend">
                        <h1>Projects</h1>
                        <button><FaPlus/></button>
                    </div>
                    <div style={{position:'relative'}}>
                        {projects.length > 0 ? (
                            <div className="cardsProjects noScroll" ref={containerRef}>
                                {projects.map((item, index)=>{
                                    return(
                                        <div key={index} className="sizeCardProjects noScroll" ref={projectsRef}>
                                            <div style={{width:'420px'}}>
                                                <CardProjets name={item.Name} url={item.Image} description={item.Description}
                                                git={item.GitHub} deploy={item.Deploy}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ):(
                            <span>
                                You did not create projects.
                            </span>
                        )}
                        {needButton?(
                            <>
                                <button className="buttonLeft"><MdKeyboardArrowLeft/></button>
                                <button className="buttonRight"><MdKeyboardArrowRight/></button>
                            </>
                        ):null}
                    </div>
                </section>

                <article>
                    <button>SingOut</button>
                </article>

            </main>
        </>
    )
}