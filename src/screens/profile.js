import { useState } from "react";
import profile_photo from './../images/profile_photo.png';
import profile_photo2 from './../images/profile_photo2.png';
import './../styles/profile.css';

const Profile = (props) => {
    const [editDetails, setEditDetails] = useState(false)
    const [userInfo, setUserInfo] = useState({
        'username': 'solona',
        'name': 'Solona Westside',
        'description': 'This is Solona Westside from the eastcost river.',
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

    return (
        <div>
            <div id="user-details-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 p-5">
                            <img src={profile_photo} className="img-fluid rounded" alt="..." />
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div className="container p-5">
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
                                                ? <input type="text" value={userInfo['username']} onChange={(e) => { setUserInfo({ ...userInfo, 'username': e.target.value }) }} />
                                                : userInfo['username']}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="user-field-title">
                                            Name
                                        </div>
                                        <div className="user-field-value">
                                            {editDetails === true
                                                ? <input type="text" value={userInfo['name']} onChange={(e) => { setUserInfo({ ...userInfo, 'name': e.target.value }) }} />
                                                : userInfo['name']}
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="user-field-title">
                                            Description
                                        </div>
                                        <div className="user-field-value description">
                                            {editDetails === true
                                                ? <input type="text" value={userInfo['description']} onChange={(e) => { setUserInfo({ ...userInfo, 'description': e.target.value }) }} />
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
                            <div className="col-md-8">
                                <form className="row g-3 needs-validation" novalidate>
                                    <div className="col-md-12">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" required />
                                    </div>
                                    <div className="col-md-8">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" style={{ height: '100px' }} required></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="type" className="form-label" >Type</label>
                                        <select className="form-select" id="type" defaultValue='DEFAULT' required>
                                            <option disabled value="DEFAULT">Choose...</option>
                                            <option value='1'>work</option>
                                            <option value='2'>hire</option>
                                        </select>
                                    </div>
                                    <div className="col-md-8">
                                        <label htmlFor="type" className="form-label" >User</label>
                                        <select className="form-select" id="type" defaultValue='DEFAULT' required>
                                            <option disabled value="DEFAULT">Choose...</option>
                                            <option value='1'>user 1</option>
                                            <option value='2'>user 2</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </div>
                                </form>
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