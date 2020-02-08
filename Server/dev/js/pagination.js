$(()=> {
    $('.pagination a').each((i, el) => {
        if((i+1) === commonObj.currentPage) {
            $(el).addClass('active')
        }
    })
});