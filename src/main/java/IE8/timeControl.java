package IE8;

//import java.util.regex.Pattern;
import java.io.IOException;
import java.sql.*;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mysql.fabric.jdbc.FabricMySQLDriver;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.SystemClock;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.*;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfNestedElementLocatedBy;

public class timeControl {
    private WebElement element;
    private WebDriverWait wait;
    private Driver DBdriver;
    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private String nomerZayavki, BaseUrl;
    private int lot;
    private long zakupka;
    private Connection connection;
    private Region okwindow;
    private long onlinecena;
    private Date date;
    private Pattern ok2,inputPass,ok3,gotovotpravit,podpisat, input2, ok4, otpravit, otpravil, pwdOk, pustoijava, gotovpodpisat, postavshik;
    @Before
    public void setUp() throws Exception {
        nomerZayavki = "1129111";
        zakupka = 289323;
        driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        DBdriver = new FabricMySQLDriver();
        DriverManager.registerDriver(DBdriver);
        wait = new WebDriverWait(driver, 30000);
        connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
        date = new Date();
        auth();

    }

    @Test
    public void slediZaVremenem() throws Exception {
        int i = 0;
        while (i == 0) {
            // chitatvremia();
            chatatvremyaend();
            chitatcenu();
            System.out.println("Цена = "+ onlinecena);
            System.out.println("Время завершения = "+ date.getTime());
            allrec();
            i = 0;
            Thread.sleep(500);
            driver.findElement(By.id("intervalButton")).click();
            /*if ((System.currentTimeMillis() - refreshtimer) > 1000) {
                driver.navigate().to(BaseUrl);
               element = wait.until(presenceOfElementLocated(By.xpath("//tr[@id='CloseDate__xc_']/td[3]/span")));
                refreshtimer = System.currentTimeMillis();
            }*/
        }
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
    private void SikuliModalWidow() throws Exception {
        System.out.println("sikulimodal");
        okwindow.setRect(754, 485, 115, 73);
        System.out.println("setrec");
        okwindow.wait(ok2, 10000);
        System.out.println("wait");
        okwindow.click(ok2);

    }
    private void chitatcenu()
    {
        // driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).click();
        // String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        element = wait.until(presenceOfElementLocated(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")));
        //убрал String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        try {
            String myrez0 = element.getText();
            String str = "";
            int i = 0;
            for (i = 0; myrez0.charAt(i) != '.'; i++) {
                if (myrez0.charAt(i) != ',') {
                    str += myrez0.charAt(i);
                }
            }
            onlinecena =  Integer.parseInt(str);

        } catch (NoSuchElementException e) {

        } catch (UnhandledAlertException e) {

        } catch (StaleElementReferenceException e) {

        } catch (ElementNotVisibleException e) {

        } catch (JavascriptException e){

        }



    }
    private void chatatvremyaend(){
        //tr[@id='CloseDate__xc_']/td[3]/span
        int hh = 0;
        int mm = 0;
        element = wait.until(presenceOfElementLocated(By.xpath("//tr[@id='CloseDate__xc_']/td[3]/span")));
        //убрал String myrez0 = driver.findElement(By.xpath("//span[@id='itemTable']/table[2]/tbody/tr[2]/td[6]/span")).getText();
        try {
            String myrez0 = element.getText();
            System.out.println(myrez0);
            String minstr = "";
            String hourstr = "";
            int i = 0;
            for (i = 0; i<19; i++) {
                //if (myrez0.charAt(i) != ',')
                if (i >= 11 && i < 13)
                {
                    hourstr += myrez0.charAt(i);
                }
                if (i >= 14 && i < 16)
                {
                    minstr += myrez0.charAt(i);
                }
            }
            System.out.println(hourstr);
            System.out.println(minstr);
            date.setHours(Integer.parseInt(hourstr));
            date.setMinutes(Integer.parseInt(minstr));
            date.setSeconds(0);

        } catch (NoSuchElementException e) {

        } catch (UnhandledAlertException e) {

        } catch (StaleElementReferenceException e) {

        } catch (ElementNotVisibleException e) {

        } catch (JavascriptException e){

        }
    }
    private void allrec() {
        // int etap = 0;
        String recetap = "update setup set cena = ?, timeend = ? where nomerzakupki =" + zakupka + " AND lot = 1";
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = connection.prepareStatement(recetap);
            preparedStatement.setLong(1, onlinecena);
            long vrem = date.getTime();
            java.sql.Time sqlTime = new java.sql.Time(vrem);
            preparedStatement.setTime(2,sqlTime);
            preparedStatement.execute();
            //connection.close();
        } catch (SQLException e) {
            System.err.println("Не удлаось подключиться к драйверу базы данных");

        }
    }
    private void chitatvremia()throws Exception{
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
       /* String[] args = {"cmd.exe", "/C", "time "+sdf.format(time)};
        java.lang.Runtime.getRuntime().exec(args);*/

    }
    private void auth() throws Exception
    {
        driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        driver.findElement(By.xpath("//a[contains(text(),'"+nomerZayavki+"')]")).click();
        driver.findElement(By.id("MonitorBiddingBtn")).click();
        // SikuliModalWidow();
        Thread.sleep(10000);

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
