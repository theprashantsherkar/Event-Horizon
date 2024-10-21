import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css'; // Import custom CSS for styling

const Leaderboard = () => {
    const [teams, setTeams] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false); // State to control leaderboard display

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            // Sort data in descending order by score
            const sortedTeams = data.sort((a, b) => b.Score - a.Score);

            setTeams(sortedTeams);
            setFileUploaded(true);
            setShowLeaderboard(true); // Automatically show leaderboard after file upload
        };

        reader.readAsBinaryString(file);
    };

    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };

    return (
        <div className="leaderboard-container flex flex-col justify-center">
            <h2 className="leaderboard-title">Leaderboard</h2>

            {/* Conditionally show the file upload input */}
            {!fileUploaded && (
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            )}

            {/* Toggle button to disclose the result */}
            {fileUploaded && (
                <button className="toggle-button" onClick={toggleLeaderboard}>
                    {showLeaderboard ? 'Hide Results' : 'Disclose Results'}
                </button>
            )}

            {/* Conditionally display the leaderboard based on showLeaderboard state */}
            {showLeaderboard && (
                <div className="leaderboard">
                    {teams.length > 0 ? (
                        teams.map((team, index) => (
                            <div key={index} className="leaderboard-info">
                                <div className="team-rank">
                                    <h3>{index + 1}</h3>
                                </div>
                                <div className="team-info">
                                    <h3 className="team-name">{team.Team}</h3>
                                </div>
                                <div className="team-rank">
                                    <h3>{team.Score} Pts.</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available. Please upload an Excel file.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
