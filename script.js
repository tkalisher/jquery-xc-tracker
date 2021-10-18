$(document).ready(function () {

    $('#reset-button').click(function () {
        console.log(this.id)
    })
    $('#stop-button').hide();
    $('#start-button').click(function () {
        $('#start-button').hide();
        $('#stop-button').show();
        const startTime = Date.now();
        const update = setInterval(updateTime, 1, startTime);
        $('#stop-button').click(function () {
            clearInterval(update)
            console.log("finished")
             $('#start-button').show();
             $('#stop-button').hide();
        })

        function updateTime(startTime) {
            const d = new Date();
            let raw_ms = new Date(d.getTime() - startTime)

            $("#clock").text(raw_ms.format('mm:ss fff'))
        }
    });
    $('#add-team-button').click(function () {

        $("#add-team-button").prop('disabled', true)
        const addTeamForm = `<form class="add-team-form">
        <label for="team-name">Team name:</label>
        <input class="team_name">
        <label for="color-picker">Team color</label>
        <input class="color-picker" type="color" value="#ff0000">
        <button type="button" class="submit-new-team">Submit</button>
    </form>`
        $('#form-p').append(addTeamForm);
        $('.submit-new-team').click(onSubmit);

        function onSubmit() {
            teamName = $('.team_name').val();
            if (teamName === '') {
                alert("Please enter a team name.");
                $(".add-team-form").remove();
                $("#add-team-button").prop('disabled', false)
                return
            }
            console.log(`New Team ${teamName} has been added!`);
            $("#teams").append(`<button type="button" id="${teamName}-button">${teamName}</button>`)
            $(".add-team-form").remove();

            $("#add-team-button").prop('disabled', false)
        }



    })

});