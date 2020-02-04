$(() => {
    const editor = new MediumEditor('#post-medium-editor', {
        placeholder: {
            text: '',
            hideOnClick: true
        }
    });

    $('.publish-button').on('click', (e) => {
        e.preventDefault();
        e.target.disabled = true;

        let data = {
            postTitle: $('#post-title').val(),
            postBody: $('#post-medium-editor').html()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done((data) => {
            const {resultCode, message, fields} = data;
            $('body').append(`
                <div id="post-added-message" class="post-added-message">
                <p id="message-body">${message}</p>
                <button id="close-message"> Close</button>
                </div>
               `);

            $('#close-message').click(() => {
                $('.publish-button').prop("disabled", false);
                // $('#post-added-message').toggleClass('active', false);
                $('#post-added-message').remove();

            });
            setTimeout(() => {
                $('#post-added-message').toggleClass('active', true);
                $('#close-message').focus();
            }, 1);

        })
    });
});

