$(document).ready(function () {
    $('#tab1').css('display', 'block');
    $('.tab__item').click(function () {
        let current = $(this).data('tab');
        console.log(current)
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('#' + current).fadeIn();
        $('#' + current).siblings().css('display', 'none');

    });
    $('.startBtn').click(function (event) {
        event.preventDefault();
        $('body').addClass('modalOpen');
        $('.modal').fadeIn();
    })
    $('.closeBtn').click(function (event) {
        event.preventDefault();
        $('body').removeClass('modalOpen');
        $('.modal').fadeOut();
    })
    $('.email-mask').click(function () {
        $('.modal').fadeOut();
        $('body').removeClass('modalOpen');
    });
    $('.modal-content').click(function (event) {
        event.stopPropagation();
    });
    $(document).keydown(function (e) {
        // ESCAPE key pressed
        if (e.keyCode == 27) {
            $('.modal').fadeOut();
            $('body').removeClass('modalOpen');
        }
    });
    emailjs.init('user_YUvsjTW1o5xMdDWvekyVU');
    $('.sendBtn').on('click', sendmail);
    function sendmail(event) {

        event.preventDefault();
        let name = $('#name').val();
        let gender = $('input[name=gender]:checked').val()
        let company = $('#company').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let message = $('#commit').val();
        let templateParams = {
            "name": name,
            "gender": gender,
            "company": company,
            "email": email,
            "phone": phone,
            "message": message,
        }

        if (name == '' || phone == '') {
            alert('請填寫姓名和電話')
            if (name == '') {

                $('#name').focus()
            } else {

                $('#phone').focus()
            }
        }
        else {
            let service_id = "default_service";
            let template_id = "shop1688mail";
            let userID = "user_YUvsjTW1o5xMdDWvekyVU";
            $('.sendBtn').text('請稍等...')
            $('.sendBtn').css('pointer-events', 'none')
            emailjs.send(service_id, template_id, templateParams, userID)
                .then((response) => {
                    $('.sendBtn').text('送出')
                    $('.sendBtn').css('pointer-events', 'all');
                    $('.modal').css('display', 'none');
                    $('body').removeClass('modalOpen');
                    alert('感謝您的來信,我們會盡快與您聯繫');

                    $('#name').val('');
                    $('#gender').val('');
                    $('#company').val('');
                    $('#email').val('');
                    $('#phone').val('');
                    $('#commit').val('');
                    console.log('SUCCESS!', response.status, response.text);
                })
                .catch((error) => {
                    console.log('FAILED...', error);
                })
        }

    }

});