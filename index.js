
        let leagueInfo = document.getElementById("leagueInfo")
        let playerStats = document.getElementById("playerStats")
        let player_search = document.getElementById("player_search")
        function getGame() {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '19eeded5a9mshe52a0370c16fcfbp10f2c0jsne70022ad09ee',
                }
            };

            fetch('https://football98.p.rapidapi.com/premierleague/fixtures', options)
                .then(response => response.json())
                .then(data => {
                    for (let matchDay in data[0]) {
                        console.log(matchDay)
                        for (let i = 0; i < data[0][matchDay].length; i++) {
                            let matchData = data[0][matchDay][i]
                            console.log(data[0][matchDay][i])
                            leagueInfo.innerHTML += `<h4> Date: ${matchData.MatchDay} , 
                                Home Team: ${matchData.homeTeam} , 
                                Home Team Logo: <img src="${matchData.homeLogo}">, 
                                Away Team: ${matchData.awayTeam} ,
                                Away Team Logo: <img src="${matchData.awayLogo}">,
                                </h4>`
                        }
                    }


                });
        }

        function getStats() {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '19eeded5a9mshe52a0370c16fcfbp10f2c0jsne70022ad09ee',
                }
            }

            fetch(`https://api-football-v1.p.rapidapi.com/v3/players?league=39&search=${player_search.value}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    const {
                        age,
                        birth,
                        firstname,
                        height,
                        id,
                        injured,
                        lastname,
                        name,
                        nationality,
                        photo,
                        weight
                    } = data.response[0].player

                    const { date, place, country } = birth

                    playerStats.innerHTML = `<ul style="list-style: none;">
                    <li><img src = "${photo}"</li>
                    <li><b>Name: </b> ${name}</li>
                    <li><b>firstname: </b> ${firstname}</li> 
                    <li><b>Last Name: </b> ${lastname}</li>
                    <li><b>Age: </b> ${age}</li>
                    <li><b>Date: </b> ${date}</li>
                    <li><b>Place: </b> ${place}</li>
                    <li><b>Country: </b> ${country}</li>       
                    <li><b>Nationality: </b> ${nationality}</li>             
                    <li><b>Height: </b> ${height}</li>
                    <li><b>Weight: </b> ${weight}</li>
                    <li><b>Injured: </b> ${injured}</li>
                    </ul>`

                    data.response[0].statistics.forEach(stat => {


                        const {
                            cards,
                            games,
                            goals,
                            league,
                            shots,
                            team
                        } = stat;
                        playerStats.innerHTML += `<ul style="list-style: none;">
                            <li><b> League: </b> Name: ${league.name}, Country: ${league.country}</li>
                            <li><b> Team: </b> Name: ${team.name}, <img src = "${team.logo}"</li>
                            <li><b> Games: </b> Appearences: ${games.appearences}, Minutes: ${games.minutes}, Position: ${games.position}</li>
                            <li><b> Goals: </b> Goals Scored: ${goals.total}, Assists: ${goals.assists}, Saves: ${goals.saves}</li>
                            <li><b> Shots: </b> Total Shots: ${shots.total}
                            <li><b> Cards: </b> yellow: ${cards.yellow}, Red: ${cards.red}</li>
                            <li><b> 
                            </ul>`







                    })


                })
        };
