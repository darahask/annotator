import { useEffect } from "react";

const Annotationlist = ({ data }) => {
    let { annotations } = data;
    let objmap = new Map();

    console.log("In annolist", annotations);
    useEffect(() => {}, [annotations]);

    for (var i = 0; i < annotations.length; i++) {
        let anno = annotations[i];
        let annocategory = objmap.get(anno.name);
        if (
            annocategory === undefined ||
            annocategory === null ||
            annocategory === "undefined"
        ) {
            objmap.set(anno.name, [anno.name]);
        } else {
            objmap.set([...annocategory, anno.name]);
        }
    }

    function getUi() {
        let components = [];
        objmap.forEach((value, index) => {
            let c = (
                <div className="accordion mb-2" key={index}>
                    <div className="accordion-item">
                        <h2
                            className="accordion-header"
                            id={`panelsStayOpen-heading${index}`}
                        >
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#panelsStayOpen-collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`panelsStayOpen-collapse${index}`}
                            >
                                {index}
                            </button>
                        </h2>
                        <div
                            id={`panelsStayOpen-collapse${index}`}
                            className="accordion-collapse collapse show"
                            aria-labelledby={`panelsStayOpen-heading${index}`}
                        >
                            <div className="accordion-body">
                                {value.map((anno, i) => {
                                    return <i key={i}>{anno}</i>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
            components.push(c);
        });
        return components;
    }

    return <div className="mt-3 p-3" style={{border:"1px solid black"}}>
        <h3>Annotations</h3>
        {getUi()}
        </div>;
};

export default Annotationlist;
