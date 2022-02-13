import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'semantic-ui-react'
import { server } from "../constants/constant";
import { connect } from "react-redux";
import "../styles/documentCard.scss"


function Card(props) {
    return (
      <div className="card">
        <div className="card__body">
          <img src={props.img} class="card__image" />
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
                    response.data[idx]["image"] = "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ";
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

    

    return (
        <div>
            <div className="searchBar">
                <Input icon='search'
                        placeholder='Search...'
                        onChange={(e) => searchItems(e.target.value)}
                />
            </div>
            <div className='wrapper'>
                
                
                    {searchInput.length > 1 ? (
                        filteredResults.map((item) => {
                            return (
                                <Card
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
                                >
                                </Card>
                            )
                        })
                    ) : (
                        APIData.map((item) => {
                            return (
                                <Card
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
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