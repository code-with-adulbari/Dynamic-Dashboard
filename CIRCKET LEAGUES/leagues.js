/**
 * Maps common country names to their flag emojis.
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
};

function isValidText(input) {
    if (!input) return false;
    if (!isNaN(+input.trim()) && input.trim() !== '') {
        return false;
    }
    return true;
}

function parsePlayerInput(input, defaultRole) {
    if (!input) return [];
    const wkRegex = /\s+\(WK\)$/i;
    
    return input.split(',').map(entry => {
        const parts = entry.trim().split('/');
        let playerName = parts[0] ? parts[0].trim() : '';
        let playerCountry = parts[1] ? parts[1].trim() : 'Unspecified';
        let playerRole = defaultRole;

        if (!isValidText(playerName)) {
            return null;
        }

        if (wkRegex.test(playerName)) {
            playerRole = 'Wicket-Keeper';
            playerName = playerName.replace(wkRegex, '').trim();
        }

        return {
            name: playerName,
            country: playerCountry,
            role: playerRole
        };
    }).filter(player => player !== null);
}

function collectLeagueData() {
    let leagueData = {};
    let leagueName;

    while (true) {
        leagueName = prompt("Which league do you want to show? (e.g., IPL, PSL, BBL, T10)");
        if (leagueName === null) return;
        
        if (isValidText(leagueName)) {
            break;
        } else {
            alert("⚠️ Please enter a correct League name. Example: **PSL**, **IPL**, **BBL**.");
        }
    }

    leagueData.league = leagueName.toUpperCase();
    leagueData.teams = [];

    while (confirm("Do you want to enter a team for the " + leagueName.toUpperCase() + "?")) {
        let teamName;
        while (true) {
            teamName = prompt("Enter the name of the Team:");
            if (teamName === null) break;
            
            if (isValidText(teamName)) {
                break;
            } else {
                alert("⚠️ Please enter a correct Team name. Example: **KARACHI**, **SYDNEY**, **RCB**.");
            }
        }
        if (!teamName) continue;

        let currentTeam = { name: teamName, players: [] };
        
        // Batsmen & Wicket-Keepers
        while (true) {
            const batsmanInput = prompt(
                `Enter ALL Batsmen & Wicket-Keepers for ${teamName} in this format:\n` +
                `Player Name/Country, Player Name (WK)/Country, ...\n` +
                `Example: Babar Azam/Pakistan, Rishabh Pant (WK)/India`
            );
            if (batsmanInput === null) break;

            const players = parsePlayerInput(batsmanInput, 'Batsman');
            if (players.length > 0 || isValidText(batsmanInput.split(',')[0])) {
                currentTeam.players.push(...players);
                break;
            } else {
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
            if (bowlerInput === null) break;

            const players = parsePlayerInput(bowlerInput, 'Bowler');
            if (players.length > 0 || isValidText(bowlerInput.split(',')[0])) {
                currentTeam.players.push(...players);
                break;
            } else {
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
            if (allRounderInput === null) break;

            const players = parsePlayerInput(allRounderInput, 'All-Rounder');
            if (players.length > 0 || isValidText(allRounderInput.split(',')[0])) {
                currentTeam.players.push(...players);
                break;
            } else {
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
 * Renders the collected data onto the web page (DOM) using Bootstrap grid classes.
 */
function renderLeagueData(data) {
    const outputSection = document.getElementById('league-output');
    const responsiveOutput = document.getElementById('responsive-output');
    
    // Clear previous content
    outputSection.innerHTML = ''; 
    responsiveOutput.innerHTML = '';

    // Create a main heading for the league
    const leagueTitle = document.createElement('h2');
    leagueTitle.textContent = data.leagues;
    outputSection.appendChild(leagueTitle);

    // Loop through each team and create a card within a responsive column
    data.teams.forEach(team => {
        // *** BOOTSTRAP GRID CLASSES ***
        // col-12: Full width on extra-small screens (mobile)
        // col-sm-6: Half width on small screens and up (2 cards per row)
        // col-lg-4: One-third width on large screens and up (3 cards per row)
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-sm-6 col-lg-4';

        const teamCard = document.createElement('div');
        teamCard.className = 'team-card'; // Keeps your custom styling

        const teamNameHeading = document.createElement('h3');
        teamNameHeading.textContent = team.name;
        teamCard.appendChild(teamNameHeading);

        const playerList = document.createElement('ul');
        playerList.className = 'player-list';

        team.players.forEach(player => {
            const playerItem = document.createElement('li');
            playerItem.className = 'player-item';

            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
                <span class="player-info">${player.name}</span>
                <span class="player-role">(${player.role || 'N/A'})</span>
            `;
            playerItem.appendChild(infoDiv);

            const flagSpan = document.createElement('span');
            // MODIFIED: '❓' changed to 'N/A'
            const flag = countryFlags[player.country] || 'N/A'; 
            flagSpan.className = 'flag';
            flagSpan.title = player.country || 'Country Not Specified';
            flagSpan.textContent = flag;
            playerItem.appendChild(flagSpan);

            playerList.appendChild(playerItem);
        });

        teamCard.appendChild(playerList);
        colDiv.appendChild(teamCard); // Append card to the column div
        responsiveOutput.appendChild(colDiv); // Append column div to the row
    });

    // Scroll to the new data
    outputSection.scrollIntoView({ behavior: 'smooth' });
}