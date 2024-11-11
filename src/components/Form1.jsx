import { useState, useEffect } from 'react';

function Form1() {
    // State to store the start date, end date, fabric name, and process
    const [SDate, setsDate] = useState('');
    const [EDate, seteDate] = useState('');
    const [fabricName, setFabricName] = useState('');
    const [process, setProcess] = useState('');

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

    return (
        <>
            <div className="container">
                <form className="row g-3">
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
                        <label htmlFor="inputAddress" className="form-label">Production Per Day Per Machine</label>
                        <input type="number" className="form-control" id="inputAddress" placeholder="enter number..." />
                    </div>

                    {/* Total Order Quantity input */}
                    <div className="col-12">
                        <label htmlFor="totalQuantity" className="form-label">Total Order Quantity</label>
                        <input type="text" className="form-control" id="totalQuantity" placeholder="enter quantity..." />
                    </div>

                    {/* Fabric name dropdown */}
                    <div className="col-md-6">
                        <label htmlFor="fabricName" className="form-label">Fabric Name</label>
                        <select id="fabricName" className="form-select" value={fabricName} onChange={handleFabricNameChange}>
                            <option value="">Choose...</option>
                            {fabricOptions.map((fabric, index) => (
                                <option key={index} value={fabric}>{fabric}</option>
                            ))}
                        </select>
                    </div>

                    {/* Per Piece Requirement input */}
                    <div className="col-6">
                        <label htmlFor="PerPieceRequirement" className="form-label">Per Piece Requirement</label>
                        <input type="number" name="perpiecerequirement" className="form-control" id="PerPieceRequirement" placeholder="enter quantity..." step="any" />
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
                        <select id="processes" className="form-select" value={process} onChange={handleProcessChange}>
                            <option value="">Choose...</option>
                            {processedDropdownNames.map((process, index) => (
                                <option key={index} value={process}>{process}</option>
                            ))}
                        </select>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Form1;
