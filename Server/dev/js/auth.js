$(() => {
    let flag = true;
    $('.auth form .switch-button').on('click', (e) => {
        e.preventDefault();
        if (flag) {
            flag = false;
            $('.register').show('slow');
            $('.login').hide();
        } else {
            flag = true;
            $('.login').show('slow');
            $('.register').hide();
        }
    });

    // register
    $('#submit-register').on('click', (e) => {
        e.preventDefault();
        let data = {
            login: $('#reg-login').val(),
            password: $('#reg-password').val(),
            passwordConfirm: $('#pass-repeat').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/register'
        }).done((data) => {
            console.log(data);
        })
    });

    // login
    $('#submit-login').on('click', (e) => {
        e.preventDefault();
        let data = {
            login: $('#log-login').val(),
            password: $('#log-password').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/login'
        }).done((data) => {
            console.log(data)
        })
    });


});







