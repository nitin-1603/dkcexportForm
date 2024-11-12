import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import Form2 from './Form2'


function Form1() {
    // State to store the start date, end date, fabric name, process, stages, and validation errors
    const [SDate, setsDate] = useState('');
    const [EDate, seteDate] = useState('');
    const [fabricName, setFabricName] = useState('');
    const [process, setProcess] = useState('');
    const [productionPerDay, setProductionPerDay] = useState(''); // Value for Production Per Day Per Machine
    const [productionError, setProductionError] = useState(''); // Error message for invalid production input
    const [totalOrderQuantity, setTotalOrderQuantity] = useState(''); // Value for Total Order Quantity
    const [totalOrderError, setTotalOrderError] = useState(''); // Error message for invalid total order input
    const [fabricSearch, setFabricSearch] = useState(''); // Search term for fabric
    const [processSearch, setProcessSearch] = useState(''); // Search term for process
    const [perPieceRequirement, setPerPieceRequirement] = useState(''); // Per Piece Requirement value
    const [perPieceError, setPerPieceError] = useState(''); // Error message for invalid Per Piece Requirement input
    const [stagesToBeSkipped, setStagesToBeSkipped] = useState(''); // Stage selection state
    const [colorQuantities, setColorQuantities] = useState([{ color: '', quantity: '' }]);

   
    // State for handling "Is China Fabric Present"
    const [isChinaFabricPresent, setIsChinaFabricPresent] = useState(null); // null = no selection, true = Yes, false = No

    const navigate = useNavigate();  // Initialize useNavigate for redirecting

    // Fabric name options
    const fabricOptions = [
        'BAG VOILE',
        'WISTERIA VOILE',
        'SHEETING',
        'WINDOWPANE GAUZ',
        'FP001',
        'WAFFEL',
        '2X2 RIB',
        'FRENCH TERRY',
        'VISCOUS LYCRA',
        'OTHER KNITS',
        'LACES',
        'SHIFILLI',
        'SPECIAL FABRICS',
        'IMPORTED FABRICS',
        'CHINA LACE',
    ];

    // Process dropdown names
    const processedDropdownNames = [
        'DYING',
        'PRINTING',
        'MOCK UP',
        'LACES',
        'SHIFFLY',
        'WASHING'
    ];

    // Stages to be skipped dropdown options
    const stagesDropdownOptions = [
        'PURCHASE',
        'SUBMISSION',
        'FOB',
        'BULK',
        'FABRIC AUDIT',
        'PRODUCTION',
        'TOP',
        'WEB',
        'SIZE SET'
    ];

    useEffect(() => {
        // Set the default date to today in YYYY-MM-DD format
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setsDate(formattedDate);
        seteDate(formattedDate);
    }, []); // Empty dependency array means it runs only once on component mount

    // Handle input change for start and end date
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setsDate(value); // Update start date
        } else if (name === 'endDate') {
            seteDate(value); // Update end date
        }
    };

    // Handle fabric name change
    const handleFabricNameChange = (e) => {
        setFabricName(e.target.value);
    };

    // Handle process change
    const handleProcessChange = (e) => {
        setProcess(e.target.value);
    };

    // Handle stage to be skipped change
    const handleStagesToBeSkippedChange = (e) => {
        setStagesToBeSkipped(e.target.value);
    };

    // Handle color and quantity input changes
    const handleColorQuantityChange = (index, field, value) => {
        const newColorQuantities = [...colorQuantities];
        newColorQuantities[index][field] = value;
        setColorQuantities(newColorQuantities);
    };

    // Validate the production per day input to prevent negative or zero values
    const handleProductionPerDayChange = (e) => {
        const value = e.target.value;

        // Ensure the value is a positive number greater than zero
        if (value === '' || value < 1) {
            setProductionError('Production per day must be greater than 0');
            setProductionPerDay(''); // Reset value to empty if invalid
        } else {
            setProductionError('');
            setProductionPerDay(value); // Update valid value
        }
    };

    // Validate the total order quantity input to prevent negative or zero values
    const handleTotalOrderQuantityChange = (e) => {
        const value = e.target.value;

        // Ensure the value is a positive number greater than zero
        if (value === '' || value < 1) {
            setTotalOrderError('Total order quantity must be greater than 0');
            setTotalOrderQuantity(''); // Reset value to empty if invalid
        } else {
            setTotalOrderError('');
            setTotalOrderQuantity(value); // Update valid value
        }
    };

    // Validate the per piece requirement input to prevent negative or zero values
    const handlePerPieceRequirementChange = (e) => {
        const value = e.target.value;

        // Ensure the value is a positive number greater than zero
        if (value === '' || value < 1) {
            setPerPieceError('Per piece requirement must be greater than 0');
            setPerPieceRequirement(''); // Reset value to empty if invalid
        } else {
            setPerPieceError('');
            setPerPieceRequirement(value); // Update valid value
        }
    };

    // Filter fabric options based on search term
    const filteredFabricOptions = fabricOptions.filter((fabric) =>
        fabric.toLowerCase().includes(fabricSearch.toLowerCase())
    );

    // Filter process options based on search term
    const filteredProcessOptions = processedDropdownNames.filter((process) =>
        process.toLowerCase().includes(processSearch.toLowerCase())
    );

    // Render Form1 and optionally Form2 based on isChinaFabricPresent

    const handleIsChinaFabricChange = (e) => {
        const value = e.target.value;
        // If "Yes" is selected, show Form2, otherwise keep it hidden
        setIsChinaFabricPresent(value === 'Yes');
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior

        // Prepare form data object
        const formData = {
            startDate: SDate,
            endDate: EDate,
            productionPerDay: productionPerDay,
            totalOrderQuantity: totalOrderQuantity,
            fabricName: fabricName,
            process: process,
            perPieceRequirement: perPieceRequirement,
            colorQuantities: colorQuantities,
            stagesToBeSkipped: stagesToBeSkipped,
            isChinaFabricPresent: isChinaFabricPresent,
        };

        // Navigate to the Data page with form data as state
        navigate('/data', { state: { formData } });
    };

    return (
        <div className="container my-5">
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Start date input */}
                <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">START DATE</label>
                    <input type="date" name="startDate" value={SDate} onChange={handleDateChange} className="form-control" id="startDate" />
                </div>

                {/* End date input */}
                <div className="col-md-6">
                    <label htmlFor="endDate" className="form-label">END DATE</label>
                    <input type="date" name="endDate" value={EDate} onChange={handleDateChange} className="form-control" id="endDate" />
                </div>

                {/* Production Per Day Per Machine input */}
                <div className="col-12">
                    <label htmlFor="productionPerDay" className="form-label">Production Per Day Per Machine</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productionPerDay"
                        value={productionPerDay}
                        onChange={handleProductionPerDayChange}
                        placeholder="Enter number..."
                        min="1" // Prevent input less than 1
                        step="any" // Allows decimal numbers
                    />
                    {productionError && <div className="text-danger mt-2">{productionError}</div>}
                </div>

                {/* Total Order Quantity input */}
                <div className="col-12">
                    <label htmlFor="totalQuantity" className="form-label">Total Order Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalQuantity"
                        value={totalOrderQuantity}
                        onChange={handleTotalOrderQuantityChange}
                        placeholder="Enter quantity..."
                        min="1" // Prevent input less than 1
                    />
                    {totalOrderError && <div className="text-danger mt-2">{totalOrderError}</div>}
                </div>

                {/* Fabric name dropdown */}
                <div className="col-md-6">
                    <label htmlFor="fabricName" className="form-label">Fabric Name</label>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            id="fabricNameDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {fabricName || 'Choose...'}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="fabricNameDropdown">
                            {/* Search input */}
                            <li>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search fabric..."
                                    value={fabricSearch}
                                    onChange={(e) => setFabricSearch(e.target.value)}
                                />
                            </li>
                            {/* Filtered fabric options */}
                            {filteredFabricOptions.length > 0 ? (
                                filteredFabricOptions.map((fabric, index) => (
                                    <li key={index}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => handleFabricNameChange({ target: { value: fabric } })}
                                        >
                                            {fabric}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><span className="dropdown-item text-muted">No results found</span></li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Per Piece Requirement input */}
                <div className="col-6">
                    <label htmlFor="PerPieceRequirement" className="form-label">Per Piece Requirement</label>
                    <input
                        type="number"
                        className="form-control"
                        id="PerPieceRequirement"
                        value={perPieceRequirement}
                        onChange={handlePerPieceRequirementChange}
                        placeholder="Enter quantity..."
                        min="1" // Prevent input less than 1
                        step="any" // Allows decimal numbers
                    />
                    {perPieceError && <div className="text-danger mt-2">{perPieceError}</div>}
                </div>

                {/* Choose Unit radio input */}
                <div className="container mt-5">
                    <div className="d-flex align-items-center">
                        <p className="mr-3 mb-0">Choose Unit:</p>
                        <div className="form-check form-check-inline mx-4">
                            <input className="form-check-input" type="radio" name="unit" id="unit1" value="meter" />
                            <label className="form-check-label" htmlFor="unit1">Meters</label>
                        </div>
                        <div className="form-check form-check-inline mx-4">
                            <input className="form-check-input" type="radio" name="unit" id="unit2" value="kg" />
                            <label className="form-check-label" htmlFor="unit2">Kilogram</label>
                        </div>
                    </div>
                </div>

                {/* Process dropdown */}
                <div className="col-md-6">
                    <label htmlFor="processes" className="form-label">Processes (Dropdown)</label>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            id="processDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {process || 'Choose...'}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="processDropdown">
                            {/* Search input */}
                            <li>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search process..."
                                    value={processSearch}
                                    onChange={(e) => setProcessSearch(e.target.value)}
                                />
                            </li>
                            {/* Filtered process options */}
                            {filteredProcessOptions.length > 0 ? (
                                filteredProcessOptions.map((processOption, index) => (
                                    <li key={index}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => handleProcessChange({ target: { value: processOption } })}
                                        >
                                            {processOption}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><span className="dropdown-item text-muted">No results found</span></li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Color and Quantity Inputs */}
                <div className="col-12 row my-5">
                    <p>CHOOSE COLOR AND QUANTITY</p>
                    {colorQuantities.map((colorQuantity, index) => (
                        <div className="col-md-12 my-3" key={index}>
                            <input
                                type="color"
                                value={colorQuantity.color}
                                onChange={(e) => handleColorQuantityChange(index, 'color', e.target.value)}
                                className="me-5 p-0"
                                placeholder="choose color...."
                            />
                            <input
                                type="number"
                                value={colorQuantity.quantity}
                                onChange={(e) => handleColorQuantityChange(index, 'quantity', e.target.value)}
                                className="ms-2"
                                min="1"
                                placeholder="quantity..."
                            />
                        </div>
                    ))}
                </div>

                {/* Stages to Be Skipped (Dropdown) */}
                <div className="col-md-6">
                    <label htmlFor="stagesToBeSkipped" className="form-label">Stages to Be Skipped</label>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle w-100"
                            type="button"
                            id="stagesToBeSkippedDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {stagesToBeSkipped || 'Choose...'}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="stagesToBeSkippedDropdown">
                            {stagesDropdownOptions.map((stage, index) => (
                                <li key={index}>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleStagesToBeSkippedChange({ target: { value: stage } })}
                                    >
                                        {stage}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Is China Fabric Present */}
                <div className="container mt-5">
                    <div className="d-flex align-items-center">
                        <p className="mr-3 mb-0">Is China Fabric Present:</p>
                        <div className="form-check form-check-inline mx-4">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="chinafabric"
                                id="yes1"
                                value="Yes"
                                checked={isChinaFabricPresent === true}
                                onChange={handleIsChinaFabricChange}
                            />
                            <label className="form-check-label" htmlFor="yes1">Yes</label>
                        </div>
                        <div className="form-check form-check-inline mx-4">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="chinafabric"
                                id="no1"
                                value="No"
                                checked={isChinaFabricPresent === false}
                                onChange={handleIsChinaFabricChange}
                            />
                            <label className="form-check-label" htmlFor="no1">No</label>
                        </div>
                    </div>
                </div>

                {/* Conditionally render Form2 */}
                {isChinaFabricPresent && <Form2 />}


                {/* Submit button */}
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form1;
