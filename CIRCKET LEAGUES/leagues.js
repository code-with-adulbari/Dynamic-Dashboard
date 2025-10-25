/**
 * Maps common country names to their flag emojis.
 * This helps display the flag next to the player's country.
 */
const countryFlags = {
    'Pakistan': '🇵🇰',
    'India': '🇮🇳',
    'Australia': '🇦🇺',
    'West Indies': '🏝️',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'South Africa': '🇿🇦',
    'New Zealand': '🇳🇿',
    'Afghanistan': '🇦🇫',
    'Sri Lanka': '🇱🇰',
    'Bangladesh': '🇧🇩',
    'Nepal': '🇳🇵',
    // Add more as needed
};

/**
 * Helper function to check if a string is non-empty and not just a simple number.
 * This is crucial for validating names/text fields.
 * @param {string} input - The string to check.
 * @returns {boolean}
 */
function isValidText(input) {
    if (!input) return false;
    // Check if the trimmed input can be parsed as a number (e.g., "1", "3.5").
    // The '+input.trim()' attempts to convert the string to a number.
    if (!isNaN(+input.trim()) && input.trim() !== '') {
        // If it's a number, it's invalid for a name/league
        return false;
    }
    // Otherwise, it's considered valid text
    return true;
}

/**
 * Parses a comma-separated string of player data into an array of player objects.
 * NEW FEATURE: Now checks if the extracted player name is valid text using isValidText().
 * @param {string} input - The raw string input from the prompt.
 * @param {string} defaultRole - The fixed default role for these players (e.g., "Batsman").
 * @returns {Array<object>} - An array of player objects.
 */
function parsePlayerInput(input, defaultRole) {
    if (!input) return [];

    // Regex to detect "(WK)" at the end of a name
    const wkRegex = /\s+\(WK\)$/i;

    // Split the input by comma to get individual player entries
    return input.split(',').map(entry => {
        // Trim whitespace and split by slash to separate name and country
        const parts = entry.trim().split('/');
        
        let playerName = parts[0] ? parts[0].trim() : ''; // Changed default to empty string
        let playerCountry = parts[1] ? parts[1].trim() : 'Unspecified';
        let playerRole = defaultRole;

        // --- CORE FIX: Validate the extracted player name ---
        if (!isValidText(playerName)) {
            return null; // Reject player entry if the name is empty or just a number
        }

        // 1. Check for Wicket-Keeper indicator in the name
        if (wkRegex.test(playerName)) {
            playerRole = 'Wicket-Keeper';
            // Remove the "(WK)" indicator from the name for a clean display
            playerName = playerName.replace(wkRegex, '').trim();
        }

        return {
            name: playerName,
            country: playerCountry,
            role: playerRole
        };
    }).filter(player => player !== null); // Remove any null entries
}



/**
 * Main function to collect all league data from the user with validation and custom alerts.
 */
