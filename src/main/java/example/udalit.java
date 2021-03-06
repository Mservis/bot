package example;

//import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.Select;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;
import org.sikuli.script.Region;
import org.openqa.selenium.By;

public class udalit {
    private WebDriver driver;
    private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        driver = new InternetExplorerDriver();
        //baseUrl = "http://tender.sk.kz/";
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }

    @Test
    public void testUntitled() throws Exception {
        driver.manage().window().maximize();
        // driver.navigate().to("https://tender.sk.kz");
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
        // Thread.sleep(3000);
        //**********************************
        Screen screen = new Screen();
        Pattern ok_btn = new Pattern("c:\\forsikuli\\ok.png");
        Pattern gucalov = new Pattern("c:\\forsikuli\\gucalov.png");
        Pattern ok2 = new Pattern("c:\\forsikuli\\ok2.png");
        Pattern inputPass = new Pattern("c:\\forsikuli\\inputPass.png");
        Pattern dialog = new Pattern("c:\\forsikuli\\dialog.png");
        Pattern ok3 = new Pattern("c:\\forsikuli\\ok3.png");
        Pattern dialog2 = new Pattern("c:\\forsikuli\\dialog2.png");
        Pattern gucalov2 = new Pattern("c:\\forsikuli\\gucalov2.png");
        Pattern podpisat = new Pattern("c:\\forsikuli\\podpisat.png");
        Pattern input2 = new Pattern("c:\\forsikuli\\input2.png");
        Pattern ok4 = new Pattern("c:\\forsikuli\\ok4.png");
        Pattern otpravit = new Pattern("c:\\forsikuli\\otpravit.png");
        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        //*********************************
        driver.findElement(By.xpath("//a[contains(text(),'1099408')]")).click();//зайти в заявку
        Thread.sleep(3000);
        driver.findElement(By.xpath("//a[@id='FileListRNEx:DeleteItem:1']/img")).click();

        screen.click(ok2);
        Thread.sleep(9000);
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
