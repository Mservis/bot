package IE8;

//import java.util.regex.Pattern;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

public class TimeSinhron {

    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private String nomerZayavki;

    @Before
    public void setUp() throws Exception {
        nomerZayavki = "1099408";
        driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        auth();
    }

    @Test
    public void SdelatSinhroVremeni() throws Exception {
        Thread.sleep(2000);
        boolean probel = false;
        String ostalos =  driver.findElement(By.id("TimeLeft")).getText();
        String konec = driver.findElement(By.id("N")).getText();
        String vremyakonec = "";
        for (int i = 0; i< konec.length();i++)
        {

            if((konec.charAt(i) == ' ')&&(!probel))
            {
                probel = true;
                i++;
            }
            if(probel) vremyakonec += konec.charAt(i);
        }

        int hhOst = Integer.parseInt("" + ostalos.charAt(0) + ostalos.charAt(1));
        System.out.println(hhOst);
        int mmOst = Integer.parseInt("" + ostalos.charAt(3) + ostalos.charAt(4));
        System.out.println(mmOst);
        int ssOst = Integer.parseInt("" + ostalos.charAt(6) + ostalos.charAt(7));
        System.out.println(ssOst);
        int hhKon = Integer.parseInt("" + vremyakonec.charAt(0) + vremyakonec.charAt(1));
        System.out.println(hhKon);
        int mmKon = Integer.parseInt("" + vremyakonec.charAt(3) + vremyakonec.charAt(4));
        System.out.println(mmKon);
        int ssKon = Integer.parseInt("" + vremyakonec.charAt(6) + vremyakonec.charAt(7));
        System.out.println(ssKon);
        int ssServ = 0;
        int mmServ = 0;
        int hhServ = 0;
        if (ssKon < ssOst)
        {
            ssServ = ssKon + 60 - ssOst;
            if (mmKon == 0)
            {
                hhKon--;
                mmKon += 59;
            }
            else
            {
                mmKon--;
            }
        }
        else ssServ = ssKon-ssOst;
       // System.out.println("Время сервера нооборот столбиком сек мин час");
       // System.out.println(ssServ);
        if (mmKon<mmOst)
        {
            mmServ = mmKon + 60 - mmOst;
            hhKon--;
        }
        else mmServ = mmKon  - mmOst;
      //  System.out.println(mmServ);

        if (hhKon < hhOst)  hhServ = hhKon-hhOst+12;
        else hhServ = hhKon-hhOst;
       // System.out.println(hhServ);
        String hhStr,mmStr,ssStr = "";
        if (hhServ < 10) hhStr = "0"+hhServ;
        else hhStr = ""+ hhServ;
        if (mmServ < 10) mmStr = "0"+mmServ;
        else mmStr = "" + mmServ;
        if (ssServ < 10) ssStr = "0"+ssServ;
        else ssStr = "" + ssServ;

        System.out.println("Время сервера      "+ hhStr+":"+mmStr+":"+ssStr);

        Date time = new Date(System.currentTimeMillis());
        SimpleDateFormat sdf= new SimpleDateFormat(" HH:mm:ss ");
        System.out.println("Системное время   "+ sdf.format(time));
        System.out.println(ostalos);
        System.out.println(konec);
        System.out.println(vremyakonec);
        SimpleDateFormat sdfd= new SimpleDateFormat(" HH:mm:ss ");




        // ProcessBuilder builder = new ProcessBuilder( new String[] { "cmd.exe", "/C", "time "+sdf.format(time)});
        String[] args = {"cmd.exe", "/C", "time "+sdf.format(time)};
        java.lang.Runtime.getRuntime().exec(args);
        //ProcessBuilder builder = new ProcessBuilder( new String[] { "cmd.exe", "ping 192.168.0.12"});
        //builder.start();

        /*try {
            builder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
        builder = new ProcessBuilder(
                new String[] { "cmd.exe", "/C",
                        "time "+sdfd.format(time)});
        try {
            builder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }*/

    }
    @After
    public void tearDown() throws Exception {
        driver.quit();
        String verificationErrorString = verificationErrors.toString();
        if (!"".equals(verificationErrorString)) {
            fail(verificationErrorString);
        }
    }
    private void auth()
    {
        driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        driver.findElement(By.xpath("//a[contains(text(),'"+nomerZayavki+"')]")).click();


    }
    private boolean isElementPresent(By by) {
        try {
            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    private String closeAlertAndGetItsText() {
        try {
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            if (acceptNextAlert) {
                alert.accept();
            } else {
                alert.dismiss();
            }
            return alertText;
        } finally {
            acceptNextAlert = true;
        }
    }

}
