import "./index.css"
import Header from "../../components/header";
import {useState, useEffect, useRef, useLayoutEffect} from "react";
import {api} from "../../services/apiClient";
import { FaPlus } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import CardSkills from "../../components/cardSkills";
import CardContacts from "../../components/cardContacts";
import CardAbout from "../../components/cardAbout";
import CardProjets from "../../components/cardProjects";
import Loading from "../../components/loading";


import { Gmodal } from "../../components/modalTemplate";
import CreateSkills from "../../components/modals/Skills/createSkills";
import UpdateSkills from "../../components/modals/Skills/updateSkills";
import DeleteSkills from "../../components/modals/Skills/deleteSkills";

import CreateContacts from "../../components/modals/Contacts/createContacts";
import UpdateContacts from "../../components/modals/Contacts/updateContacts";
import DeleteContacts from "../../components/modals/Contacts/deleteContacts";

import CreateAbout from "../../components/modals/About/createAbout";
import DeleteAbout from "../../components/modals/About/deleteAbout";

import CreateProjects from "../../components/modals/Projects/createProjects";
import UpdateProjects from "../../components/modals/Projects/updateProjects";
import DeleteProjects from "../../components/modals/Projects/deleteProjects";

import { singOut } from "../../middleware/authLogin";

export default function Portfolio(){
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState({});
    const [skills, setSkills] = useState([{}]);
    const [contacts, setContacts] = useState([{}]);
    const [projects, setProjects] = useState([{}]);

    const containerRef = useRef(null);
    const projectsRef = useRef(null);

    const [needButton, setNeedButton] = useState(false);

    const [clickedIndex, setClickedIndex] = useState ();

    const [isOpenSkills, setIsOpenSkills] = useState(false);
    const [isOpenEditSkills, setIsOpenEditSkills] = useState(false);
    const [isOpenDeleteSkills, setIsOpenDeleteSkills] = useState(false);

    const [isOpenContacts, setIsOpenContacts] = useState(false);
    const [isOpenEditContacts, setIsOpenEditContacts] = useState(false);
    const [isOpenDeleteContacts, setIsOpenDeleteContacts] = useState(false);

    const [isOpenAbout, setIsOpenAbout] = useState(false);
    const [isOpenDeleteAbout, setIsOpenDeleteAbout] = useState(false);

    const [isOpenProjects, setIsOpenProjects] = useState(false);
    const [isOpenEditProjects, setIsOpenEditProjects] = useState(false);
    const [isOpenDeleteProjects, setIsOpenDeleteProjects] = useState(false);

    async function getDates (){
        try{
            const res = await api.get('/date');
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
    };
    
    useEffect(() => {
        getDates();
    },[]);
    
    useEffect(() => {
        if (!loading) {
            function handleResize() {
                const containerWidth = containerRef.current?.offsetWidth;
                const projectsWidth = projectsRef.current?.scrollWidth;
                
                if (containerWidth && projectsWidth) {
                    if (projectsWidth > containerWidth) {
                        setNeedButton(true);
                    } else {
                        setNeedButton(false);
                    }
                }
            }
            handleResize();
        
            window.addEventListener('resize', handleResize);
            
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [containerRef, projectsRef, loading]);
    
    
    
    

    //-------------------------- contatos // -------------------------------
    const openModalContacts = () =>{
        setIsOpenContacts(true);
    }
    const closeModalContacts = () =>{
        setIsOpenContacts(false);
        getDates();
    }
    const openEditContact = (index) =>{
        setClickedIndex(index)
        setIsOpenEditContacts(true);
    }
    const closeEditContact = () =>{
        setClickedIndex(null);
        setIsOpenEditContacts(false);
        getDates();
    }
    const openDeleteContact = (index) =>{
        setClickedIndex(index)
        setIsOpenDeleteContacts(true);
    }
    const closeDeleteContact = () =>{
        setIsOpenDeleteContacts(false);
        getDates();
    }    
    //-------------------------- skills // -------------------------------
    const openModalSkills = () =>{
        setIsOpenSkills(true);
    }
    const closeModalSkills = () =>{
        setIsOpenSkills(false);
        getDates();
    }
    const openEditSkills = (index) =>{
        setClickedIndex(index)
        setIsOpenEditSkills(true);
    }
    const closeEditSkills = () =>{
        setClickedIndex(null);
        setIsOpenEditSkills(false);
        getDates();
    }
    const openDeleteSkills = (index) =>{
        setClickedIndex(index)
        setIsOpenDeleteSkills(true);
    }
    const closeDeleteSkills = () =>{
        setIsOpenDeleteSkills(false);
        getDates();
    }
    //-------------------------- about // -------------------------------
    const openModalAbout = () =>{
        setIsOpenAbout(true);
    }
    const closeModalAbout = () =>{
        setIsOpenAbout(false);
        getDates();
    }
    const openDeleteAbout = (index) =>{
        setClickedIndex(index)
        setIsOpenDeleteAbout(true);
    }
    const closeDeleteAbout = () =>{
        setIsOpenDeleteAbout(false);
        getDates();
    }

    //-------------------------- project // -------------------------------
    const openModalProjects = () =>{
        setIsOpenProjects(true);
    }
    const closeModalProjects = () =>{
        setIsOpenProjects(false);
        getDates();
    }
    const openEditProjects = (index) =>{
        setClickedIndex(index)
        setIsOpenEditProjects(true);
    }
    const closeEditProjects = () =>{
        setClickedIndex(null);
        setIsOpenEditProjects(false);
        getDates();
    }
    const openDeleteProjects = (index) =>{
        setClickedIndex(index)
        setIsOpenDeleteProjects(true);
    }
    const closeDeleteProjects = () =>{
        setIsOpenDeleteProjects(false);
        getDates();
    } 
    ///////////////////////////////////////////

    const scrollProjects =  (value) =>{
        if (containerRef.current){
            containerRef.current.scrollBy({
                top:0,
                left:value,
                behavior:'smooth'
            })
        }
    }

    if (loading){
        return(
            <Loading/>
        )
    }

    return(
        <>  
            {about?(
            <Header value={about.Nick}/>
            ):(
                null
            )}

            <main className="container">
                <section className="sectionCard">
                    <div className="legend">
                        <h1>Skills</h1>
                        <button onClick={openModalSkills}><FaPlus/></button>
                    </div>
                    {skills.length > 0 ? (
                        <div className="cards">
                            {skills.map((itemSkills, indexSkills)=>{
                                return(
                                    <CardSkills key={indexSkills}
                                    url={itemSkills.Icon} name={itemSkills.Name}
                                    deleteSkill={()=>openDeleteSkills(indexSkills)} 
                                    updateSkill={()=>openEditSkills(indexSkills)}/>
                                )
                            })}
                        </div>
                    ):(
                        <span>
                            You did not create skills.
                        </span>
                    )}
                    <Gmodal isOpen={isOpenSkills} onClose={closeModalSkills}>
                        <CreateSkills close={closeModalSkills}/>
                    </Gmodal>
                    <Gmodal isOpen={isOpenEditSkills} onClose={closeEditSkills}>
                        <UpdateSkills close={closeEditSkills} getIndex={clickedIndex} skills={skills}/>
                    </Gmodal>
                    <Gmodal isOpen={isOpenDeleteSkills} onClose={closeDeleteSkills}>
                        <DeleteSkills close={closeDeleteSkills} getIndex={clickedIndex} skills={skills}/>
                    </Gmodal>
                </section>

                <section className="sectionCard">
                    <div className="legend">
                        <h1>Contacts</h1>
                        <button onClick={openModalContacts}><FaPlus/></button>
                    </div>
                    {contacts.length > 0 ? (
                        <div className="cards">
                            {contacts.map((itemContacts, indexContacts)=>{
                                return(
                                    <CardContacts key={indexContacts} 
                                    redirect={itemContacts.Direction} 
                                    name={itemContacts.Plataform} 
                                    boolean={itemContacts.TypePhone}
                                    deleteContacts={()=>openDeleteContact(indexContacts)} 
                                    updateContacts={()=>openEditContact(indexContacts)}/>
                                )
                            })}
                        </div>
                    ):(
                        <span>
                            You did not create contacts.
                        </span>
                    )}
                    <Gmodal isOpen={isOpenContacts} onClose={closeModalContacts}>
                        <CreateContacts close={closeModalContacts}/>
                    </Gmodal>
                    <Gmodal isOpen={isOpenEditContacts} onClose={closeEditContact}>
                        <UpdateContacts close={closeEditContact} getIndex={clickedIndex} contacts={contacts}/>
                    </Gmodal>                      
                    <Gmodal isOpen={isOpenDeleteContacts} onClose={closeDeleteContact}>
                        <DeleteContacts close={closeDeleteContact} getIndex={clickedIndex} contacts={contacts}/>
                    </Gmodal>

                </section>
                
                {about ?(
                    <section className="sectionCard">
                        <CardAbout url={about.ProfilePhoto} name={about.Name} nick={about.Nick} title={about.Title}
                        about1={about.About1} about2={about.About2} deleteAbout={openDeleteAbout}/>
                    </section>
                ):(
                    <section className="sectionCard">
                        <div className="legend">
                            <h1>About</h1>
                            <button onClick={openModalAbout}><FaPlus/></button>
                        </div>
                    </section>
                )}
                <Gmodal isOpen={isOpenAbout} onClose={closeModalAbout}>
                    <CreateAbout close={closeModalAbout}/>
                </Gmodal>
                <Gmodal isOpen={isOpenDeleteAbout} onClose={closeDeleteAbout}>
                    <DeleteAbout close={closeDeleteAbout}/>
                </Gmodal>


                <section className="sectionCard">
                    <div className="legend">
                        <h1>Projects</h1>
                        <button onClick={openModalProjects}><FaPlus/></button>
                    </div>
                    <div style={{position:'relative'}}>
                        {projects.length > 0 ? (
                            <div className="cardsProjects  noScroll" ref={containerRef}>
                                <div className="sizeCardProjects" ref={projectsRef}>
                                    {projects.map((itemProjects, indexProjects) => {
                                        return (
                                            <div key={indexProjects} className="divProjects">
                                                <CardProjets
                                                    name={itemProjects.Name}
                                                    url={itemProjects.Image}
                                                    description={itemProjects.Description}
                                                    deleteProjects={() => openDeleteProjects(indexProjects)}
                                                    git={itemProjects.GitHub}
                                                    deploy={itemProjects.Deploy}
                                                    editProjects={() => openEditProjects(indexProjects)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        ):(
                            <span>
                                You did not create projects.
                            </span>
                        )}
                        {needButton?(
                            <>
                                <button className="buttonLeft" onClick={()=>scrollProjects(-200)}><MdKeyboardArrowLeft/></button>
                                <button className="buttonRight"  onClick={()=>scrollProjects(200)}><MdKeyboardArrowRight/></button>
                            </>
                        ):null}
                    </div>
                    <Gmodal isOpen={isOpenProjects} onClose={closeModalProjects}>
                        <CreateProjects close={closeModalProjects}/>
                    </Gmodal>
                    <Gmodal isOpen={isOpenEditProjects} onClose={closeEditProjects}>
                    <UpdateProjects close={closeEditProjects} getIndex={clickedIndex} projects={projects}/>
                    </Gmodal>
                    <Gmodal isOpen={isOpenDeleteProjects} onClose={closeDeleteProjects}>
                        <DeleteProjects close={closeDeleteProjects} projects={projects} getIndex={clickedIndex}/>
                    </Gmodal>
                </section>

                <article className="singout">
                    <button onClick={singOut}>SingOut</button>
                </article>

            </main>
        </>
    )
}