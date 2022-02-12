import { connect } from "react-redux";
import "./../styles/profile.css";
import "./../styles/managemodel.css";
import { useState } from "react";

const Managemodel = (props) => {
    const [modelpoolList, setModelpoolList] = useState([
        {
            id: 1,
            name: "Model Pool 1",
            description: "This is model pool 1",
            sub_modelpools: [
                {
                    id: 2,
                    name: "mp2dkjnksdjhbvnlsdkfn kfnkldfhlkdfnlkbnkdfbnjjvdfvjdbnfdbfkjfndkjfbnsdklfvbjs",
                    is_active: true,
                },
                {
                    id: 3,
                    name: "mp3",
                    is_active: false,
                },
            ],
            subdescription_list: "This is sub description list of Model Pool 1",
            pool_models: ["m1", "m2"],
            is_selected: false,
        },
        {
            id: 10,
            name: "Model Pool 2",
            description: "This is model pool 2",
            sub_modelpools: [
                {
                    id: 4,
                    name: "mp4",
                    is_active: false,
                },
                {
                    id: 5,
                    name: "mp5",
                    is_active: true,
                },
            ],
            subdescription_list: "This is sub description list of Model Pool 2",
            pool_models: ["m3", "m4"],
            is_selected: false,
        },
    ]);

    const [displayedModelPools, setDisplayedModelPools] = useState(modelpoolList);
    const [selectedModelpools, setSelectedModelpools] = useState([]);

    const [modalModelPool, setModalModelPool] = useState({
        id: "",
        name: "",
        description: "",
        sub_modelpools: [],
        subdescription_list: "",
        pool_models: [],
    });

    const handleModelpoolsSearch = (e) => {
        setDisplayedModelPools(
            modelpoolList.filter((modelpool) => {
                if (modelpool.name.toLowerCase().includes(e.target.value) || modelpool.description.toLowerCase().includes(e.target.value) || modelpool.subdescription_list.toLowerCase().includes(e.target.value)) return modelpool;
            })
        );
    };

    const handleModelpoolSelect = (val, id) => {
        setModelpoolList(modelpoolList.map((modelpool) => (modelpool.id === id ? { ...modelpool, is_selected: val } : modelpool)));
        setDisplayedModelPools(displayedModelPools.map((modelpool) => (modelpool.id === id ? { ...modelpool, is_selected: val } : modelpool)));
        if (val) {
            var pools = selectedModelpools;
            pools.push(modelpoolList.find((modelpool) => modelpool.id === id));
            setSelectedModelpools(pools);
        } else {
            setSelectedModelpools(selectedModelpools.filter((modelpool) => modelpool.id !== id));
        }
    };

    const handleModalSubModelPool = (val, id) => {
        setModalModelPool({ ...modalModelPool, sub_modelpools: modalModelPool.sub_modelpools.map((modelpool) => (modelpool.id === id ? { ...modelpool, is_active: val } : modelpool)) });
    };

    const handleMoreInfo = (id) => {
        setModalModelPool(modelpoolList.find((modelpool) => modelpool.id === id));
        document.getElementById("modal-toggle").click();
    };

    return (
        <div className="container">
            <nav>
                <div className="nav nav-tabs document-navbar" id="nav-tab" role="tablist">
                    <button className="col-6 nav-link active" id="nav-train-tab" data-bs-toggle="tab" data-bs-target="#nav-train" type="button" role="tab" aria-controls="nav-train" aria-selected="true">
                        <div className="nav-button">Train Model</div>
                    </button>
                    <button className="col-6 nav-link" id="nav-auto-annotate-tab" data-bs-toggle="tab" data-bs-target="#nav-auto-annotate" type="button" role="tab" aria-controls="nav-auto-annotate" aria-selected="false">
                        <div className="nav-button">Auto Annotate</div>
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-train" role="tabpanel" aria-labelledby="nav-train-tab">
                    <div style={{ padding: "15px 10px" }}>
                        <div className="row justify-content-center progress-container">
                            <div className="col-8 col-md-7">
                                <div className="progress" style={{ height: "30px" }}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>
                                        75%
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 col-md-7" style={{ fontSize: "14px", color: "dimgrey", paddingTop: "5px" }}>
                                Model started training
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-8 col-md-6">
                                <input id="modelname-input" placeholder="Enter model name" maxLength={24} />
                                <div className="modelinput-errormsg">No Patterns Found</div>
                            </div>
                            <div className="col-4 col-md-2" style={{ textAlign: "center" }}>
                                <button id="train-button" className="">
                                    Train
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-auto-annotate" role="tabpanel" aria-labelledby="nav-auto-annotate-tab">
                    <button id="modal-toggle" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modelpoolModal" style={{ display: "none" }}></button>

                    <div className="modal fade" id="modelpoolModal" tabIndex="-1" aria-labelledby="modelpoolTitle" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modelpoolTitle">
                                        {modalModelPool.name}
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: "300px", overflow: "auto" }}>
                                    <div className="modal-sub-title">Description</div>
                                    <div className="modal-desc border-bottom">{modalModelPool.description}</div>
                                    <div className="modal-sub-title">Sub ModelPools</div>
                                    <div className="modal-subcontainer border-bottoms">
                                        <div className="row pills-container">
                                            {modalModelPool.sub_modelpools.map((modelpool, i) => (
                                                <div key={i} className="col-auto selected-pill rounded">
                                                    <div className="row">
                                                        <div className="col-auto pill-title">{modelpool.name}</div>
                                                        <div className="col-auto" style={{ paddingTop: "3px" }}>
                                                            <input
                                                                className="form-check-input mt-0"
                                                                type="checkbox"
                                                                value=""
                                                                checked={modelpool.is_active}
                                                                onChange={(e) => {
                                                                    handleModalSubModelPool(e.target.checked, modelpool.id);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="modal-sub-title">Sub Description List</div>
                                    <div className="modal-desc border-bottom">{modalModelPool.subdescription_list}</div>
                                    <div className="modal-sub-title">Models</div>
                                    <div className="modal-subcontainer border-bottoms">
                                        <div className="row pills-container">
                                            {modalModelPool.pool_models.map((model, i) => (
                                                <div key={i} className="col-auto selected-pill rounded" style={{ backgroundColor: "#ffdeeb", borderColor: "#7e191b" }}>
                                                    <div className="col-auto modelpill-title">{model}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                        Delete
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="container">
                                <div className="row justify-content-start search-bar-container">
                                    <div className="col-2 col-sm-2 col-md-1 search-icon">
                                        <i className="fas fa-search fa-lg"></i>
                                    </div>
                                    <div className="col-10 col-sm-10 col-md-11">
                                        <div className="row">
                                            <input
                                                type="text"
                                                className="search-bar"
                                                placeholder="Search ModelPool"
                                                onChange={(e) => {
                                                    handleModelpoolsSearch(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row border border-top-0 border-dark shadow-lg">
                                    <div className="search-box-container">
                                        {displayedModelPools.map((modelpool, i) => (
                                            <div key={i} className="search-box-item border rounded shadow-sm" style={{ cursor: "default" }}>
                                                <div className="row">
                                                    <div className="col-1" style={{ textAlign: "center", padding: "0px", paddingTop: "35px", paddingLeft: "5px", paddingRight: "5px", margin: "0px" }}>
                                                        <input
                                                            className="form-check-input mt-0"
                                                            type="checkbox"
                                                            value=""
                                                            checked={modelpool.is_selected}
                                                            onChange={(e) => {
                                                                handleModelpoolSelect(e.target.checked, modelpool.id);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-11" style={{ padding: "0px", paddingRight: "10px" }}>
                                                        <div className="name">{modelpool.name}</div>
                                                        <div className="description">{modelpool.description}</div>
                                                        <div className="username-container">
                                                            <span className="username-helpertext rounded">sub modelpools:</span>
                                                            <span className="username">
                                                                {modelpool.sub_modelpools.map((submodelpool, j) => (
                                                                    <span key={j} className="rounded submodelpool-pill" style={{ backgroundColor: submodelpool.is_active ? "#6fc0ab" : "#e2b1cd" }}>
                                                                        {submodelpool.name}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="moreinfo-tag"
                                                            onClick={() => {
                                                                handleMoreInfo(modelpool.id);
                                                            }}
                                                        >
                                                            more info
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="annotate-container">
                                <div className="annotate-section border-bottom border-dark">
                                    <div className="section-title">Selected ModelPools</div>
                                    <div className="selected-modelpools border border-dark">
                                        <div className="row pills-container">
                                            {selectedModelpools.map((modelpool, i) => (
                                                <div key={i} className="col-auto selected-pill rounded">
                                                    <div className="row">
                                                        <div className="col-auto pill-title">{modelpool.name}</div>
                                                        <div
                                                            className="col-auto cancel-sign"
                                                            onClick={() => {
                                                                handleModelpoolSelect(false, modelpool.id);
                                                            }}
                                                        >
                                                            &#x2717;
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-success annotate-button">Annotate</button>
                                    </div>
                                </div>
                                <div className="create-modelpool">
                                    <div className="row" style={{ margin: "10px 10px" }}>
                                        <div className="col-md-4">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text input-helpertext">Title</span>
                                                <input type="text" className="form-control input-field" maxLength={24} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text input-helpertext">Description</span>
                                                <input type="text" className="form-control input-field" />
                                            </div>
                                        </div>
                                        <div className="hint">above selected modelpools are used to create the modelpool</div>
                                    </div>
                                    <div>
                                        <button className="btn btn-success create-button">Create ModelPool</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect((state) => ({ auth: state.auth }))(Managemodel);