function collectLeagueData() {
    let leagueData = {};
    let leagueName;

    // 1. Get League Name with validation
    while (true) {
        leagueName = prompt("Which league do you want to show? (e.g., IPL, PSL, BBL, T10)");
        if (leagueName === null) return; // User pressed Cancel
        
        if (isValidText(leagueName)) {
            break; // Input is valid text, exit loop
        } else {
            // Alert for invalid/numeric input
            alert("⚠️ Please enter a correct League name. Example: **PSL**, **IPL**, **BBL**.");
        }
    }

    leagueData.league = leagueName.toUpperCase();
    leagueData.teams = [];

    // 2. Collect Teams and Players
    while (confirm("Do you want to enter a team for the " + leagueName.toUpperCase() + "?")) {
        let teamName;
        // Validate Team Name
        while (true) {
            teamName = prompt("Enter the name of the Team:");
            if (teamName === null) break; // User pressed Cancel
            
            if (isValidText(teamName)) {
                break; // Input is valid text, exit loop
            } else {
                // Alert for invalid/numeric input
                alert("⚠️ Please enter a correct Team name. Example: **KARACHI**, **SYDNEY**, **RCB**.");
            }
        }
        if (!teamName) continue; // Skip to next team if user cancelled/invalidated

        let currentTeam = { name: teamName, players: [] };
        
        // --- 3. Collect Players by Role with validation ---
        
        // Batsmen & Wicket-Keepers
        while (true) {
            const batsmanInput = prompt(
                `Enter ALL Batsmen & Wicket-Keepers for ${teamName} in this format:\n` +
                `Player Name/Country, Player Name (WK)/Country, ...\n` +
                `Example: Babar Azam/Pakistan, Rishabh Pant (WK)/India`
            );
            if (batsmanInput === null) break; // User pressed Cancel

            const players = parsePlayerInput(batsmanInput, 'Batsman');
            // The check is now against players.length AND that the input wasn't just a number
            if (players.length > 0) {
                currentTeam.players.push(...players);
                break; // Valid input with at least one player, exit loop
            } else if (isValidText(batsmanInput.split(',')[0])) {
                 // Allows empty input (user might not have a player for this role)
                 // This is a subtle check: if it was valid text but returned 0 players, something else is wrong, but usually it means the user hit enter without typing, which is fine.
                 // The main goal is to catch when the user types just '5' or '3,4'.
                 break;
            } else {
                // Alert if input resulted in no valid players (e.g., empty string, or only invalid entries like '3,4')
                alert("⚠️ Please enter correct data for Batsmen/Wicket-Keepers. Example: **BATSMAN Name/Country**.");
            }
        }

        // Bowlers
        while (true) {
            const bowlerInput = prompt(
                `Enter ALL Bowlers for ${teamName} in this format:\n` +
                `Player Name/Country, Player Name/Country, ...\n` +
                `Example: Shaheen Afridi/Pakistan,Jasprit Bumrah/India`
            );
            if (bowlerInput === null) break; // User pressed Cancel

            const players = parsePlayerInput(bowlerInput, 'Bowler');
            if (players.length > 0) {
                currentTeam.players.push(...players);
                break; // Valid input, exit loop
            } else if (isValidText(bowlerInput.split(',')[0])) {
                 break;
            } else {
                // Alert if input resulted in no valid players
                alert("⚠️ Please enter correct data for Bowlers. Example: **BOWLER NAME/Country**.");
            }
        }

        // All-Rounders
        while (true) {
            const allRounderInput = prompt(
                `Enter ALL All-Rounders for ${teamName} in this format:\n` +
                `Player Name/Country, Player Name/Country, ...\n` +
                `Example: Shadab Khan/Pakistan,Hardik Pandya/India`
            );
            if (allRounderInput === null) break; // User pressed Cancel

            const players = parsePlayerInput(allRounderInput, 'All-Rounder');
            if (players.length > 0) {
                currentTeam.players.push(...players);
                break; // Valid input, exit loop
            } else if (isValidText(allRounderInput.split(',')[0])) {
                 break;
            } else {
                // Alert if input resulted in no valid players
                alert("⚠️ Please enter correct data for All-Rounders. Example: **ALL-ROUNDER Name/Country**.");
            }
        }


        if (currentTeam.players.length > 0) {
            leagueData.teams.push(currentTeam);
        } else {
            alert(`No players were successfully entered for ${teamName}. Skipping this team.`);
        }
    }

    if (leagueData.teams.length > 0) {
        renderLeagueData(leagueData);
    } else {
        alert("No league data was entered. Please try again.");
    }
}


/**
 * Renders the collected data onto the web page (DOM).
 * (This function remains the same as it handles the output layout)
 * @param {object} data - The structured league data.
 */
function renderLeagueData(data) {
    const outputSection = document.getElementById('league-output');
    outputSection.innerHTML = ''; // Clear previous content

    // Create a main heading for the league
    const leagueTitle = document.createElement('h2');
    leagueTitle.textContent = data.league + ' Roster';
    outputSection.appendChild(leagueTitle);

    // Loop through each team and create a card
    data.teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        const teamNameHeading = document.createElement('h3');
        teamNameHeading.textContent = team.name;
        teamCard.appendChild(teamNameHeading);

        const playerList = document.createElement('ul');
        playerList.className = 'player-list';

        // Loop through each player in the team
        team.players.forEach(player => {
            const playerItem = document.createElement('li');
            playerItem.className = 'player-item';

            // Player Name and Role
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
                <span class="player-info">${player.name}</span>
                <span class="player-role">(${player.role || 'N/A'})</span>
            `;
            playerItem.appendChild(infoDiv);

            // Player Flag (Emoji)
            const flagSpan = document.createElement('span');
            // Get the flag from the map, default to a question mark if not found
            const flag = countryFlags[player.country] || '❓';
            flagSpan.className = 'flag';
            flagSpan.title = player.country || 'Country Not Specified';
            flagSpan.textContent = flag;
            playerItem.appendChild(flagSpan);

            playerList.appendChild(playerItem);
        });

        teamCard.appendChild(playerList);
        outputSection.appendChild(teamCard);
    });

    // Scroll to the new data
    outputSection.scrollIntoView({ behavior: 'smooth' });
}