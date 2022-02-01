import { useState } from "react";
import profile_photo from './../images/profile_photo.png';
import profile_photo2 from './../images/profile_photo2.png';
import profile_photo3 from './../images/profile_photo3.png';
import profile_photo4 from './../images/profile_photo4.png';
import './../styles/profile.css';

const Profile = (props) => {
    const [editDetails, setEditDetails] = useState(false)
    const [userInfo, setUserInfo] = useState({
        'username': 'solona',
        'name': 'Solona Westside',
        'description': 'This is Solona Westside from the eastcost river.',
        'image': null
    })

    const [annotatorList, setAnnotatorList] = useState([
        {
            'id': 1,
            'name': 'ETC',
            'description': 'This is the description of etc'
        },
        {
            'id': 2,
            'name': 'Sol',
            'description': 'This is the description of sol'
        }
    ])

    const [projectList, setProjectList] = useState([
        {
            'id': 1,
            'name': 'Btc',
            'description': 'This is the description of btc'
        }
    ])

    const [sentRequests, setSentRequests] = useState([
        {
            'id': 1,
            'name': 'Btc',
            'description': 'This is the description of btc',
            'type': 'work',
            'status': 'pending'
        },
        {
            'id': 2,
            'name': 'MANA',
            'description': 'This is the description of mana',
            'type': 'hire',
            'status': 'accepted'
        },
        {
            'id': 3,
            'name': 'Apple',
            'description': 'This is the description of apple',
            'type': 'work',
            'status': 'declined'
        },
        {
            'id': 4,
            'name': 'Tesla',
            'description': 'This is the description of tesla',
            'type': 'hire',
            'status': 'declined'
        }
    ])

    const [receivedRequests, setReceivedRequests] = useState([
        {
            'id': 1,
            'name': 'Btc',
            'description': 'This is the description of btc',
            'type': 'work',
            'status': 'pending'
        },
        {
            'id': 2,
            'name': 'MANA',
            'description': 'This is the description of mana',
            'type': 'hire',
            'status': 'accepted'
        },
        {
            'id': 3,
            'name': 'Apple',
            'description': 'This is the description of apple',
            'type': 'work',
            'status': 'pending'
        },
        {
            'id': 4,
            'name': 'Tesla',
            'description': 'This is the description of tesla',
            'type': 'hire',
            'status': 'declined'
        }
    ])

    const usersList = [
        {
            'id': 1,
            'username': 'btc243',
            'name': 'BTC',
            'description': 'ksjhvbg'
        },
        {
            'id': 2,
            'username': 'skjb243',
            'name': 'DJHV',
            'description': ''
        },
        {
            'id': 3,
            'username': 'asdf',
            'name': 'earg',
            'description': 'ksjhvbg'
        },
        {
            'id': 4,
            'username': 'eghf',
            'name': 'as',
            'description': 'sefwa'
        },
        {
            'id': 5,
            'username': 'werwesdf',
            'name': 'sdf',
            'description': 'sdgwet'
        },
        {
            'id': 6,
            'username': 'wertsd',
            'name': 'w3rwfwd',
            'description': 'w3r'
        },
        {
            'id': 7,
            'username': 'dfgdsg',
            'name': 'sdg',
            'description': 'awe'
        },
        {
            'id': 8,
            'username': 'frggds',
            'name': 'awr',
            'description': 'wer'
        }
    ]

    const [userDisplayList, setUserDisplayList] = useState(usersList)

    const [newRequestDetails, setNewRequestDetails] = useState({
        'title': '',
        'description': '',
        'type': ''
    })

    const [requestUsernameField, setRequestUsernameField] = useState({
        'id': null,
        'username': '',
        'name': 'null',
        'description': 'null'
    })

    const handleProfilePhotoChange = () => {
        const file = document.querySelector('#updated-profile-photo').files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setUserInfo({ ...userInfo, 'image': reader.result });
                document.getElementById("profile-photo").setAttribute("src", reader.result)
            }
        }
        document.getElementById("profile-photo-update-model-close").click();
    }

    const handleAnnotatorDelete = (id) => {
        setAnnotatorList(annotatorList.filter(annotator => annotator.id !== id))
    }

    const handleProjectDelete = (id) => {
        setProjectList(projectList.filter(project => project.id !== id))
    }

    const handleAcceptRequest = (id) => {
        setReceivedRequests(receivedRequests.map(request => (request.id === id ? { ...request, status: 'accepted' } : request)))
    }

    const handleDeclineRequest = (id) => {
        setReceivedRequests(receivedRequests.map(request => (request.id === id ? { ...request, status: 'declined' } : request)))
    }

    const handleRequestDetails = (e, field) => {
        if (field === "title") {
            setNewRequestDetails({ ...newRequestDetails, 'title': e.target.value })
            document.getElementById('title-invalid').style.display = 'none'
        }
        else if (field === "description") {
            setNewRequestDetails({ ...newRequestDetails, 'description': e.target.value })
            document.getElementById('description-invalid').style.display = 'none'
        }
        else {
            setNewRequestDetails({ ...newRequestDetails, 'type': e.target.value })
            document.getElementById('type-invalid').style.display = 'none'
        }

    }

    const handlerequestUsername = (e) => {
        setUserDisplayList(usersList.filter(user => {
            if (user.name.toLowerCase().includes(e.target.value) || user.description.toLowerCase().includes(e.target.value) || user.username.toLowerCase().includes(e.target.value))
                return user
        }))
    }

    const handleUserSelect = (id) => {
        setRequestUsernameField(usersList.find(user => user.id === id))
        document.getElementById('username-invalid').style.display = 'none';
    }

    const handleNewRequestSend = () => {
        console.log(newRequestDetails)
        console.log(requestUsernameField)
        if (newRequestDetails.title === '')
            document.getElementById('title-invalid').style.display = 'inline'
        if (newRequestDetails.description === '')
            document.getElementById('description-invalid').style.display = 'inline'
        if (newRequestDetails.type === 'DEFAULT')
            document.getElementById('type-invalid').style.display = 'inline'
        if (requestUsernameField.id === null)
            document.getElementById('username-invalid').style.display = 'inline'
    }

    const handleNewRequestReset = () => {
        setNewRequestDetails({
            'title': '',
            'description': '',
            'type': ''
        })
        setRequestUsernameField({
            'id': null,
            'username': '',
            'name': 'null',
            'description': 'null'
        })
    }

    // document.getElementById('error-modal-open').click()
    // run above line in case of error

    return (
        <div>
            <div className="modal fade" id="error-modal" tabIndex="-1" aria-labelledby="error-model-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header alert-danger" style={{ border: '1px solid #FF5252' }}>
                            <button id="error-modal-open" data-bs-toggle="modal" data-bs-target="#error-modal" style={{ visibility: 'hidden' }}></button>
                            <h6 className="modal-title">Unable to change Profile Photo. Please try again.</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="user-details-container">
                <div className="container">
                    <div className="row justify-content-center mt-4 mb-4">
                        <div className="col-md-3 col-sm-12 p-3 parent" style={{ height: '430px' }}>
                            <div className="child profile-photo-container">
                                <img id="profile-photo" src={profile_photo} className="rounded child profile-photo" alt="" style={{ height: '80%', width: '100%', objectFit: 'cover' }} />
                                <button className="profile-photo-edit" data-bs-toggle="modal" data-bs-target="#profilePhotoModel"><i className="fas fa-pen fa-xl"></i></button>
                                <div className="modal fade" id="profilePhotoModel" tabIndex="-1" aria-labelledby="profilePhotoModelLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Select Image</h5>
                                                <button id="profile-photo-update-model-close" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input type="file" id="updated-profile-photo" name="img" accept="image/*" />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={handleProfilePhotoChange} data-bs-dismiss>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <div className="p-4">
                                <div className="d-flex justify-content-end">
                                    {editDetails === true
                                        ? <button type="button" className="btn btn-outline-success" onClick={() => { setEditDetails(false) }}>Save</button>
                                        : <button type="button" className="btn btn-outline-dark" onClick={() => { setEditDetails(true) }}>Edit</button>}
                                </div>
                                <div className="d-grid">
                                    <div className="p-2">
                                        <div className="user-field-title">
                                            Username
                                        </div>
                                        <div className="user-field-value">
                                            {editDetails === true
                                                ? <input type="text" value={userInfo['username']} onChange={(e) => { setUserInfo({ ...userInfo, 'username': e.target.value }) }} style={{ width: '90%', height: '40px', marginTop: '10px' }} />
                                                : userInfo['username']}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="user-field-title">
                                            Name
                                        </div>
                                        <div className="user-field-value">
                                            {editDetails === true
                                                ? <input type="text" value={userInfo['name']} onChange={(e) => { setUserInfo({ ...userInfo, 'name': e.target.value }) }} style={{ width: '90%', height: '40px', marginTop: '10px' }} />
                                                : userInfo['name']}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="user-field-title">
                                            Description
                                        </div>
                                        <div className="user-field-value description">
                                            {editDetails === true
                                                ? <textarea type="text" value={userInfo['description']} onChange={(e) => { setUserInfo({ ...userInfo, 'description': e.target.value }) }} style={{ width: '90%', height: '90px', marginTop: '10px' }} ></textarea>
                                                : userInfo['description']}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list-main-container">
                <div className="container">
                    <div className="row justify-content-evenly">
                        <div className="col-md-5 list-container">
                            <div className="list-title">
                                Annotators
                            </div>
                            <hr />
                            <div className="d-grid gap-3 list p-3">
                                {annotatorList.map(annotator => (
                                    <div key={annotator.id} className="shadow-sm p-2 list-item rounded">
                                        <div className="row p-2">
                                            <div className="col-10">
                                                <div className="list-item-title">{annotator.name}</div>
                                                <div className="list-item-description">{annotator.description}</div>
                                            </div>
                                            <div className="col-2 delete-icon-container">
                                                <i className="fas fa-trash delete-icon" onClick={() => { handleAnnotatorDelete(annotator.id) }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-5 list-container">
                            <div className="list-title">
                                Projects
                            </div>
                            <hr />
                            <div className="d-grid gap-3 list p-3">
                                {projectList.map(project => (
                                    <div key={project.id} className="shadow-sm p-2 list-item rounded">
                                        <div className="row p-2">
                                            <div className="col-10">
                                                <div className="list-item-title">{project.name}</div>
                                                <div className="list-item-description">{project.description}</div>
                                            </div>
                                            <div className="col-2 delete-icon-container">
                                                <i className="fas fa-trash delete-icon" onClick={() => { handleProjectDelete(project.id) }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="requests container p-3">
                <nav>
                    <div className="nav nav-tabs row" id="nav-tab" role="tablist">
                        <button className="col-4 nav-link active" id="nav-sentrequests-tab" data-bs-toggle="tab" data-bs-target="#nav-sentrequests" type="button" role="tab" aria-controls="nav-sentrequests" aria-selected="true">Sent Requests</button>
                        <button className="col-4 nav-link" id="nav-receivedrequests-tab" data-bs-toggle="tab" data-bs-target="#nav-receivedrequests" type="button" role="tab" aria-controls="nav-receivedrequests" aria-selected="false">Received Requests</button>
                        <button className="col-4 nav-link" id="nav-newrequest-tab" data-bs-toggle="tab" data-bs-target="#nav-newrequest" type="button" role="tab" aria-controls="nav-newrequest" aria-selected="false">New Request</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-sentrequests" role="tabpanel" aria-labelledby="nav-sentrequests-tab">
                        <div className="row justify-content-center request-list-container">
                            <div className="col-md-8 list-container">
                                <div className="d-grid gap-3 list p-3">
                                    {sentRequests.map(request => (
                                        <div key={request.id}
                                            className="shadow-lg p-3 list-item rounded"
                                            style={request.status === 'pending'
                                                ? { backgroundColor: '#4285F4', color: 'white' }
                                                : request.status === 'accepted'
                                                    ? { backgroundColor: '#1DB954', color: 'white' }
                                                    : { backgroundColor: '#ff3333', color: 'white' }}>
                                            <div className="list-item-title">{request.name}</div>
                                            <div className="list-item-description">{request.description}</div>
                                            <div className="tag-container">
                                                <span
                                                    className="rounded tag"
                                                    style={request.status === 'pending'
                                                        ? { color: '#4285F4' }
                                                        : request.status === 'accepted'
                                                            ? { color: '#1DB954' }
                                                            : { color: '#ff3333' }}
                                                >{request.status}
                                                </span>
                                                <span
                                                    className="rounded tag"
                                                    style={request.type === 'work'
                                                        ? { color: '#7c605c' }
                                                        : { color: '#b35900' }}
                                                >{request.type}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-receivedrequests" role="tabpanel" aria-labelledby="nav-receivedrequests-tab">
                        <div className="row justify-content-center request-list-container">
                            <div className="col-md-8 list-container">
                                <div className="d-grid gap-3 list p-3">
                                    {receivedRequests.map(request =>
                                        request.status === 'pending' ? (
                                            <div key={request.id}
                                                className="shadow-lg p-3 list-item rounded"
                                                style={request.status === 'pending'
                                                    ? { backgroundColor: '#4285F4', color: 'white' }
                                                    : request.status === 'accepted'
                                                        ? { backgroundColor: '#1DB954', color: 'white' }
                                                        : { backgroundColor: '#ff3333', color: 'white' }}>
                                                <div className="row">
                                                    <div className="col-10">
                                                        <div className="list-item-title">{request.name}</div>
                                                        <div className="list-item-description">{request.description}</div>
                                                        <div className="tag-container">
                                                            <span
                                                                className="rounded tag"
                                                                style={request.status === 'pending'
                                                                    ? { color: '#4285F4' }
                                                                    : request.status === 'accepted'
                                                                        ? { color: '#1DB954' }
                                                                        : { color: '#ff3333' }}
                                                            >{request.status}
                                                            </span>
                                                            <span
                                                                className="rounded tag"
                                                                style={request.type === 'work'
                                                                    ? { color: '#7c605c' }
                                                                    : { color: '#b35900' }}
                                                            >{request.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-2 delete-icon-container" style={{ padding: '0px' }}>
                                                        <div className="delete-icon" style={{ textAlign: 'center', marginTop: 'auto' }}>
                                                            <div className="shadow rounded accept-button p-2" onClick={() => { handleAcceptRequest(request.id) }}><i className="fas fa-check fa-lg"></i></div>
                                                            <div className='shadow rounded decline-button p-2' onClick={() => { handleDeclineRequest(request.id) }}><i className="fas fa-times fa-lg"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={request.id}
                                                className="shadow-lg p-3 list-item rounded"
                                                style={request.status === 'accepted'
                                                    ? { backgroundColor: '#1DB954', color: 'white' }
                                                    : { backgroundColor: '#ff3333', color: 'white' }}>
                                                <div className="list-item-title">{request.name}</div>
                                                <div className="list-item-description">{request.description}</div>
                                                <div className="tag-container">
                                                    <span
                                                        className="rounded tag"
                                                        style={request.status === 'pending'
                                                            ? { color: '#4285F4' }
                                                            : request.status === 'accepted'
                                                                ? { color: '#1DB954' }
                                                                : { color: '#ff3333' }}
                                                    >{request.status}
                                                    </span>
                                                    <span
                                                        className="rounded tag"
                                                        style={request.type === 'work'
                                                            ? { color: '#7c605c' }
                                                            : { color: '#b35900' }}
                                                    >{request.type}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-newrequest" role="tabpanel" aria-labelledby="nav-newrequest-tab">
                        <div className="row request-list-container justify-content-center" style={{ marginTop: '20px' }}>
                            <div className="col-md-7">
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" value={newRequestDetails.title} onChange={(e) => { handleRequestDetails(e, 'title') }} />
                                        <span id="title-invalid" className="field-invalid">field is required</span>
                                    </div>
                                    <div className="col-md-8">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" value={newRequestDetails.description} style={{ height: '140px' }} onChange={(e) => { handleRequestDetails(e, 'description') }}></textarea>
                                        <span id="description-invalid" className="field-invalid">field is required</span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="d-grid gap-3">
                                            <div>
                                                <label htmlFor="type" className="form-label" >Type</label>
                                                <select className="form-control" id="type" defaultValue={newRequestDetails.type} onChange={(e) => { handleRequestDetails(e, 'type') }}>
                                                    <option disabled value=''>Choose...</option>
                                                    <option value='1'>work</option>
                                                    <option value='2'>hire</option>
                                                </select>
                                                <span id="type-invalid" className="field-invalid">field is required</span>
                                            </div>
                                            <div>
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <input type="text" className="form-control" id="request-username" value={requestUsernameField.username} disabled aria-describedby="request-username-help" />
                                                <div id="request-username-help" className="form-text">Select using the users section</div>
                                                <span id="username-invalid" className="field-invalid">field is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="container">
                                    <div className="row justify-content-start search-bar-container">
                                        <div className="col-2 col-sm-2 col-md-1 search-icon">
                                            <i className="fas fa-search fa-lg"></i>
                                        </div>
                                        <div className="col-10 col-sm-10 col-md-11">
                                            <div className="row">
                                                <input type="text" className="search-bar" placeholder="Search User" onChange={(e) => { handlerequestUsername(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row border border-top-0 border-dark shadow-lg">
                                        <div className="search-box-container">
                                            {userDisplayList.map(user => (
                                                <div key={user.id} className="search-box-item border rounded shadow-sm" onClick={() => { handleUserSelect(user.id) }}>
                                                    <div id="name">
                                                        {user.name}
                                                    </div>
                                                    <div id="description">
                                                        {user.description}
                                                    </div>
                                                    <div id="username-container">
                                                        <span id='username-helpertext'>username:</span>
                                                        <span id="username">{user.username}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container p-3">
                                <button className="btn btn-primary request-send-button" onClick={() => { handleNewRequestSend() }}>Send</button>
                                <button className="btn btn-danger request-reset-button" onClick={() => { handleNewRequestReset() }}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

//  style={{backgroundColor: "red"}}