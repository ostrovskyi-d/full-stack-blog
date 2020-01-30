console.log("dev/js/auth.js connected")

$(() => {
    let flag = true;
    $('.auth form button').on('click', (e) => {
        e.preventDefault();
        if (flag) {
            flag = false
            $('.register').show('slow')
            $('.login').hide();
        } else {
            flag = true;
            $('.login').show('slow');
            $('.register').hide();
        }
    })
})