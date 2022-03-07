import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Input, Loader } from 'semantic-ui-react'
import { server } from "../constants/constant";
import { connect } from "react-redux";
import useFullPageLoader from "../hooks/useFullPageLoader";
import "../styles/documentCard.scss"
import "../styles/searchBar.scss"

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
    const [loaderComponent, showLoader, hideLoader] = useFullPageLoader();


    useEffect(() => {
        console.log("Inside use effect")
        showLoader();
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
                hideLoader();
                setAPIData(response.data);
            })
    }, [])

    let combineData = (name,description) => {
        return name + " " + description
    }

    const searchItems = (searchValue) => {
        showLoader();
        setSearchInput(searchValue);
        if (searchValue.length > 0) {
            
            let filteredData = APIData.filter((item) => {
                let mergedString = combineData(item['name'],item['description'])
                return mergedString.toLowerCase().includes(searchValue.toLowerCase())
            })

            hideLoader();
            setFilteredResults(filteredData);
        }
        else{
            hideLoader();
            setFilteredResults(APIData)
        }
    }

    

    return (
        <div>
            <div>

                <div className="cont">
                    <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)}/>
                    <div className="search"></div>
                </div>

            </div>
            {loaderComponent}
            <div className='wrapper'>
                
                    {searchInput.length >= 1 ? (
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