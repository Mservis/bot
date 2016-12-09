package HelperBasePakage;

import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.Key;
import org.sikuli.script.KeyModifier;
import org.sikuli.script.FindFailed;

/**
 * Created by Administrator on 06.12.2016.
 */

public class SikuliHelper  {
    Pattern ok_btn = new Pattern("c:\\forsikuli\\ok.png");
    Pattern gucalov = new Pattern("c:\\forsikuli\\gucalov.png");
    Pattern ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
    Pattern inputPass = new Pattern("c:\\forsikuli\\inputPass.png");
    Pattern dialog = new Pattern("c:\\forsikuli\\dialog.png");
    Pattern ok3 = new Pattern("c:\\forsikuli\\ok3.png");
    Pattern dialog2 = new Pattern("c:\\forsikuli\\dialog2.png");
    Pattern gucalov2 = new Pattern("c:\\forsikuli\\gucalov2.png");
    Pattern podpisat = new Pattern("c:\\forsikuli\\podpisat.png");
    Pattern input2 = new Pattern("c:\\forsikuli\\input2.png");
    Pattern ok4 = new Pattern("c:\\forsikuli\\ok4.png");
    Pattern otpravit = new Pattern("c:\\forsikuli\\otpravit.png");
    Region okwindow = new Region(91,49,95,36);

    public void javaPWD() throws Exception {

        okwindow.setRect(618, 433, 271, 82);
        okwindow.wait(inputPass, 20000);
        //okwindow.paste(inputPass, "123456");
        okwindow.paste("123456");
        System.out.println("вогнал пароль");
        okwindow.click(ok3);
        System.out.println("Нажал ок");

    }

}
