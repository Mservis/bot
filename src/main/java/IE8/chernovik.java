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
        for (int i = 0; i<20;i++) {
            System.out.println(System.currentTimeMillis() + "");
            //Thread.sleep(1000);
        }

        // funkcia();
      /* Connection connection;
        Driver driver2 = new FabricMySQLDriver();
        DriverManager.registerDriver(driver2);
        Statement statement;
        connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");*/
       long sechas = 0;
        long nachalo = 0;
        do {
            try {

                //connection = DriverManager.getConnection("jdbc:mysql://192.168.1.12:3306/mydbtest", "root", "root");
                statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("select * from setup where nomerzakupki =" + 286023 + " AND lot = " + 1);
                while (resultSet.next()) {
                    Time timeend = resultSet.getTime("timeend");
                    nachalo = ((timeend.getHours() * 60 + timeend.getMinutes()) * 60 + timeend.getSeconds()-dostarta);
                    Date date = new Date();
                    sechas = ((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds());
                    }
            } catch (SQLException e) {
                System.err.println("Не удлаось подключиться к драйверу базы данных");
            }
            System.out.println("Осталось " +(nachalo - sechas));
            Thread.sleep(500);
        } while (nachalo > sechas);
        System.out.println("Старт ");
        //sikulihelper.javaPWD();
       /* driver.manage().window().maximize();
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        element = wait.until(presenceOfElementLocated(By.id("passwordField")));
        element.sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        element = wait.until(presenceOfElementLocated(By.xpath("//a[contains(text(),'"+1106614+"')]")));
        baseUrl = driver.getCurrentUrl();
        element.click();
        //element = wait.until(presenceOfElementLocated(By.linkText("Строки")));
        //element.click();
        element = wait.until(presenceOfElementLocated(By.xpath("//a[@id='FileListRNEx:SignItem:" + (2-1) + "']/img")));
        element.click();// подписать
        okwindow.setRect(754, 485, 115, 73);
        okwindow.wait(ok2, 10000);
        okwindow.click(ok2);
        okwindow.setRect(618, 433, 271, 82);
        Pattern inputPass = new Pattern("c:\\forsikuli\\ie8\\pass.png");

        okwindow.wait(inputPass, 20000);
        boolean viguPWD = false;
        do {
            okwindow.type("123456");
            okwindow.type("a", KeyModifier.CTRL);

            try {
                okwindow.find(ok2);
                viguPWD = true;
            } catch (FindFailed e) {
                viguPWD = false;
            }
        }while (viguPWD);
       //okwindow.type(Key.HOME);
        //okwindow.type(Key.END + KeyModifier.SHIFT);
       // okwindow.type(inputPass, Key.END, KeyModifier.SHIFT);
        int k = NavigatorHelper.sum(5,5);
        NavigatorHelper.auth(1,4);

        Thread.sleep(10000);
        int nomer = 2;
        System.out.println("//a[@id='FileListRNEx:SignItem:1']/img");
        System.out.println("//a[@id='FileListRNEx:SignItem:" + (nomer -1) + "']/img");*/
      // NavigatorHelper navigator = new NavigatorHelper();
       //navigator.auth();
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
