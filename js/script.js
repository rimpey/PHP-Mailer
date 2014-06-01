$(document).ready(function () {

    //$('form').submit(function (e) { -> uses the HTML5 validation for form submit 
    //avoiding HTML5 validation not provided when target submit button id - not keen on presentation of error msgs

    //$('input[type="submit"]').click(function (e) {

    //message panel displayed when message sent
    $('#sentmsg').hide();

    $('#submit').click(function (e) {

        var abort = false;

        //select all inputs with a class of error and remove class
        $('.error').removeClass('error');

        //retrieve values entered
        //var fullname = document.getElementById('fullname');   //using JavaScript
        //var fullname = $('input[name="fullname"]');           //using jQuery - input name value where id not used to target
        //var fullname = $('#fullname');                        //using jQuery - id 

        //loop through each input field and check all required fields have a value
        $(':input[required]').each(function () {

            //return javascript 'this' object here wrapped and now it's a jQuery 'this' object
            //therefore able to call the jQuery method .val() if javascript 'this' would not be able to do - has value() mthd instead
            //jQuery useful val() will retrieve value on select items under the hoods knows 
            var $this = $(this);

            if ($this.val() === '') {
                //where a value does not exist turn the border red to indicate a problem
                $this.addClass('error');
                //make sure the email is not sent until all details have been correctly entered
                abort = true;
            }
        });

        //check email and postcode entered are valid
        var email = $('input[type="email"]');
        var pcode = $('input[name="postcode"]')

        var emailval = email.val();
        var pcodeval = pcode.val();

        //use regex pattern for email and postcode calling the test method and passing the email and postcode entered
        //return value from the test method is either true or false
        var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(emailval);
        var validpcode = /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/.test(pcodeval);

        if (!validemail) {
            email.addClass('error');
            abort = true;
        }

        if (!validpcode) {
            pcode.addClass('error');
            abort = true;
        }


        if (!abort) {

            //send email - submit via ajax 
            $(this).prop('disabled', true);
            this.value = 'Sending'

            //var data = $('form').serialize();
            //pageOutput is the result of the sendmail.php call back to the server comes back with output of
            //can check what was received back from the server - [success or fail or data determined]
            //$.post('sendmail.php', data, function (pageOutput) {
            //$.post($('form').attr('action'), data, function () {
            //alert(pageOutput);
            //$('body').prepend('<p>Fanks :)</p>');


            $.post('sendmail.php', $('form').serialize(), function (pageOutput) {
                //assume successful - maybe check
                //could send msg from php page to indicate success
                //alert('Mail Sent');

                //alert message received from php file
                //alert(pageOutput);
                $('#sentmsg').html(pageOutput);

                //clear form 
                /*
                $(':input').each(function () {
                $(this).val("");
                //$(this).css('background-color', 'white'); - yellow background - user agent style sheet
                });*/



                //reset submitbutton
                /*$('#submit')
                .val("Submit")
                .prop('disabled', false);

                */

                //$('#name-co-container, #email-pcode-container, .formmsg, #submit').hide();
                $('form').hide();
                $('#sentmsg').show();


            })
        }

        //form prevented from doing it's normal submit - prevented from refreshing the page with ajax submit
        //return false does both of: e.preventDefault(); and e.stopPropagation();
        return false;

    }) //on submit

});            //ready
