import "./../styles/profile.css";

const ProfileUserList = (props) => {
    const { title, list, handleDelete } = props;
    console.log(props)

    return (
        <div className="col-md-5 list-container">
            <div className="list-title">{title}</div>
            <hr />
            {list.length === 0 ? (
                <div className="parent">
                    <div className="child">
                        <h5 style={{ textAlign: "center" }}>No {title}</h5>
                    </div>
                </div>
            ) : (
                <div className="d-grid gap-3 list p-3">
                    {list.map((user) => (
                        <div
                            key={user.id}
                            className="shadow-sm p-2 list-item rounded"
                        >
                            <div className="row p-2">
                                <div className="col-10">
                                    <div className="list-item-title">
                                        {user.name}
                                    </div>
                                    <div className="list-item-description">
                                        {user.description}
                                    </div>
                                </div>
                                <div className="col-2 delete-icon-container">
                                    <i
                                        className="fas fa-trash delete-icon"
                                        onClick={() => {
                                            handleDelete(user.id);
                                        }}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileUserList;
