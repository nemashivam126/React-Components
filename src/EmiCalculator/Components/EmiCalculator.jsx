import { useState } from "react";
// import '../Styles/EmiCalculator.css';

export const EmiCalculator = () => {
    const [amount, setAmount] = useState('50000');
    const [year, setYear] = useState('1');
    const [interest, setInterest] = useState('10.5');
    const [emi, setEmi] = useState('');
    const [tot_interest, setTot_interest] = useState('0');
    const [int_percent, setInt_percent] = useState('0');
    const [tot_amt, setTot_amt] = useState('0');
    let degree = (int_percent * 360) / 100;

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    function handleYearChange(e) {
        setYear(e.target.value);
    }

    function handleInterestChange(e) {
        setInterest(e.target.value);
    }

    function handleSubmit() {
        let P = parseFloat(amount);
        let R = (parseFloat(interest) / 12) / 100;
        let N = parseFloat(year) * 12;
        let cal = P * (R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        let emi = Math.ceil(cal);
        setEmi(emi);

        let tot_amt = emi * N;
        setTot_amt(tot_amt);

        let tot_interest = tot_amt - P;
        setTot_interest(tot_interest);

        let int_percent = ((tot_interest / P) * 100).toFixed(2);
        setInt_percent(int_percent);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Personal Loan EMI Calculator</h1>
            <div className="card p-4 shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label>Amount you need (₹)</label>
                        <input className="form-control" onChange={handleAmountChange} value={amount} type="number" min="50000" max="5000000" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Years</label>
                        <input className="form-control" onChange={handleYearChange} value={year} type="number" min="1" max="5" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Interest rate (%)</label>
                        <input className="form-control" onChange={handleInterestChange} value={interest} type="number" step="0.1" min="10.5" max="21" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <input type="range" className="form-range" onChange={handleAmountChange} value={amount} min="50000" max="5000000" />
                        <div className="d-flex justify-content-between">
                            <span>₹50,000</span>
                            <span>₹50,00,000</span>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <input type="range" className="form-range" onChange={handleYearChange} value={year} min="1" max="5" />
                        <div className="d-flex justify-content-between">
                            <span>1 Year</span>
                            <span>5 Year</span>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <input type="range" className="form-range" onChange={handleInterestChange} value={interest} step="0.1" min="10.5" max="21" />
                        <div className="d-flex justify-content-between">
                            <span>10.5%</span>
                            <span>21%</span>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button onClick={handleSubmit} className="btn btn-primary">Calculate</button>
                </div>
            </div>
            {emi && (
                <div className="card mt-4 p-4 shadow-sm">
                    <h4 className="text-center">Your Monthly EMI: <b>₹{emi}</b></h4>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <div className="bar text-white" style={{ background: `conic-gradient(#7d2ae8 ${degree}deg, darkcyan 0deg)`, transition: 'background 1s ease', width: '150px', height: '150px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {int_percent}%
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <div><span className="bi bi-square-fill" style={{ color: '#7d2ae8' }}> <b>Interest Percentage: {int_percent}%</b></span></div>
                        <div><span className="bi bi-square-fill" style={{ color: 'darkcyan' }}> <b>Principal Amount: {100 - int_percent}%</b></span></div>
                        <div><b>Total Interest Amount: ₹{tot_interest}</b></div>
                        <div><b>Total Amount Payable: ₹{tot_amt}</b></div>
                    </div>
                </div>
            )}
        </div>
    );
};
