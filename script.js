$('#stop-button').hide();
$(document).ready(function () {
    $('#stop-button').hide();
    const finish_table = [];
    const teams = [];
    let place = 1;
    $('#reset-button').click(function () {
        console.log(this.id)
    })

    $('#start-button').click(function () {
        $('#start-button').hide();
        $('#reset-button').hide();
        $('#add-team-button').hide();
        $('#stop-button').show();
        $('.place-runner').prop('disabled', false);
        $('.x-button').hide()


        const startTime = Date.now();
        const update = setInterval(updateTime, 1, startTime);
        $('#stop-button').click(function () {
            clearInterval(update)
            final_scores = {} //teamName, totalPoints (less is better)
            for (let t of teams) {
                final_scores[t] = [];
            }
            console.log(final_scores)
            for (let f of finish_table) {
                final_scores[f[2]].push(f[0])
            }
            console.log(final_scores)
            $('#start-button').show();
            $('#reset-button').show();
            $('#stop-button').hide();
        })

        function updateTime(startTime) {
            const d = new Date();
            let raw_ms = new Date(d.getTime() - startTime).format("mm:ss fff")


            $("#clock div").text(raw_ms.substring(0, 5))
            $("#clock small").text(raw_ms.substring(5))
        }
    });
    $("#reset-button").click(reset)

    function reset() {
        window.location = window.location
    }
    $('#add-team-button').click(function () {

        $("#add-team-button").prop('disabled', true)
        const addTeamForm = `
        <form class="add-team-form">
        <br>
            <div class="row">
                <div class="col-7">
                    <input class="team-name form-control color-input" placeholder="Team Name">
                </div>
                <div class="col-1">
                
                    <input class = "team-color form-control form-control-color"
                    type = "color"
                    value = "#f2f2f2">
                </div>
                <div class="col-4">
                    <button type="button" class="submit-new-team btn btn-success btn-block">Add</button>
                </div>
            </div>
        </form>`
        $('#form-p').append(addTeamForm);
        $('.submit-new-team').click(onSubmit);

        function onSubmit() {
            teamName = $('.team-name').val()

            teamColor = $('.team-color').val();
            alreadyTaken = false
            for (let t of teams) {
                if (teamName == t) {
                    alreadyTaken = true
                }
            }
            if (teamName === '' ||
                teamName.startsWith(",") || alreadyTaken) {
                $(".add-team-form").remove();
                $("#add-team-button").prop('disabled', false)
                const alertMsg = `<br><div class="alert alert-danger alert-dismissible">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Try again!</strong> Please enter a valid team name or one that hasn't been taken.
                    </div>`
                $('#form-p').append(alertMsg);

            } else {
                teams.push(teamName)
                console.log(`New Team ${teamName} has been added!`);
                const newButton = (
                    `<div class="card col w-25 p-2 mb-5" id="${teamName.replace(/ /g, '')}-div" >
                    <div class="card-header" style="background-color:${teamColor};">
                        ${teamName}
                         <button type="button" class="btn-close float-right pl-5 x-button"  aria-label="Close"></button>
                    </div>
                    
                        <button type="button" class="btn btn-block border border-dark place-runner" id="${teamName.replace(/ /g, '')}-button" disabled>
                            Place Runner
                        </button>
                </div>`);
                $("#teams").prepend(newButton)



                $(".x-button").click(function () {
                    console.log(`${teamName} has been deleted!`);
                    let card = $(this).parent().parent()
                    card.fadeOut(300, function () {
                        card.remove();
                    });
                })



                $(`#${teamName.replace(/ /g, '')}-button`).click(function () {
                    myTeam = $(this).parent().find('div').text().replace(/\r?\n|\r/g, "").trim();
                    myColor = $(this).parent().find('div').css('background-color')
                    currTime = $('#clock div').text() + "." + $('#clock small').text().substring(1)
                    finish_table.push([place, currTime, myTeam, myColor])


                    newRow = (
                        `<tr style="background-color:${myColor};">
                        <th scope="col">${place}</th>
                        <td>${currTime}</th>
                        <td>${myTeam}</th>
                    </tr>`);


                    $("#finish-table-body").append(newRow)
                    console.log(finish_table)
                    place++
                })
                $(".add-team-form").remove();

                $("#add-team-button").prop('disabled', false)
            }

        }




    })

})