

$(() => {
    // Remove errors in validation
    const removeErrors = () => {
        $('p.error').remove();
        $('p.success').remove();
        $('input').css({ "box-shadow": "none" });
    }

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

        // clear error/success form fields after switching
        removeErrors();
    });


    // clear form fields
    $('form input').on('focus', () => {
        removeErrors();
    });


    // register
    $('#submit-register').on('click', (e) => {
        // basic behavior
        e.preventDefault();
        removeErrors()


        let data = {
            login: $('#reg-login').val(),
            password: $('#reg-password').val(),
            passwordConfirm: $('#pass-repeat').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/register',
        }).done(
            
            ({ resultCode, error, message, fields, ...data }) => {
                
                if (resultCode === 102) {
                    fields.forEach(field => {
                        $(`input[name = ${field}]`).css({ 'box-shadow': '0 0 0 2px #ff9595', 'transition-duration': '0.6s' });
                    });
                    $('.register h2').after(`<p class='error'> ${message} </p>`)

                } else if (resultCode === 101) {
                    fields.forEach(field => {
                        $(`input[name = ${field}]`).css({ 'box-shadow': 'none' });
                    });
                    // $('.register h2').after(`<p class='success'> ${message} </p>`);
                    $(location).attr('href', '/')
                }
            }
        )
    });

    // login
    $('#submit-login').on('click', (e) => {
        e.preventDefault();
        removeErrors()

        let data = {
            login: $('#log-login').val(),
            password: $('#log-password').val()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'api/auth/login'
        }).done(
            ({ resultCode, error, message, fields = [], ...data }) => {
                if (resultCode === 102) {
                    fields.forEach(field => {
                        $(`input[name = ${field}]`).css({ 'box-shadow': '0 0 0 2px #ff9595', 'transition-duration': '0.6s' });
                    });
                    $('.login h2').after(`<p class='error'> ${message} </p>`)
                } else if (resultCode === 101) {
                    fields.forEach(field => {
                        $(`input[name = ${field}]`).css({ 'box-shadow': 'none' });
                    });
                    $(location).attr('href', '/')
                    // $('.login h2').after(`<p class='success'> ${message} </p>`)

                }
            }
        )
    });

    // Logout
    $('#logout').on('click', (e) => {
        // basic behavior
        e.preventDefault();
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: 'api/auth/logout',
        }).done(() => $(location).attr('href', '/'))
    });

});







