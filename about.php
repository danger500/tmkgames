<?php 

if (@empty($_POST['user'] && $_POST['ms'] && $_POST['em'] && $_POST['num'] )) {

echo "هذه الفورم فارغة المرجو كتابة المعلومات المناسبة";



}

else {
    
$File = "USER_TMK_MESSAGE.txt"; 
$Handle = fopen($File, 'w');
$Data =  $_POST['user'] . "-------------" .  $_POST['ms']. "-------------" . $_POST['em']. "-------------" . $_POST['num'] . "-------------" ;
fwrite($Handle, $Data); 
$Data = "---------------------------------------------------------------------\n"; 
fwrite($Handle, $Data); 
print "تم ارسال الرسالة بنجاح"; 
fclose($Handle);
}

?>







<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Tmk</title>
    <link rel="stylesheet" href="bt.css">
</head>
<body>

<form action="about.php" method="post">
    <div class="login-wrap">
        <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">

                Send Message T o TMK GAMES
                <center>
                    <br>
            
                    <img style="width: auto; height: 80px;" src="/img/Fixed.download.jpeg" alt="">
            <br> <br>
                </center>
            </label>

            <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab"></label>
            <div class="login-form">
                <div class="sign-in-htm">
                    <div class="group">
                        <label for="user" class="label">Username</label>
                        <input name="user" type="text" class="input">
                    </div>
                    <div class="group">
                        <label for="em" class="label">Email</label>
                        <input name="em" type="email" class="input">
                    </div>
                    <div class="group">
                        <label for="num" class="label">Number Phone</label>
                        <input name="num" type="number" class="input">
                    </div>
                    <div class="group">
                        <label for="ms" class="label">Message</label>
                        <input name="ms" type="text" class="input">
                    </div>
                 
                    <div class="group">
                        <input id="check" type="checkbox" class="check" checked>
                        <label for="check"><span class="icon"></span> I LOVE TMK GAMES</label>
                    </div>
                    <div class="group">
                        <input type="submit" class="button" value="Send Massge">
                    </div>
                    <div class="hr"></div>
                    <div class="foot-lnk">
                        <a href="https://www.youtube.com/c/TMKGAMES">See TMK GAMES</a>
                    </div>
                </div>
                
                </form>









</body>
</html>