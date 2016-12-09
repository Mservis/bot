package IE8;

//import java.util.regex.Pattern;

import org.apache.bcel.generic.GOTO;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.sikuli.script.Pattern;
import org.sikuli.script.Region;
import java.util.Random;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.fail;

public class sozdat_udalit {
    private WebDriver driver;
    // private String baseUrl;
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        driver.manage().window().maximize();
    }

    @Test
    public void IE8_sozdat_udalit_cenovoet() throws Exception {

       // driver.get("https://tender.sk.kz/OA_HTML/RF.jsp?function_id=28716&resp_id=-1&resp_appl_id=-1&security_group_id=0&lang_code=RU&params=KQ0ueFd3h5ncJDQ0.532EQ&oas=vDDpm4e-WoNJpnFHiic_hQ..");
        driver.navigate().to("https://tender.sk.kz/OA_HTML/AppsLocalLogin.jsp");
       // Pattern proc = new Pattern("c:\\forsikuli\\p.PNG");
        Pattern ok2 = new Pattern("c:\\forsikuli\\ie8\\ok.png");
        Pattern inputPass = new Pattern("c:\\forsikuli\\ie8\\pass.png");
        Pattern ok3 = new Pattern("c:\\forsikuli\\ie8\\ok2.png");
        Pattern gotovotpravit = new Pattern("c:\\forsikuli\\gotovotpravit.png");
        Pattern podpisat = new Pattern("c:\\forsikuli\\ie8\\podpisat.png");
        Pattern input2 = new Pattern("c:\\forsikuli\\input2.png");
        Pattern ok4 = new Pattern("c:\\forsikuli\\ie8\\ok3.png");
        Pattern otpravit = new Pattern("c:\\forsikuli\\otpravit.png");
        Pattern otpravil = new Pattern("c:\\forsikuli\\ie8\\otpravil.png");

        driver.findElement(By.id("passwordField")).sendKeys("123456");
        driver.findElement(By.id("SubmitButton")).click();
        Thread.sleep(2000);
        String baseUrl = driver.getCurrentUrl();
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

        okwindow.setRect(31,625,97,40);
        okwindow.wait(gotovotpravit, 10000);
        okwindow.setRect(217,625,84,38);
        //Thread.sleep(20000);
        okwindow.click(otpravit);
        okwindow.setRect(31,625,97,40);
        okwindow.wait(gotovotpravit, 10000);
        /*okwindow.setRect(1065,252,256,39);
        okwindow.wait(otpravil, 10000);*/
        for (int i = 0; i < 100; i++)
        {


            driver.get(baseUrl);
            driver.findElement(By.xpath("//a[contains(text(),'1099408')]")).click();//зайти в заявку
            //Thread.sleep(3000);//удалить заявку
            driver.findElement(By.xpath("//a[@id='FileListRNEx:DeleteItem:1']/img")).click(); //удалить заявку
            Region okwin = new Region(749, 479, 100, 49);
            okwin.click(ok2);//jjj
            Thread.sleep(9000);

            driver.get(baseUrl);
            driver.findElement(By.xpath("//a[contains(text(),'1099408')]")).click();//зайти в заявку


           driver.findElement(By.linkText("Строки")).click();
           Thread.sleep(2000);
           String myrez0 = driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[4]/span")).getText();
           String myrez1 = driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[3]/td[4]/span")).getText();
           //System.out.println(myrez0);
           //System.out.println(myrez1);

           String str0 = "";
           for (i = 0; myrez0.charAt(i) != '.';i++)
           {
               if (myrez0.charAt(i)!=',')
               {
                   str0 += myrez0.charAt(i);
               }

           }
           String str1 = "";
           for (i = 0; i < myrez1.length();i++)
           {
               if (myrez1.charAt(i)!=',')
               {
                   str1 += myrez1.charAt(i);
               }


           }
           Double dbl0 = new Double(str0);
           Double dbl1 = new Double(str1);
           Random myRandom = new Random();
           int n = myRandom.nextInt(49);

           System.out.println(""+n);

           Double dbl00 = new Double(n);
           System.out.println(""+dbl00);
           int int0 = (int) (dbl0*(0.95 + (dbl00/1000)));
           int int1 = (int) (dbl1*(0.95 + (dbl00/1000)));
           // System.out.println(dbl0);
           //System.out.println(dbl1);

           WebElement el =  driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[5]/input"));
           el.click();
           el.sendKeys(Keys.CONTROL + "a");
           el.sendKeys(""+ int0);
           //h1.x5r
           // driver.findElement(By.id("N10:BidCurrencyPriceEntry:1")).click();
           // driver.findElement(By.id("N10:BidCurrencyPriceEntry:1")).clear();
           driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[3]/td[5]/input")).click();
           Thread.sleep(2000);
           el = driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[3]/td[5]/input"));
           el.sendKeys(Keys.CONTROL + "a");
           el.sendKeys(""+int1);
           el.sendKeys(Keys.TAB);
          // driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[2]/td[5]/input")).click();
           //driver.findElement(By.xpath("//span[@id='BidItemPricesTableVO']/table[2]/tbody/tr[3]/td[4]/span")).click();
           Thread.sleep(5000);
           driver.findElement(By.xpath("//div[6]/div/table/tbody/tr/td[2]/table/tbody/tr/td[10]/button")).click();//нажать продолжит
           // driver.findElement(By.id("ContinueBtn")).click();//нажать продолжит
            // driver.findElement(By.cssSelector("h1.x5r")).click();//ошибка

           /* if (isElementPresent(By.cssSelector("h1.x5r"))) {
                break one;
            }*/
           driver.findElement(By.xpath("//div[6]/div/table/tbody/tr/td[2]/table/tbody/tr/td[10]/button")).click();
          /* if (isElementPresent(By.cssSelector("h1.x5r"))) {
               break one;
           }*/
           driver.findElement(By.xpath("//a[@id='FileListRNEx:SignItem:1']/img")).click();//подписать файл
           /*  if (isElementPresent(By.cssSelector("h1.x5r"))) {
               break one;
           }*/


       // Thread.sleep(5000);
       // driver.findElement(By.xpath("//table[@id='PageButtons']/tbody/tr/td[10]/button")).click();//создать ценовое
       // driver.findElement(By.xpath("//table[@id='PageButtons']/tbody/tr/td[10]/button")).click();//создать ценовое

           // Thread.sleep(5000);

        // всплывающее окно браузера
        //  Thread.sleep(20000);
        okwindow.setRect(754,485,115,73);
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

        okwindow.setRect(31,625,97,40);
        okwindow.wait(gotovotpravit, 10000);
        okwindow.setRect(217,625,84,38);
        okwindow.click(otpravit);
        okwindow.setRect(31,625,97,40);
        okwindow.wait(gotovotpravit, 10000);
        }
        Thread.sleep(3000);//удалить заявку
        driver.findElement(By.xpath("//a[@id='FileListRNEx:DeleteItem:1']/img")).click(); //удалить заявку
        Region okwin = new Region(749,479,100,49);
        okwin.click(ok2);//jjj
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
