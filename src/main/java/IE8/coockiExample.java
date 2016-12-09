package IE8;

//import java.util.regex.Pattern;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;

public class coockiExample {
    private WebDriver driver;
    // private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }

    @Test
    public void IE8_coocke() throws Exception {
        driver.manage().window().maximize();

        // driver.navigate().to("https://tender.sk.kz");
        driver.get("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");

        Pattern ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        Pattern inputPass = new Pattern("c:\\forsikuli\\ie8\\pass.png");
        Pattern ok3 = new Pattern("c:\\forsikuli\\ie8\\ok2.png");
        Pattern gotovotpravit = new Pattern("c:\\forsikuli\\gotovotpravit.png");
        Pattern podpisat = new Pattern("c:\\forsikuli\\ie8\\podpisat.png");
        Pattern input2 = new Pattern("c:\\forsikuli\\input2.png");
        Pattern ok4 = new Pattern("c:\\forsikuli\\ie8\\ok3.png");
        Pattern otpravit = new Pattern("c:\\forsikuli\\otpravit.png");

        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click(); // залогинился
        Thread.sleep(5000);
        Set<Cookie> cookiesList1 = driver.manage().getCookies();//чиатю куки
        System.out.print("Прочитал Куки   ");
        System.out.println(driver.manage().getCookies());
        driver.quit();
        driver = null;
        driver = new InternetExplorerDriver();
        driver.manage().window().maximize();
        System.out.print("Новые Куки   ");
        System.out.println(driver.manage().getCookies());
        System.out.println("Выгружаю куки   ");
        for (Cookie gcookies : cookiesList1) {
            System.out.print(gcookies);
        }
        System.out.println("");
        System.out.println("Заисытваю куки   ");
        for (Cookie gcookies : cookiesList1) {
            driver.manage().addCookie(gcookies);
        }

        System.out.println("Записал куки   ");
        driver.get("https://tender.sk.kz/OA_HTML/RF.jsp?function_id=17573&resp_id=50659&resp_" +
                "appl_id=20003&security_group_id=0&lang_code=RU&params=90YrEYvK69ub-" +
                "ASmfkG36h0EYWtzdBi0HRFW2ljektI&oas=8-n1WxAOZ4cw83qW7pPcFQ..");
        System.out.print("Залогинился одной строкой    ");
        System.out.println(driver.manage().getCookies());

        //перезаписать куки




        System.out.print("Перезаписал куки             ");
        System.out.println(driver.manage().getCookies());

        driver.findElement(By.xpath("//a[contains(text(),'1099408')]")).click();//зайти в заявку
       /* System.out.print("Зашел в заявку    ");
        System.out.println(driver.manage().getCookies());*/
        driver.findElement(By.id("ContinueBtn")).click();//нажать продолжит
       /* System.out.print("продолжить    ");
        System.out.println(driver.manage().getCookies());*/
        driver.findElement(By.xpath("//table[@id='PageButtons']/tbody/tr/td[10]/button")).click();//создать ценовое
        /*System.out.print("создал ценовое    ");*/
        driver.findElement(By.xpath("//a[@id='FileListRNEx:SignItem:1']/img")).click();//подписать файл
       /* System.out.print("подписал файл    ");
        System.out.println(driver.manage().getCookies());*/
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
        System.out.println(driver.manage().getCookies());
        //Thread.sleep(10000);

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
