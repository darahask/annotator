import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'semantic-ui-react'
import { server } from "../constants/constant";
import { connect } from "react-redux";
import "../styles/documentCard.scss"
import "../styles/searchBar.scss"
import { useHistory } from "react-router-dom";

function Card(props) {
    return (
      <div className="card" onClick={() => props.handleDocumentClick(props.id)}>
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <p className="card__description">{props.description}</p>
        </div>
        {
            (props.is_annotated) ? (<button className="card__btn">Annotated Document</button>) : (<button className="card__btn">Non Annotated Document</button>)
        }  
      </div>
    );
  };

let SearchBar = (props) => {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let history = useHistory()

    useEffect(() => {
        console.log("Inside use effect")
        axios.get(server+"user-document-list",
        {
            headers: {
                authtoken: props.auth.token,
            }
        }).then((response) => {
                
                //for now, but will be changed later
                for(let idx=0;idx<response.data.length;idx++){
                    response.data[idx]["image"] = response.data[idx]["image"];
                }

                console.log(response.data)
                
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    const handleDocumentClick = (id) => {
        history.push(`/documents/${id}`, APIData.find((item) => item.id === id));
    }

    return (
        <div>
            {/* <div className="searchBar">
                <Input icon='search'
                        placeholder='Search...'
                        onChange={(e) => searchItems(e.target.value)}
                />
            </div> */}
            <div>

                <div className="cont">
                    <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)}/>
                    <div className="search"></div>
                </div>

            </div>

            <div className='wrapper'>
                
                
                    {searchInput.length > 1 ? (
                        filteredResults.map((item) => {
                            return (
                                <Card
                                    id = {item.id}
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
                                    handleDocumentClick = {handleDocumentClick}
                                >
                                </Card>
                            )
                        })
                    ) : (
                        APIData.map((item) => {
                            return (
                                <Card
                                    id = {item.id}
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
                                    handleDocumentClick = {handleDocumentClick}
                                >
                                </Card>
                            )
                        })
                    )}
                
            </div>
        </div>

        
    )
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps)(SearchBar);