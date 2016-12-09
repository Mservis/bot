package mozillal;

//import java.util.regex.Pattern;
import  java.io.File;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
//import org.sikuli.script.Pattern;
//import org.sikuli.script.Region;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.firefox.internal.ProfilesIni;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;

public class SikuliTestTest {
    private WebDriver driver;
    private FirefoxBinary binary;
   // private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();
    private WebDriverWait wait;

    @Before
    public void setUp() throws Exception {
        File profdir = new File("src/profile/dws67wyi.default-1432484266776");
        File binarydir = new File("c:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe");
        FirefoxProfile profile = new FirefoxProfile(profdir);
        DesiredCapabilities caps = new DesiredCapabilities();
        binary = new FirefoxBinary(binarydir);
        //caps.setCapability(FirefoxDriver.PROFILE,profile);
        caps.setCapability(FirefoxDriver.MARIONETTE, false);
       //caps.setCapability(FirefoxDriver.BINARY,binary);
        driver = new FirefoxDriver(caps);
        System.out.println(((HasCapabilities)driver).getCapabilities());
        wait = new WebDriverWait(driver, 10);
    }

    @Test
    public void mozilla_sozdat_cenovoet() throws Exception {
       driver.manage().window().maximize();
       // driver.navigate().to("https://tender.sk.kz");

        driver.get("https://tender.sk.kz/");
       // driver.get("http://www.ya.ru");
       // Thread.sleep(50000);
        //**********************************
       // driver.fin56dElement(By.xpath("//span[@id='FNDDIALOGPAGE']/div/div[3]/div/div/table/tbody/tr/td[3]/table/tbody/tr/td/h1")).click();
       // driver.findElement(By.id("PON_SOURCING_SUPPLIER")).click();
        //*********************
  /*
        Pattern ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        Pattern inputPass = new Pattern("c:\\forsikuli\\ie8\\pass.png");
        Pattern ok3 = new Pattern("c:\\forsikuli\\ie8\\ok2.png");
        Pattern gotovotpravit = new Pattern("c:\\forsikuli\\gotovotpravit.png");
        Pattern podpisat = new Pattern("c:\\forsikuli\\ie8\\podpisat.png");
        Pattern input2 = new Pattern("c:\\forsikuli\\input2.png");
        Pattern ok4 = new Pattern("c:\\forsikuli\\ie8\\ok3.png");
        Pattern otpravit = new Pattern("c:\\forsikuli\\otpravit.png");
        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        driver.findElement(By.xpath("//a[contains(text(),'1099408')]")).click();//зайти в заявку
        driver.findElement(By.id("ContinueBtn")).click();//нажать продолжит
        driver.findElement(By.xpath("//table[@id='PageButtons']/tbody/tr/td[10]/button")).click();//создать ценовое
        driver.findElement(By.xpath("//a[@id='FileListRNEx:SignItem:1']/img")).click();//подписать файл
        // всплывающее окно браузера
     //  Thread.sleep(20000);
        Region okwindow = new Region(754,485,115,73);
        okwindow.wait(ok2, 10000);
        okwindow.click(ok2);
        //окно джава просит пароль
        okwindow.setRect(618,433,271,82);
        okwindow.wait(inputPass,20000);
        okwindow.paste(inputPass,"123456");
        okwindow.click(ok3);
        //подписать
        okwindow.setRect(123,628,90,32);
        okwindow.wait(podpisat, 10000);
        okwindow.click(podpisat);
        okwindow.setRect(597,433,245,54);
        okwindow.wait(input2, 10000);
        okwindow.paste(input2, "123456");
        okwindow.click(ok4);
        okwindow.setRect(32,592,276,73);
        okwindow.wait(gotovotpravit, 10000);
        okwindow.click(otpravit);
        //Thread.sleep(10000);
*/
    }

    @After
    public void tearDown() throws Exception {
        driver.quit();
        String verificationErrorString = verificationErrors.toString();
        if (!"".equals(verificationErrorString)) {
            fail(verificationErrorString);
        }
    }

    private boolean isElementPresent(By by) {
        try {
            driver.findElement(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
private  void ERR1()// ошибка неправильно зашли
{
    if (isElementPresent(By.xpath("//span[@id='FNDDIALOGPAGE']/div/div[3]/div/div/table/tbody/tr/td[3]/table/tbody/tr/td/h1")))
    {
        driver.findElement(By.id("PON_SOURCING_SUPPLIER")).click();
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
