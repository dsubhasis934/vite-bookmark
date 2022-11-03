import React, { useState } from 'react'
function Bookmark() {
    const [activeCurrentIndex, setActiveCurrentIndex] = useState();
    const [active, setactive] = useState(false);
    const [savedata, setsavedata] = useState([]);
    const [editId, seteditId] = useState(null);
    const [submitbutton, setsubmitbutton] = useState("save your bookmark");
    const [searchInput, setSearchInput] = useState("");
    const [filterdata, setfilterdata] = useState([]);
    const [inputdata, setinputdata] = useState({
        bookmark: "",
        date: "",
        tag: "",
        description: ""
    })


    let name, value;
    const updateData = (event) => {
        name = event.target.name;
        value = event.target.value;
        setinputdata({ ...inputdata, [name]: value })
    }


    const addItem = () => {
        if (inputdata === "") {
            alert("please enter your data");
        }
        else if (inputdata && submitbutton == "edit your bookmark") {
            setsavedata(
                savedata.map((elem, id) => {
                    if (id === editId) {
                        return {
                            ...elem,
                            bookmark: inputdata.bookmark,
                            date: inputdata.date,
                            tag: inputdata.tag,
                            description: inputdata.description
                        }

                    }
                    else {
                        console.log("not found");
                    }
                    return elem

                })
            )
            setinputdata("");
            seteditId(null);
            setsubmitbutton("save your bookmark");

        }
        else {
            setsavedata([...savedata, inputdata]);
            setinputdata([]);
        }


    }


    const deleteItem = (id) => {
        const updatedata = savedata.filter((elem, idn) => {
            return (
                idn != id
            )
        });
        setsavedata(updatedata);
    }


    const toggleShowAccordion = (id) => {
        if (activeCurrentIndex === id) {
            setActiveCurrentIndex();
        } else {
            setActiveCurrentIndex(id);
        }
        setactive(!active);
    }


    const updateItem = (id) => {
        const editItem = savedata.find((elem, idn) => {
            return (
                idn === id
            )

        })
        setinputdata({
            bookmark: editItem.bookmark,
            date: editItem.date,
            tag: editItem.tag,
            description: editItem.description
        });
        seteditId(id);
        setsubmitbutton("edit your bookmark");
    }


    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        //console.log(searchInput);
        const newfilter = savedata.filter((elem) => {
            return elem.bookmark.toLowerCase().includes(searchInput.toLowerCase())
        });
        setfilterdata(newfilter);
        console.log(filterdata);
    };



    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="searchbar">
                    <h1 className="text-white font-bold underline m-4">search your bookmark here</h1>
                    <input className="serachinput" type="search" name="" id="" placeholder="search here" onChange={handleChange} value={searchInput} />
                    {!searchInput ? " " : filterdata.map((elem, index) => {
                        return (
                            <div className="searchdata flex flex-wrap justify-center items-center m-2" key={index}>
                                <p className="searchvalue m-10">{elem.bookmark}</p>
                                <p className="searchvalue m-10">{elem.date}</p>
                                <p className="searchvalue m-10">{elem.tag}</p>
                                <p className="searchvalue m-10">{elem.description}</p>
                            </div>
                        )
                    })}

                </div>
                <h1 className='text-white font-bold underline'>Save your bookmarks here</h1>
                <div className="container px-5 py-24 mx-auto flex flex-wrap">
                    <div className="container-left flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10 border-2 border-black-600">
                        <div className="contactForm flex flex-wrap flex-col w-auto h-auto">
                            <input type="text" value={inputdata.bookmark || ""} onChange={updateData} name="bookmark" id="" placeholder="enter your bookmark" required />
                            <input type="text" value={inputdata.date || ""} onChange={updateData} name="date" placeholder="enter the date of your bookmark" required />
                            <input type="text" value={inputdata.tag || ""} onChange={updateData} name="tag" placeholder='enter tag' required />
                            <input type="text" value={inputdata.description || ""} onChange={updateData} name="description" placeholder="enter description" required />
                            <button className="submit-button" type="submit" onClick={addItem}>{submitbutton}</button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-1 sm:mt-0">
                        <h1>Your booklists display here</h1>

                        {savedata.map((data, index) => {
                            return (
                                <div className="container-button" key={index}>
                                    <button className="accordion" onClick={() => { toggleShowAccordion(index) }}>{data.bookmark} {active ? '-' : '+'}</button>
                                    {activeCurrentIndex === index && <div className="bookmark-details" >
                                        <p className='bookmark-details-data'>{data.date}</p>
                                        <p className='bookmark-details-data'>{data.tag}</p>
                                        <p className='bookmark-details-data'>{data.description}</p>
                                    </div>}
                                    <button className="accordion" type="submit" onClick={() => { deleteItem(index) }}>delete</button>
                                    <button className="accordion" type="submit" onClick={() => { updateItem(index) }}>update</button>
                                </div>
                            )

                        })

                        }

                    </div>
                </div>
            </section>
        </>
    )
}

export default Bookmark
