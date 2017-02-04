package IE8;

//import java.util.regex.Pattern;
import java.sql.*;
import java.util.Date;
import HelperBasePakage.SikuliHelper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import com.mysql.fabric.jdbc.FabricMySQLDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.SystemClock;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.Key;
import org.sikuli.script.KeyModifier;
import org.sikuli.script.FindFailed;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;
import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

public class chernovik {
    private Driver DBdriver;
    private Connection connection;
    private Statement statement;
    private int dostarta;
  //  private WebDriver driver;
    //private String baseUrl;
   // private boolean acceptNextAlert = true;
    //private StringBuffer verificationErrors = new StringBuffer();
   // private  WebElement element;
   // private WebDriverWait wait;
  //  private Region okwindow;
   // private  Pattern ok2;
    //private SikuliHelper sikulihelper;


    @Before
    public void setUp() throws Exception {
        DBdriver = new FabricMySQLDriver();
        DriverManager.registerDriver(DBdriver);
        connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
        dostarta = 60;
       // sikulihelper = new SikuliHelper();
        //sikulihelper.javaPWD();
       /*driver = new InternetExplorerDriver();
        wait = new WebDriverWait(driver, 30000);
       //baseUrl = "http://tender.sk.kz/";
       driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        okwindow = new Region(91,49,95,36);
        ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");*/

    }

    @Test
    public void chernoviK() throws Exception {

        //double onlinecena =  Double.parseDouble(str);

        String myrez0 = "195.22 - 217.72";
        String str = "";
        int i = 0;
        for (i = 0; myrez0.charAt(i) != ' '; i++) {
            if (myrez0.charAt(i) != ',') {
                str += myrez0.charAt(i);
            }
        }

        double onlinecena =  Double.parseDouble(str);
        System.out.println(onlinecena);
    }

    @After
   public void tearDown() throws Exception {
       // driver.quit();
       // String verificationErrorString = verificationErrors.toString();
        /*if (!"".equals(verificationErrorString)) {
            fail(verificationErrorString);
        }*/
    }
 /*public void

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
    private void funkcia()
    {
        System.out.println("Функция работает");
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
    }*/

}
