import { useLocation } from 'react-router-dom';

function Data() {
    const location = useLocation();  // Access the state passed through navigate()
    const formData = location.state?.formData || {};  // Get the form data, if available

    // Destructure formData for easier usage
    const {
        startDate,
        endDate,
        productionPerDay,
        totalOrderQuantity,
        fabricName,
        process,
        perPieceRequirement,
        colorQuantities,
        stagesToBeSkipped,
        isChinaFabricPresent,
    } = formData;

    return (
        <div className="container my-5">
            <h2>Submitted Form Data</h2>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Start Date</td>
                        <td>{startDate}</td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>{endDate}</td>
                    </tr>
                    <tr>
                        <td>Production Per Day</td>
                        <td>{productionPerDay}</td>
                    </tr>
                    <tr>
                        <td>Total Order Quantity</td>
                        <td>{totalOrderQuantity}</td>
                    </tr>
                    <tr>
                        <td>Fabric Name</td>
                        <td>{fabricName}</td>
                    </tr>
                    <tr>
                        <td>Process</td>
                        <td>{process}</td>
                    </tr>
                    <tr>
                        <td>Per Piece Requirement</td>
                        <td>{perPieceRequirement}</td>
                    </tr>
                    <tr>
                        <td>Color and Quantities</td>
                        <td>
                            <ul>
                                {colorQuantities.map((color, index) => (
                                    <li key={index}>{color.color} - {color.quantity}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Stages to Be Skipped</td>
                        <td>{stagesToBeSkipped}</td>
                    </tr>
                    <tr>
                        <td>Is China Fabric Present?</td>
                        <td>{isChinaFabricPresent ? 'Yes' : 'No'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Data;
